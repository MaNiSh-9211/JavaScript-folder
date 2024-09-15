const express = require('express');
const app = express();
const port = 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views','./EJS/views')
// escaped html if we use <%=
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 }
];
//unescaped html if we use <%-
// const user = {
//     name: 'John Doe',
//     bio: '<strong>Web Developer</strong> with over <em>10 years</em> of experience.'
// };
// Define a route to render the EJS template
app.get('/', (req, res) => {
    res.render('index', { users: users});
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// By default, Express looks for the "views" directory in the root of your project.
//  If your directory structure is different or if you want to specify a custom location for your 
// "views" directory, you need to set the views option in your Express app.

// No, <%# %> comments in EJS are not the same as standard HTML comments. While HTML comments
//  (<!-- comment -->) are included in the HTML source code and can be viewed by anyone who inspects 
// the page source, EJS comments (<%# comment %>) are specifically for the server-side template and do 
// not appear in the rendered HTML output at all.

//<%- include('footer') %>
//this only need name of file without extensions because it checks in the view engine specified path