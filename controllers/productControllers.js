const productServices = require('../services/productServices');
const categoryServices = require('../services/categoryServices');

const slugify = require('slugify');
const fs = require('fs');
const path = require('path');


exports.getProducts = async (req, res) => {
    const allProducts = await productServices.getProducts();
    res.render('admin/products',{products: allProducts})
}

exports.getAddProduct = async(req, res) => {
    const categories = await categoryServices.getCategories();
    const title = "", price= "", image ="", desc="", category=""; 
    const product = {title, price, image, desc, category}
    res.render('admin/add-product',{product, categories})
}
exports.postAddProduct = async(req, res) => {
    const {title, category, desc, price} = req.body;
    const image = req.file? req.file.filename : "";  
    const data = {title, category, desc, price, image}
    const slug = slugify(title, {lower: true, strict: true})
    let check = 1;
    try{
        const categories = await categoryServices.getCategories();
        const existingProduct  = await productServices.getProduct(slug)
        if(existingProduct ){
            res.render('admin/add-product',{product: data, error: ['This product is already exists'], categories })
            return;
        }
        const product = await productServices.addProduct(data);
        if(req.file && req.file.path){
            check = 0;
            const productDir = path.join(__dirname, '..', 'public', 'uploads', 'products', product._id.toString())
            fs.mkdirSync(productDir, { recursive: true });
            const newPath = path.join(productDir, req.file.filename);
            fs.renameSync(req.file.path, newPath);
            req.file.path = newPath;
        }
        req.flash('success', 'Product added successfully');
        req.session.save(() => {
            res.redirect('/admin/product');
        });
    }catch(error){
        if (req.file && check == 1) {
            await fs.promises.unlink(path.join(__dirname, '../public', 'uploads', 'temp', req.file.filename));
        }
        console.log(error)  
        res.render('admin/add-product',{product: data, error: ['there is something wrong in adding this product'], categories})
    }

}


exports.getEditProduct = async(req, res) => {
// find the product then render it 
    const id = req.params.id;
    try{
        const categories = await categoryServices.getCategories()
        const existingProduct = await productServices.getProductID(id)
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
}
exports.postEditProduct = async(req, res) => {
const {title, category, desc, price, deleteImage} = req.body;
    const image = req.file? req.file.filename : "";
    const data = {title, category, desc, price, image}
    const id = req.params.id;
    const slug = slugify(title, {lower: true, strict: true})
    try{
        const existingProduct = await productServices.getProductID(id);
        if(!existingProduct){
            req.flash('error', 'this product is not exists')
            return res.redirect('/admin/product/')
        }

        const product = await productServices.getProductUnique(id, slug);
        if(product){
            req.flash('error', 'this product title is already exists');
            res.redirect(`/admin/product/edit-product/${id}`)
            return;
        }


        if(req.file && req.file.path){
            const productDir = path.join(__dirname, '../public/uploads/products', id.toString())
            fs.mkdirSync(productDir, { recursive: true });
            const newPath = path.join(productDir, req.file.filename);
            fs.renameSync(req.file.path, newPath);
            req.file.path = newPath;

            if(existingProduct.image != ""){
                const oldImagePath = path.join(__dirname, '../public/uploads/products', id.toString(), existingProduct.image );
                if(fs.existsSync(oldImagePath)){
                    fs.unlinkSync(oldImagePath);
                }
            }
        }
        if(!req.file && deleteImage == true && existingProduct.image != "" ){
            const oldImagePath = path.join(__dirname, '../public/uploads/products', id.toString(), existingProduct.image)
            if(fs.existsSync(oldImagePath)){
                fs.unlinkSync(oldImagePath);
            }
        }


        await productServices.findUpdateProduct(id, data);
        req.flash('success', 'the product was updated successfully')
        res.redirect('/admin/product')

    }
    catch(error){
        console.log(error)
        req.flash('error', 'there is something wrong in getting this product')
        res.redirect(`/admin/product/edit-product/${id}`)
    }
}

exports.addGallery = async (req, res) => {
    const id = req.params.id;
    try{
        const existingProduct =  await productServices.getProductID(id);
        if(!existingProduct){
            req.flash('error', 'this product is not exists')
            return  res.redirect(`/admin/product/edit-product/${id}`)
        }
        if(req.files && req.files.length > 0){
            const galleryDir = path.join(__dirname, '../public/uploads/products', id, 'gallery')
            await fs.promises.mkdir(galleryDir, { recursive: true });
            req.files.forEach(file => {
                const newPath = path.join(galleryDir, file.filename);
                fs.renameSync(file.path, newPath);
            });    
        }
        req.flash('success', 'Gallery images uploaded successfully');
        res.redirect(`/admin/product/edit-product/${id}`);
    }
    catch(err){
        console.log(error)
        req.flash('error', 'there is something wrong in getting this product')
        res.redirect(`/admin/product/edit-product/${id}`)
    }
}

exports.deleteGallery = async(req, res) => {
    const {id, image} = req.params;
    const galleryPath = path.join(__dirname,'../public/uploads', 'products', id, 'gallery', image)
    if(fs.existsSync(galleryPath)){
        fs.unlinkSync(galleryPath);
        req.flash('success', 'Gallery image deleted successfully');
        res.redirect(`/admin/product/edit-product/${id}`)
    } else{
        req.flash('error', 'this gallery image does not exist');
        res.redirect(`/admin/product/edit-product/${id}`)
    }
}

exports.deleteProduct = async(req, res) => {
    const id = req.params.id;
    try{
        const existingProduct = await productServices.getProductID(id);
        if(!existingProduct){
            req.flash('error', 'this product is not exists')
            return res.redirect('/admin/product/')
        }
        const deletedPath = path.join(__dirname, '../public/uploads/products');
        if(!fs.existsSync(deletedPath)){
            fs.mkdirSync(deletedPath, { recursive: true });
        }
        const productDir = path.join(deletedPath, id.toString());
        if(fs.existsSync(productDir)){
            fs.rmSync(productDir, { recursive: true, force: true });;
        }
        await productServices.deleteProduct(id);
        req.flash('success', 'the product was deleted successfully')
        res.redirect('/admin/product')
    }
    catch(error){
        console.log(error)
        req.flash('error', 'there is something wrong in deletting this product')
        res.redirect('/admin/product/')
    }
}