const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('ADMIN AREA');
})
router.get('')
router.get('/add-page', (req, res) => {
    res.render('admin/add-page')
})



module.exports = router
