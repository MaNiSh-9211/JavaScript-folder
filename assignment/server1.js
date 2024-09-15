const express = require('express');
const app = express();
const path = require('path');
const port=3000
app.get("/", (req, res) => {
    res.sendFile('/assignment/index.html',{root:'./'});
});

app.get("/json", (req, res) => {
    res.json({ message: "Hello World!" });
});


// app.get("/all", (req, res) => {
//     const name = req.query.name;
//     if (name === "xyz") {
//         res.json({ tasks: ["Task XYZ details"] });
//     } else {
//         res.status(404).json({ error: "Not found" });
//     }

//});

const arr = [
    { "name": "manish", "task": "Do something", "completed": false },
    { "name": "xyz", "task": "Do something else", "completed": true },
    { "name": "manjul", "task": "Do yet another thing", "completed": false }
];
app.get("/all", (req, res) => {
    const name = req.query.name;
    const foundObject = arr.find(obj => obj.name ===name);
    if (foundObject) {
        res.json({ task: foundObject.task });
    } else {
        res.status(404).json({ error: "Not found" });
    }
});


app.get("*", (req, res) => {
res.send('Error 404 Page not found')
});
// app.use((req, res) => {
//     res.status(404).json({ error: "Not found" });
// });


app.listen(port, () => {
    console.log(`Server is Running Succesfully on port: ${port}`);
});