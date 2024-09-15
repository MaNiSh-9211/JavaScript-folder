const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views','./querry_string')
// Middleware to serve static files
//app.use(express.static('public'));

// Route to handle form submission and display welcome page
app.get('/',(req,res)=>{
    res.sendFile('/querry_string/index.html',{root:'./'})
})
app.get('/welcome', (req, res) => {
  // Extract user details from query string
  const username = req.query.username;
  let age = req.query.age;
  const adress=req.query.address;
  if(age>18)
  age=`you are an adult with age :${age}`;
else
age=`you are tenager with age :${age}`;  // Render welcome page with user details
  res.render('message', { username: username, age: age,adress:adress });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});




// mport url from 'url'
// import querystring from 'querystring'
 
// // A URL is taken
// let exampleUrl = 
// 'http://www.company.com:81/a/b/c.html?user=GEEKSFORGEEKS&year=2021#p2';
 
// //Parse the whole URL
// let parsed_Url = url.parse(exampleUrl);
 
// // Parse only querystring.
// let parsed_queryString = querystring.parse(parsed_Url.query);
 
// // Print the result.
// console.log("This is parsed URL :",parsed_Url);
 
// console.log("This is parsed Query String :",parsed_queryString);


// Output:
 

// This is parsed URL : Url {
//   protocol: 'http:',
//   slashes: true,
//   auth: null,
//   host: 'www.company.com:81',
//   port: '81',
//   hostname: 'www.company.com',
//   hash: '#p2',
//   search: '?user=GEEKSFORGEEKS&year=2021',
//   query: 'user=GEEKSFORGEEKS&year=2021',
//   pathname: '/a/b/c.html',
//   path: '/a/b/c.html?user=GEEKSFORGEEKS&year=2021',
//   href: 
// 'http://www.company.com:81/a/b/c.html?user=GEEKSFORGEEKS&year=2021#p2'
// }
// This is parsed Query String : [Object: null prototype] 
//                { user: 'GEEKSFORGEEKS', year: '2021' }
