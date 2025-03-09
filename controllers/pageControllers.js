const pageServices= require('../services/pageServices') 

exports.getPages = async (req, res) => {
    const allPages = await pageServices.getPages();
    res.render('admin/pages',{pages: allPages})
}
exports.getaddPage = async (req, res) => {
    res.render('admin/add-page');
}
exports.postaddPage = async (req, res) => {
        let data = {
            title: req.body.title,
            content: req.body.content
        }
        try {
            await pageServices.addPage(data)
            req.flash('success','the page added successfully');
            res.redirect('/admin/pages');
        }
        catch(error){
            console.log(error);
            req.flash('error','there is something wrong with saving the page');
            res.redirect('/admin/add-page')
        }
}

exports.geteditPage = async (req, res) => {
    const slug = req.params.slug;
        try{
            const page = await pageServices.findPage(slug);
            if (!page) {
                req.flash('error', 'Page not found.');
                return res.redirect('/admin/pages');
            }
            res.render('admin/edit-page', {page})    
        }
        catch(error){
            console.log(error);
            req.flash('error','there is something wrong with finding the page');
            res.redirect('/admin/pages')
        }
}
exports.posteditPage = async (req, res) => {
    const slug = req.params.slug;
    const data ={
        title: req.body.title,
        content: req.body.content,
    }
    try{
        const page = await pageServices.findPage(slug);
        if (!page) {
            req.flash('error', 'Page not found.');
            return res.redirect('/admin/pages');
        }

        if(page.title.toLowerCase() === 'home' && data.title.toLowerCase() !== 'home'){
            req.flash('error', 'Home page cannot be renamed.');
            return res.redirect(`/admin/edit-page/${slug}`, )
        }


        await pageServices.updatePage(slug, data)
        req.flash('success','the page updated successfully');
        res.redirect('/admin/pages')
    }
    catch(error){
        req.flash('error','there is something wrong with updating the page')
        res.redirect(`/admin/edit-page/${slug}`)
    } 
}

exports.deletePage = async (req, res) => {
    const id = req.params.id
    try {
        const page = await pageServices.deletePage(id);
        if (!page) {
            req.flash('error', 'Page not found.');
            return res.redirect('/admin/pages');
        }
        
        req.flash('success','the page deleted successfully');
        res.redirect('/admin/pages')

    }catch(error){
        console.log(error);
        req.flash('error','there is something wrong with deleting the page');
        res.redirect('/admin/pages')
    }
}