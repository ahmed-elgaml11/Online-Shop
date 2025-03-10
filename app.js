// REQUIRING PACKAGES
const express =require('express');
const path =require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, 'config.env')})
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');  
const pageServices = require('./services/pageServices');
const categoryServices = require('./services/categoryServices');
var MongoDBStore = require('connect-mongodb-session')(session);





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
var store = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: 'mySessions'
});
store.on('error', function(error) {
  console.log(error);
});
app.use(cookieParser('cookieSecret'));
app.use(session({
  secret: 'secretkey(%)',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000*60*60*24*30 }, // month
  store: store,
 }));
app.use(flash());
app.use(async (req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.pages = await pageServices.getPages();
  res.locals.categories = await categoryServices.getCategories();
  res.locals.cart = req.session.cart ;
  res.locals.user = req.session.user ;
  next();
});








//ROUTES
const user = require('./routes/userRoutes');
const admin = require('./routes/adminRoutes');
const authentication = require('./routes/authRoutes');

app.use('/admin', admin)
app.use('/', user)
app.use('/user', authentication)









// LISTENING
const port = process.env.PORT || 5678;
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})  