const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const passport = require('passport');
const config = require('./config/database')

//Initialising database
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true
}).then( () => {
  console.log("Connected to database LiveStock");
}).catch( (error) => {
  console.log(error);
});
let db = mongoose.connection;


//Initialising app
const app = express();


//Initialising view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Set public folder
//serving static assests
app.use(express.static(path.join(__dirname, 'public')));

//Bring in article model
const Livestock = require('./models/livestock');

//Express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Express message middleware
app.use(require('connect-flash')());
app.use( (req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express validator middleware
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

//Passport config
require('./config/passport')(passport);
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

//Home route
app.get('/', (req, res) => {
  Livestock.find({}).then( (livestocks) =>{
    res.render('index', {
      title: 'Livestocks',
      livestocks: livestocks
    });
  }).catch( (err) => {
    console.log(err);
  })
});

// Home Page
app.get('/', (req,res) => {
  res.render('./index.pug')
})

//Route files
const livestocks = require('./routes/livestocks');
const officials = require('./routes/officials');
app.use('/livestocks', livestocks)
app.use('/officials', officials)


//Initialising server
app.listen(5000, () => {
  console.log("server listening to port: 5000");
});
