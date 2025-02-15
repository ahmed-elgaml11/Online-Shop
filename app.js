// REQUIRING PACKAGES
const express =require('express');
const path =require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, './config.env')})
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');  



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
app.use(express.static(path.join(__dirname, 'imgs')));
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
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});


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