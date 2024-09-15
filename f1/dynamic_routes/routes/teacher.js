//import express from 'express'
const express=require('express')
const router=express.Router()

router.get('/name',(req,res)=>{
    res.send("name of teacher is Doremon")
})
router.get('/age',(req,res)=>{
    res.send('age of teacher is 30')
})

router.get('/subject',(req,res)=>{
    res.send('subject he teaches is backend')
})
 module.exports=router