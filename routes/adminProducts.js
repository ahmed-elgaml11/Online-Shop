
const express = require('express');
const router = express.Router();
const adminServices = require('../services/adminServices');
const productSchema = require('../schema/productSchema');
const validateProduct = require('../midlewares/validateProduct')
const upload = require('../app')
const slugify = require('slugify');

const path = require('path');


// admin/product


router.get('/', async (req, res) => {
    const allProducts = await adminServices.getProducts();
    res.render('admin/products',{products: allProducts})
})


router.get('/add-product', async (req, res) => {
    const categories = await adminServices.getCategories();
    const title = "", price= "", image ="", desc="", category=""; 
    const product = {title, price, image, desc, category}
    res.render('admin/add-product',{product, categories})
})

router.post('/add-product', upload.single('image'), productSchema, validateProduct, async (req, res) => {
    console.log(req.file);
    const {title, category, desc, price} = req.body;
    const image = req.file? req.file.filename : "";  
    const data = {title, category, desc, price, image}
    const slug = slugify(title, {lower: true, strict: true})
    try{
        const existingProduct  = await adminServices.getProduct(slug)
        if(existingProduct ){
            req.flash('error', 'This product already exists')
            res.render('admin/add-product',{product: data})
            return;
        }
        const product = await adminServices.addProduct(data);
        if(req.file && req.file.path){
            const productDir = path.join(__dirname, '..', 'public', 'uploads', 'products', product._id.toString())
            fs.mkdirSync(productDir, { recursive: true });
            const newPath = path.join(productDir, req.file.filename);
            fs.renameSync(req.file.path, newPath);
        }
        req.flash('success', 'Product added successfully');
        res.redirect('/admin/product');
    }catch(error){
        if (req.file) {
            await fs.promises.unlink(path.join(__dirname, '../public', 'uploads', 'temp', req.file.filename));
          }
        req.flash('error', 'there is something wrong in adding this product')
        res.render('admin/add-product',{product: data})
    }
})




module.exports = router