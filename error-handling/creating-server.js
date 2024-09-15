const express = require('express');
const app = express();

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling for server
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
    process.exit(1); // Exit the process with a failure code
  } else if (err.code === 'EACCES') {
    console.error(`Permission denied. You need elevated privileges to bind to port ${PORT}.`);
    process.exit(1); // Exit the process with a failure code
  } else {
    console.error('An unknown error occurred:', err.message);
    process.exit(1); // Exit the process with a failure code
  }
});

// console.log(express);


const app2=require("express")();
const port2=3000;
const server2=app2.listen(port2,()=>{
    console.log(`server jas started on port ${port2}`)
})

server2.on('error',(err)=>{
    console.error(`an unknown error has occured${err.message}`);
    process.exit(1);
})
// Creating an Application Instance:

// When express() is called, it creates an object that represents the Express application. This object provides methods for
// handling requests, setting up middleware, and defining routes.