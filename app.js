const express =require('express');
const path =require('path');
const dotenv = require('dotenv');










const app =express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
dotenv.config({path: path.join(__dirname, './config.env')})
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views')





app.get('/', function(req, res){
    res.send('Welcome');
})








const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})  