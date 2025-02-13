const express = require('express');
const router = express.Router();

router.get('/pages', (req, res) => {
    res.send('ADMIN AREA');
})
router.get('/add-page', (req, res) => {
    res.render('admin/add-page')
})
router.post('/add-page', (req, res) => {

})



module.exports = router
