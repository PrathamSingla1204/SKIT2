const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const CSV = require('csv-parser');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(bodyParser.json());
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//mongo store use to store the session cookie in db
app.use(session({
    name:'CSVUPLOAD',
   //change secret before deployment
    secret : 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*10)
    },
    store: MongoStore.create(
        {
        mongoUrl: 'mongodb://127.0.0.1:27017/CSVupload_development',
        dbName: "CSVupload_development",
        autoRemove:'disabled'
        },
            function(err){
                console.log(err || 'Connect-mongodb setup succesful');
            }
        )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else
    console.log("Server Running on Port:",port);
});