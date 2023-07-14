const http = require('http'); 
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
  const indexPath = path.join(__dirname, 'register', 'index.html');
  const cssPath = path.join(__dirname, 'register', 'stylesheet.css');
  const jsPath = path.join(__dirname, 'register', 'index.js');
  
  fs.readFile(indexPath, 'utf8', (error, htmlData) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.write('File not found');
      response.end();
    } else {
      fs.readFile(cssPath, 'utf8', (error, cssData) => {
        if (error) {
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.write('Internal Server Error');
          response.end();
        } else {
          fs.readFile(jsPath, 'utf8', (error, jsData) => {
            if (error) {
              response.writeHead(500, { 'Content-Type': 'text/plain' });
              response.write('Internal Server Error');
              response.end();
            } else {
              const fullHtml = htmlData.replace('</head>', `<style>${cssData}</style></head>`)
                                       .replace('</body>', `<script>${jsData}</script></body>`);
              response.writeHead(200, { 'Content-Type': 'text/html' });
              response.write(fullHtml);
              response.end();
            }
          });
        }
      });
    }
  });
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
