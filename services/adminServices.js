const Page = require('../models/pages')
const addPage = async (body) => {
        const page = new Page(body);
        await page.save();
        return page;
}

const getPages = async (req, res, next) => {
        const pages = Page.find({}).sort({sorting: 1}).lean();
}


module.exports = {
    addPage,
    getPages
}