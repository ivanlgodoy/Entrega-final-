const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  secret: "elsecretodecharli",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));
app.use(express.static(path.resolve(__dirname,'../public')));
app.set('view engine','ejs');
app.set("views",path.resolve(__dirname,'views'));
app.use('/',require('./routes/mainRoutes.js'));
app.listen(3000,() => console.log("servidor corriendo"));
