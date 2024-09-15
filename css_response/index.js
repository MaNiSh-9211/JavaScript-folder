// works properly but is very complex we have to read both files and and have to replace the head ag with the actual value inside css 
//file which makes it more complex
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Route to serve the merged HTML and CSS
app.get('/', (req, res) => {
    // Read the HTML file
    fs.readFile(__dirname + '/index.html', 'utf8', (err, htmlContent) => {
        if (err) {
            return res.send('Error reading HTML file');
        }
        
        // Read the CSS file
        fs.readFile(__dirname + '/styles.css', 'utf8', (err, cssContent) => {
            if (err) {
                return res.send('Error reading CSS file');
            }
            
            // Merge the HTML and CSS content
            const mergedContent = htmlContent.replace('</head>', `<style>${cssContent}</style></head>`);

            // Send the merged content as the response
            res.send(mergedContent);
        });
    });
});




// using synchronous functions

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
