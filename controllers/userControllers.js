const productServices = require('../services/productServices');
const pageServices= require('../services/pageServices') 
const categoryServices = require('../services/categoryServices');
const paypal = require('../middlewares/paypal');
const fs = require('fs');
const path = require('path');


// /
exports.getHome = async (req, res) => {
    const products = await productServices.getProductslimits();
    res.render('home', {products});
}
exports.getPage = async (req, res) => {
    try{
        const slug = req.params.slug;
        const page = await pageServices.findPage(slug)
        if (!page) {
            req.flash('error', 'Page not found.');
            return res.redirect('/');
        }
        res.render('index', {page});    
    }
    catch(error){
        console.log(error);
        res.status(404).render('404',{title: 'Page Not Found'});
    }
}




// /product
exports.getAllProducts = async (req, res) => {
    const allProducts = await productServices.getProducts();
    res.render('products', { products: allProducts });
}

exports.getProductsCategory = async (req, res) => {
    const cat = req.params.category;
    try{
        const category = await categoryServices.getCategory(cat);
        if(!category) {
            req.flash('error','this category is not exists')
            res.redirect(`/`);
            return;
        }
        const products = await productServices.getProductsCategory(category._id);
        res.render('products', {products})

    }catch(error){
        console.log(error)
        req.flash('error','there is something wrong in getting the products of this category')
        res.redirect('/')
        
    }
    
}

exports.getProductDetails = async (req, res) => {
    const {cat, slug} = req.params;
    const product = await productServices.getProductpop(slug);
    const category = await categoryServices.getCategory(cat)

    if(!product || !category) {
        req.flash('error','this product is not exists')
        res.redirect(`/products/${cat}`);
        return;
    }
    const galleryPath = path.join(__dirname, '../public/uploads/products', product._id.toString(), 'gallery')
    const galleryImages = fs.existsSync(galleryPath) ? fs.readdirSync(galleryPath) : [];
    res.render('productDetails', { product , galleryImages })
}









// /cart
exports.getAddProduct = async (req, res) => {
         // get the product from db
     // check if the product is in the cart
     // if yes, increase the quantity
     // if not, add the product to the cart

        
     const slug = req.params.proSlug
     try{
        const product = await productServices.getProduct(slug);
        if(!product) {
         req.flash('error', 'Product not found.');
         return res.redirect('/');
        }
        if(!req.session.cart){
        req.session.cart = [];
        }
        let cart = req.session.cart;
        let existProduct = cart.find(item => item.id === product._id.toString());
        if(existProduct){
            existProduct.quantity++;
        }
        else{
            cart.push({
                title: product.slug,
                quantity: 1,
                price: product.price,
                image: `/uploads/products/${product._id}/${product.image}`,
                id: product._id.toString(),
            })
        }
        req.flash('success', 'Product added to the cart successfully.');
        res.redirect(req.get('Referer') || '/');
    }
     catch(err){
        console.log(err);
        req.flash('error', 'An error occurred while adding product to the cart.');
        res.redirect(req.get('Referer') || '/');
    }

}

exports.checkout = async (req, res) => {
    res.render('checkout', {cart: req.session.cart})
}

exports.getUpdateProduct = async(req, res) => {
    const slug = req.params.product;
    const action = req.query.action;
    const cart = req.session.cart;
    const item = cart.findIndex(item => item.title === slug)
    if(item != -1){
        switch (action){
            case 'inc':
                cart[item].quantity++;
                break;
            case 'dec':
                cart[item].quantity--;
                if(cart[item].quantity < 1){
                    cart.splice(item, 1);
                }
                break;
            case 'clear': 
                cart.splice(item, 1);
                if(cart.length < 1) 
                    delete req.session.cart;
                break;
            default:
                console.log('there is a problem on updating the cart')    
                break;
        }
    }
    req.flash('success', 'the cart updated');
    res.redirect('/cart/checkout')

}

exports.clear = async (req, res) => {
    delete  req.session.cart;
    req.flash('success', 'the cart cleared');
    res.redirect('/cart/checkout')
}

exports.buy = async (req, res) => {
    const cart = req.session.cart.map(item => {
        return {
            name: item.title,
            quantity: item.quantity,
            price: item.price,
            currency: "USD",
            sku: item.id
        }
    })
    let total = req.session.cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;

    },0)
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5678/cart/success",
            "cancel_url": "http://localhost:5678/cart/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": cart
            },
            "amount": {
                "currency": "USD",
                "total": total
            },
            "description": "Hat for the best team ever"
        }]
    };

    paypal.payment.create(
        create_payment_json,
        function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });

}

exports.success = async (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    let total = req.session.cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    },0)

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total
            }
        }]
    };

    paypal.payment.execute(paymentId,
        execute_payment_json,
        function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                req.flash('success', 'Payment is done successfully');
                delete req.session.cart
                res.redirect('/cart/checkout');
            }
        });
}
exports.cancel = async (req, res) => {
    req.flash('error', 'there is something wrong during the payment ');
    res.redirect('/cart/checkout');
}

