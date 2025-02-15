const Page = require('../models/pages')
const addPage = async (body) => {
        const page = new Page(body);
        await page.save();
        return page;
}

const getPages = async () => {
       return Page.find({}).lean();
}


module.exports = {
    addPage,
    getPages
}