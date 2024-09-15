const express = require('express');
const app = express();
const port = 3000;

// Define dynamic routes
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`User profile page for user with ID ${userId}`);
});

app.get('/posts/:postId', (req, res) => {
    const postId = req.params.postId;
    res.send(`Post details page for post with ID ${postId}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
// ----Examples of URL Parameters:

// 1>>>>>Query Parameters:
// https://example.com/search?q=javascript
// In this URL, q is the parameter key, and javascript is the parameter value.

// 2>>>Route Parameters:
// https://example.com/users/123
// In this URL, 123 is the value of the userId route parameter.