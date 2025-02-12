// REQUIRING PACKAGES
const express =require('express');
const path =require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, './config.env')})
const mongoose = require('mongoose');





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



//ROUTES
const User = require('./routes/UserRoutes')
const Admin = require('./routes/AdminRoutes')
app.use('/', User)
app.use('/admin', Admin)









// LISTENING
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})  