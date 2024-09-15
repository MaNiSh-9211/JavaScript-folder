const express=require('express')
const fs=require('fs')
const app=express()
const port=3000;
const student=require('./routes/student.js')/// hare . is working like __dirname
const teacher = require('c:/Users/DELL/OneDrive/Desktop/java/f1/dynamic_routes/routes/teacher.js');//another way using absolute path
const info=require('./routes/info.js')
app.use('/',info)
app.use('/student',student)// is a method provided by the Express Router object. It is used to bind middleware functions to the router.
app.use('/teacher',teacher)//3
app.listen(port,(err)=>{
    if(err)
    console.log(err);
else
console.log(`server is listening on port : ${port}`)
})

// app.use(student);
// With this setup, the student router middleware will be mounted at the root path (/) of your application. This means that any 
//routes defined in the student module will be directly accessible from the root path.

// For example, if the student module defines a route for /info, it will be accessible at the path /info.


//3
// it understands that  before the specified endpoint in the middleware there is root like localhost:300


// In Express.js, when both app.get and app.use are used for the same route, the function attached with app.use will 
// receive control first before the one attached with app.get. This is because app.use is designed to attach middleware functions to 
// every route or path, regardless of the HTTP method used. Therefore, middleware functions attached with app.use are 
// executed before the route-specific middleware or route handler attached with app.get for the same route.