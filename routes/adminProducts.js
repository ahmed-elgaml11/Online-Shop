
const express = require('express');
const router = express.Router();
const adminServices = require('../services/adminServices');
const productSchema = require('../schema/productSchema');
const validateProduct = require('../midlewares/validateProduct')
const upload = require('../app')
const slugify = require('slugify');
const fs = require('fs');
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
    const categories = await adminServices.getCategories();

    try{
        const existingProduct  = await adminServices.getProduct(slug)
        if(existingProduct ){
            res.render('admin/add-product',{product: data, error: ['This product is already exists'], categories })
            return;
        }
        const product = await adminServices.addProduct(data);
        if(req.file && req.file.path){
            const productDir = path.join(__dirname, '..', 'public', 'uploads', 'products', product._id.toString())
            fs.mkdirSync(productDir, { recursive: true });
            const newPath = path.join(productDir, req.file.filename);
            fs.renameSync(req.file.path, newPath);
            req.file.path = newPath;
        }
        req.flash('success', 'Product added successfully');
        res.redirect('/admin/product');
    }catch(error){
        if (req.file) {
            await fs.promises.unlink(path.join(__dirname, '../public', 'uploads', 'temp', req.file.filename));
          }
        console.log(error)  
        res.render('admin/add-product',{product: data, error: ['there is something wrong in adding this product'], categories})
    }
})

router.get('/edit-product/:id', async (req, res) => {
    // find the product then render it 
    const id = req.params.id;
    try{
        const categories = await adminServices.getCategories()
        const existingProduct = await adminServices.getProductID(id)
        if(!existingProduct){
            req.flash('error', 'this product is not exists')
            return res.redirect('/admin/product/')
        }
        const galleyDir = path.join(__dirname, '../public', 'uploads', 'products', existingProduct._id.toString(), 'gallery')
        const galleryImages = fs.existsSync(galleyDir)? fs.readdirSync(galleyDir) : []




        res.render('admin/edit-product', {
            product: existingProduct,
            categories,
            galleryImages
        })
    }
    catch(error){
        console.log(error)
        req.flash('error', 'there is something wrong in getting this product')
        res.redirect('/admin/product/')
    }
})







module.exports = router