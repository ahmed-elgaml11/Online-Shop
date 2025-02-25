// REQUIRING PACKAGES
const express =require('express');
const path =require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, './config.env')})
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');  
const multer = require('multer');
const fs = require('fs');
const Page = require('./models/pages');
const Category = require('./models/categories');




// CONNECT TO DB
main()
.then(() => console.log('Connected to db' ))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.DATABASE);
}




// MIDLLWARES
const app =express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views')
app.use(cookieParser('cookieSecret'));
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000*60*60*24*30 }, // month
 }));
app.use(flash());
app.use(async (req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.pages = await Page.find({});
  res.locals.categories = await Category.find({});
  next();
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // temporary folder
    const tempPath = path.join(__dirname, 'public', 'uploads', 'temp');
    fs.mkdirSync(tempPath, {recursive: true});
    cb(null, tempPath)

  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }

});
const fileFilter = (req, file, cb) => {
    if(!file){
      return cb(null, true);
    }
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      return cb(new Error("Only images are allowed!"), false);
    }
    cb(null, true);
};
 const upload = multer({
  storage: storage,
  fileFilter
});
module.exports = upload;






//ROUTES
const User = require('./routes/UserRoutes');
const Admin = require('./routes/adminRoutes');
app.use('/', User)
app.use('/admin', Admin)









// LISTENING
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})  