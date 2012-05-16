
var http = require('http') ;
var sio = require("socket.io") ;
var fs = require('fs') ;
 
var app = http.createServer(function (request, response) {
 
    console.log('request starting...');
     
    fs.readFile('./public/index.html', function(error, content) {
        if (error) {
            response.writeHead(500);
            response.end();
        }
        else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(content, 'utf-8');
        }
    });
     
}) ;
 
 
 
var io = sio.listen( 8126 ) ;
 
app.listen(8125);
 
io.set('transports', [
   'xhr-polling'
]);
 