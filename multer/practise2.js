const express=require('express')
const app=express();
const multer=require('multer')
const port=4000;
app.listen(port,(err)=>{
    if(err)
        console.log('server not started',err)
    else 
    console.log(`server has started on port : ${port}`)
})


function destination(req,file,cb){
    cb(null,'./multer/uploads')
}

function fileName(req,file,cb){
    const name=Date.now()+"-"+file.originalname;
    cb(null,name)
}

    // const storage=multer.diskStorage({
    // destination:destination,
    //     filename:fileName
    // })
    // function immageFilter(req,file,cb){
    //     if(!file.originalname.match(/\.(jpeg|png|jpg|gif)$/))
    //     return cb(new Error('only immage files are allowed'),false)
    //     cb(null,true)
    //     }


function immageFilter(req,file,cb){
    if(!file.originalname.match(/\.(jpeg|png|gif|jpg)$/))
        return cb(new Error('only immage files are allowed to upload',false))
    
     cb(null,true)
}
const storage=multer.diskStorage({
    destination:destination,
    filename:fileName
})
const upload=multer({
    storage:storage,
    fileFilter:immageFilter
})
app.get('/',(req,res)=>{
    res.sendFile('/multer/first.html',{root:'./'})
})

app.post('/upload',upload.fields([{name:"image1"},{name:"image2"},{name:"image3"}]),(req,res)=>{
if(!req.files&&req.files.length===0)
    res.send('file not uploaded')
else
res.send('file uploaded sucessfully');
})