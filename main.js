// require( '../OgreJS/src/js/ogre.js' ) ; 
// require( '../OgreJS/src/js/mygui.js' ) ;


var http = require('http') ;
var sio = require("socket.io") ;
var fs = require('fs') ;
var SnakeGame = require( './SnakeGame' ) ;
var PlayerManagement = require( './PlayerManagement' ) ;

var app = http.createServer(function (request, response) {
 
    console.log('request for: ' + request.url );
    
    var filename = './public/index.html' ;
    if( request.url == '/socket.io.js' )
        filename = './public/socket.io.js' ;

    if( request.url == '/BrowserScreen.js' )
        filename = './public/BrowserScreen.js' ;

    if( request.url == '/jquery.js' )
        filename = './public/jquery.js' ;

    if( request.url == '/raphael.js' )
        filename = './public/raphael.js' ;

     
    fs.readFile( filename , function(error, content) {
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



var snakeGame = ( new SnakeGame() ).init( 5, 8, 0, io.sockets ) ;

snakeGame.start() ;



function handler (req, res) {
  fs.readFile( './index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var playerManagement = ( new PlayerManagement() ).init( io.sockets, snakeGame ) ;

// ogre.start( 100 ) ;

