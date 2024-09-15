const express=require('express')
const router=express.Router();
router.get('/info',(req,res)=>{
    res.send('info is not avalable')
})
module.exports=router
