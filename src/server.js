const express        = require('express'),
      morgan         = require('morgan'),
      path           = require('path'),
      hbs            = require('express-handlebars'),
      session        = require('express-session'),
      flash          = require('connect-flash'),
      passport       = require('passport'),
      methodOverride = require('method-override'),
      errorhandler   = require('errorhandler');

//initialization
const app = express();
require('./config/passport');
//setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'))
app.engine('hbs', hbs({
   defaultLayout:'main',
   layoutsDir:path.join(app.get('views'), 'layout'),
   partialsDir:path.join(app.get('views'), 'partial'),
   extname:'.hbs',
   helpers:require('./helpers/handlebars')
}))
app.set('view engine', 'hbs');

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'secretkey',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride('_method'));

//global variable
app.use((req,res,next)=>{
    app.locals.success = req.flash('success');
    app.locals.error   = req.flash('error');
    app.locals.user = req.user;
    next();
})

//router
app.use('/notes',require('./router/notes'));
app.use(require('./router/user'));
app.use(require('./router/index'));
//static
app.use(express.static(path.join(__dirname,'public')));

//error 404
app.get('*',(req,res)=>{
    res.status(404).json({
        mensaje:'page not found error 404'
    })
})

if(process.env.NODE_ENV !== 'production'){
    app.use(errorhandler());
}

module.exports = app;