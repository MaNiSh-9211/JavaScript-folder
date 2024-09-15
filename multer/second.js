const express=require('express')
const multer=require('multer')
const app=express();
const port=3000;
app.listen(port,(err)=>{
    if(err)
    console.log("an error has occured",err)
else console.log(`server is listening on port : ${port}`)
})
const upload = multer({
    dest:'./multer/uploads' // Destination directory for uploaded files
})
app.get('/',(req,res)=>{
    res.sendFile('/multer/second.html',{root:'./'})
})
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.send('No file uploaded.');
    }
    res.send(`File uploaded successfully: ${req.file.originalname}`);
});
