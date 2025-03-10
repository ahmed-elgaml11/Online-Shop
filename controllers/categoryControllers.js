const categoryServices = require('../services/categoryServices');
const slugify = require('slugify');


exports.getCategories = async (req, res) => {
    const categories = await categoryServices.getCategories();
    res.render('admin/categories',{categories});

}
exports.getaddCategory = async (req, res) => {
    res.render('admin/add-category');
}
exports.postaddCategory = async (req, res) => {
    const {title} = req.body;
    const slug = slugify(title, {lower: true, strict: true})
    try{
        const category = await categoryServices.getCategory(slug)
        // to ensure the uniquness of the title.
        if(category){
            req.flash('error', 'this category is already exists');
            res.redirect('/admin/category/add-category')
            return;
        }
        await adminServices.addCategory(title)
        req.flash('success', 'the category was added successfully')
        res.redirect('/admin/category')
    }
    catch(error){
        console.log(error)
        req.flash('error', 'there is something wrong in adding this category');
        res.redirect('/admin/category/add-category')

    }
}

exports.getEditCategory = async (req, res) => {
    const slug = req.params.slug;
    // get the category from the db then render it into the edit-category page 
    try{
        const category = await categoryServices.getCategory(slug)
        if(!category) {
            req.flash('error','this category is not exists')
            res.redirect('/admin/category/')
            return;
        }


        res.render('admin/edit-category', {category})
    }
    catch(error){
        console.log(error)
        req.flash('error', 'there is something wrong in getting this category');
        res.redirect('/admin/category/')
    }

}
exports.postEditCategory = async (req, res) => {
    const slug = req.params.slug;
    let title = req.body.title;
    const newSlug = slugify( title, {lower: true, strict: true})
    // update the category in the db then redirect to the category page
    try{
        const existCategoy = await categoryServices.getCategory(slug)
        if(!existCategoy){
            req.flash('error','this category is not exists')
            res.redirect('/admin/category/')
            return;
        }

         // to ensure the category is unique
         if(slug != newSlug){
            const category = await categoryServices.getCategory(newSlug)
            if (category ){
                req.flash('error', 'this category is already exists');
                res.redirect(`/admin/category/edit-category/${slug}`);
                return;
            }
         }



        existCategoy.title = req.body.title;
        existCategoy.slug = newSlug;
        await categoryServices.saveCategory(existCategoy);
        req.flash('success', 'the category is updated successfully')
        res.redirect('/admin/category')

    }
    catch(error){
        console.log(error)
        if(error.code == 11000){
            req.flash('error','this category is already exists')
            return res.redirect(`/admin/category/edit-category/${slug}`)
        }

        req.flash('error', 'there is something wrong in updating this category');
        res.redirect(`/admin/category/edit-category/${slug}`)
    }
}

exports.deleteCategory = async (req, res) => {
    const id = req.params.id;
    try{
        const deletedCategory =  await categoryServices.deleteCategory(id);
        if(!deletedCategory){
            req.flash('error', 'category not found.');
            return res.redirect('/admin/category');
        }

        
        req.flash('success', 'the category was deleted successfully')
        res.redirect('/admin/category')

    }
    catch(error){
        req.flash('there is something wrong with deleting the page')
        res.redirect('/admin/category/')
    }
}