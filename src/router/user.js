const {Router}= require('express');
const router = Router();
const {renderSignin, renderSignup, signup, signin, logout} = require('../controller/UserController')
router.get('/signup', renderSignup);
router.get('/signin', renderSignin);

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout)


module.exports= router