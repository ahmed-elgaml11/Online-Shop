const Page = require('../models/pages')
const addPage = async (body) => {
        const page = new Page(body);
        await page.save();
        return page;
}

const getPages = async () => {
       return Page.find({}).lean();
}

const findPage = async(slug) => {
    const page = await Page.findOne({ slug: slug })
    return page
}
const findPageid= async(id) => {
    return Page.findById(id)
 
} 
const updatePage = async(slug, data) => {
    return Page.findOneAndUpdate({ slug: slug }, data)
    
}

const deletePage = async(id) => {
    return Page.findByIdAndDelete(id)
 
}
module.exports = {
    addPage,
    getPages, 
    findPage,
    updatePage,
    deletePage,
    findPageid  
}