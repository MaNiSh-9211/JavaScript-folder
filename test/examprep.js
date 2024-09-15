const express=require('express')
const mongoose=require('mongoose')
const session=require('express-session')
const app=express()
const port=3000;
app.use(express.urlencoded({extended:true}))

// connecting mongodb
const uri = 'mongodb+srv://USER:PASSWORD@cluster.mongodb.net/registration?retryWrites=true&w=majority';
mongoose.connect(uri)
const db=mongoose.connection
db.on('error',(error)=>{
    if(error)
        console.log('error has occured on connecting with db',error)
    else
    console.log('db connected sucessfully')
})

const userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
  });
const user=mongoose.model('kaku',userSchema)
app.use(session({
    secret:'mysecret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:20000,
        secure:false
    }
}))


app.get('/register',(req,res)=>{
    res.sendFile('register.html',{root:'./test'})
})

app.post('/register',async(req,res)=>{
    const { email, firstName, lastName, password } = req.body;
try{
    const userexists=await user.findOne({email})
    if(userexists)
        res.send('user alleredy exists')
    else{
const newuser=new user({email, firstName, lastName, password})
await newuser.save();
    }
res.redirect('/login')
}
catch(err){
    console.log('error',err)
    res.send('server error')
}
})
app.get('/login',(req,res)=>{
    res.sendFile('login.html',{root:'./test'})
})
app.post('/login',async(req,res)=>{
    const {email, firstName, lastName, password}=req.body
    try{
        const isvaliduser=await user.findOne({email,password})
        if(isvaliduser){
            req.session.user=isvaliduser
            res.redirect('/dashboard')
        }
        else{
            res.send('password is incorrect')
        }
    }
    catch(err){
        console.log('error occured in post login')
        res.send('server error')
    }
})

app.get('/dashboard',(req,res)=>{
    if(req.session.user)
    res.sendFile('dashboard.html',{root:'./test'})
else
res.redirect('/login')
})
app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err)
            console.log('error on destroying session')
    });
    res.redirect('/login')
})
app.listen(port,(err)=>{
    if(err)
        console.log(`an error has occured : ${err}`)
    else
    console.log(`server is started in port: ${port}`)
})
