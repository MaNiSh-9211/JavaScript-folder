const fs=require('fs')
const express=require('express')
const app=express()
const port=2000;
var invalidcount=0;
app.use((req,res,next)=>{
    next();
    if(req.url!='/favicon.ico'&&req.url!='home'&&req.url!='/about'){
        var date=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var reqlog=`${req.url} requested on ${date}`;
        fs.appendFileSync('./f2/errors.json',reqlog+'\n')
        invalidcount++;
    }
})
app.get('/home',(req,res)=>{
    res.send('Home Page');
})
app.get('/about',(req,res)=>{
    res.send('About page')
})
app.get('/showrequest',(req,res)=>{
    res.sendFile('errors.json',{root:__dirname})
})
app.get('*',(req,res)=>{
    res.send(`invalid request count : ${invalidcount}`)
})
app.listen(port,function(err){
if(err)
console.error('error has generated',err)
else
console.log(`server is listening on ${port}`)
})
