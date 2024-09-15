const express=require('express')
const multer=require('multer')
const app=express();
const port=3000;
app.listen(port,(err)=>{
    if(err)
    console.log("an error has occured",err)
else console.log(`server is listening on port : ${port}`)
})


function destination(req,file,cb){
cb(null,'./multer/uploads')
}
function filename(req,file,cb){
    const name=Date.now()+"-"+file.originalname;
    cb(null,name)
}
function immageFiletr(req,file,cb){
if(!file.originalname.match(/\.(jpeg|png|jpg|gif)$/))
return cb(new Error('only immage files are allowed'),false)
 // Check if the file size is within the limit (5 MB)
 else if(!file.size <= 5 * 1024 * 1024)
    return cb(new Error('File size exceeds the limit of 5 MB'), false);

cb(null,true)
}

const storage=multer.diskStorage({
destination:destination,
    filename:filename
})


const upload=multer({
    storage:storage,
    fileFilter:immageFiletr
})


app.get('/',(req,res)=>{
    res.sendFile('/multer/first.html',{root:'./'})
})
app.post('/upload',upload.fields([{name:'image1'},{name:'image2'},{name:'image3'}]),(req,res)=>{//,upload.array('image')/upload.single('immage1')
    if (!req.files || req.files.length === 0) {
        res.send("No file uploaded");
    } else {
        res.send('Files uploaded successfully');
    }
})