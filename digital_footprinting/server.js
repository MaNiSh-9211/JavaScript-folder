const express = require('express');
const UAParser = require('ua-parser-js');
const path = require('path');

const app = express();
const port = 3000;

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

app.get('/user-agent', (req, res) => {
    const parser = new UAParser();
    parser.setUA(req.headers['user-agent']);
    const uaResult = parser.getResult();

    // Construct the response with more details
    res.json({
        brands: uaResult.ua.family ? [{ brand: uaResult.ua.family, version: uaResult.ua.major }] : [],
        mobile: uaResult.device.type === 'mobile',
        platform: uaResult.os.name || 'Unknown',
        platformVersion: uaResult.os.version || 'Unknown',
        architecture: uaResult.cpu.architecture || 'Unknown',
        bitness: uaResult.cpu.bitness || 'Unknown',
        wow64: /WOW64|Win64/.test(req.headers['user-agent']), // Check for WOW64
        model: uaResult.device.model || 'empty',
        uaFullVersion: `${uaResult.ua.major}.${uaResult.ua.minor || 0}.${uaResult.ua.patch || 0}`,
        userAgent: req.headers['user-agent'],
        appVersion: req.headers['user-agent'],
        vendor: uaResult.ua.vendor || 'Unknown',
        language: req.headers['accept-language'].split(',')[0] || 'en-US',
        screenWidth: null, // To be filled in by client-side
        screenHeight: null, // To be filled in by client-side
        clientWidth: null, // To be filled in by client-side
        clientHeight: null // To be filled in by client-side
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
