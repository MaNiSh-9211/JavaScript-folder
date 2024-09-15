const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up Multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './multer/uploads'); // Specify the destination directory
//     },
//     filename: function (req, file, cb) {
//         const fileName = Date.now() + '-' + file.originalname;
//         cb(null, fileName); // Generate unique filenames
//     }
// });

// // Filter only image files
// const imageFilter = function (req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: imageFilter
// });
// Define the destination function
function destination(req, file, cb) {
    cb(null, './multer/uploads'); // Specify the destination directory
}

// Define the filename function
function filename(req, file, cb) {
    const fileName = Date.now() + '-' + file.originalname;
   // const fileName = new Date().toISOString().replace(/[-:]/g, ' ').replace('T', ' ') + ' - ' + file.originalname;

    cb(null, fileName); // Generate unique filenames
}

// Define the image filter function
function imageFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: destination,
    filename: filename
});

// Create Multer instance with custom storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: imageFilter
});
// Serve HTML form for file upload
app.get('/', (req, res) => {
    res.sendFile('/multer/first.html',{root:'./'});
});
// Handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const uploadTime = new Date().toLocaleString();
    console.log('File uploaded:');
    console.table([{ 'File Name': req.file.filename, 'Upload Time': uploadTime }]);
    res.send('File uploaded successfully.');
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// The dest option in Multer allows you to specify the destination directory where uploaded files will be stored directly. 
// This option is a shorthand for quickly setting the destination directory without needing to customize the filename 
// or perform additional logic for file storage.

// On the other hand, the diskStorage function provides more flexibility and control over how uploaded files are stored on the disk.
//  It allows you to define custom logic for both the destination directory and the filename of uploaded files. This can be useful in scenarios
//  where you need to generate unique filenames, organize files into subdirectories based on certain criteria, or perform other custom file storage operations.

// In summary:

// Using dest Option:

// Convenient for quickly specifying a destination directory.
// Suitable for simple file upload scenarios where custom filename logic is not required.
// Using diskStorage Function:

// Offers flexibility and customization for defining destination directory and filename logic.
// Useful for advanced file storage requirements, such as generating unique filenames, organizing files into subdirectories, 
// or implementing custom naming conventions. So, while dest option is sufficient for basic file storage needs, diskStorage function 
// provides more control and flexibility for handling file storage in complex scenarios. Depending on your specific requirements, you can choose 
// the appropriate approach.