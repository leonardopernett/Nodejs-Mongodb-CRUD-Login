const passport = require('passport');
const {Strategy}= require('passport-local');
const {User} = require('../model/index')

passport.use('login', new Strategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},async (req, email, password, done)=>{
   
    const user = await User.findOne({email:email});
    if(!user){
        return done(null, false, req.flash('error','email not found'));
    }

    const verifyPassword = await user.comparePassword(password)
    if(!verifyPassword){
        return done(null, false,  req.flash('error','password wrong'));
    }else{
        return done(null, user);
    }

}));

passport.serializeUser((user,done)=>{
    return done(null, user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id,(err, user)=>{
        return done(err,user)
    });
})