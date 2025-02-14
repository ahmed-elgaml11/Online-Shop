const Page = require('../models/pages')
const add_page = async (req, res) => {
    try{
        const page = new Page(req.body);
        await page.save();
        req.flash('success','the page added successfully');
        res.redirect('/admin/pages');

    }
    catch(error){
        console.log(error);
        res.status(500).send('Server Error')
    }
}

const get_pages = async (req, res, next) => {
    try{
        const pages = await Page.find({}).sort({sorting: 1}).lean();
        res.local.pages = pages;
        next();
    }
    catch(error){
        console.log(error);
        res.status(500).send('Server Error')

    }
}


module.exports = {
    add_page,
    get_pages
}