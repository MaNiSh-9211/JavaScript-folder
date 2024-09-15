const fs=require('fs')
const express=require('express')
const path=require('path')
const { PassThrough } = require('stream')
const fullpath=path.join(__dirname,__filename)
console.log(fullpath)
console.log(process.cwd())//return path which swowes in our terminal
var data;
// try{
//  data=fs.readFileSync('./temp.txt','utf-8')
// }
// catch(err){
//     console.error('error on rendering file ',err)
// }
// console.log(data);

// hare we have to declare the varivle outside the try block because if we declare it inside try block then it is not acessible 
// outdise try block so we declare the data outside try block and we cant declare a variable as const because if we use const then it is necesary
// to initilize that variable at the same time either it give error
fs.readFile('./temp.txt','utf-8',(err,data)=>{
    if(err)
    console.log('error has occured', err)
else
console.log(data)
})


// the synchronous function return but the asynchronous function do not return anything so we dont assign asynchronous function and have to
//  Pass a callback function which is called from readfile function defination and fron there the err and data parameter is sent with value 
//  to the anonymus function and we can acess them there; 


// const fs = require('fs');

// try {
//   const data = fs.readFileSync('example.txt', 'utf8'); // Attempt to read file
//   console.log(data); // This line will not execute if there's an error reading the file
// } catch (err) {
//   console.error('Error reading file:', err); // Error will be caught here and printed
// }
