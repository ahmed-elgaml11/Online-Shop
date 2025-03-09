const { default: mongoose } = require('mongoose');
const Page = require('../models/pages')


const addPage = async (body) => {
        const page = new Page(body);
        await page.save();
        return page;
}

const getPages = async () => {
       return Page.find({}).lean();
}

const findPage= async(query) => {
    return mongoose.Types.ObjectId.isValid(query) ? Page.findById(query) : Page.findOne({ slug: query });
 
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
}