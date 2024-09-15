const express=require('express')
const router=express.Router()
router.get('/',(req,res)=>{
    res.send("welcome to student")
})
router.get('/name',(req,res)=>{
    res.send("name of student is manish")
})
router.get('/age',(req,res)=>{
    res.send('age of student is 20')
})

router.get('/subject',(req,res)=>{
    res.send('subject he studies is backend')
})
module.exports=router
//export default router