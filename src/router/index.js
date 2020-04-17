const {Router}= require('express');
const router = Router();


router.get('/',(req,res)=>{
  res.redirect('/home');
});
router.get('/home',(req,res)=>{
    res.render('index',{active:true})
});

router.get('/about',(req,res)=>{
    res.render('about',{active:true})
})



module.exports= router