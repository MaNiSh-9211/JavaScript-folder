const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // Parse the request URL to extract query parameters
  const parsedUrl = url.parse(req.url, true);

  // Log the query parameters
  console.log('Query Parameters:', parsedUrl.query);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Check the console for the query parameters.'); 
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
