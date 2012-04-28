require( '../OgreJS/src/js/ogre.js' ) ; 
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



var snakeGame = ( new SnakeGame() ).init( 18, 22, 0 ) ;
/*

ogre.input.on( 'keyPressed', function( event )
    {
     switch( event.keyName )
        {
                 case 'down' :
                
                    if( snakeGame.playerSet[ 0 ].direction[ 1 ] != 1 )
                    
                        snakeGame.playerSet[ 0 ].direction = [ 0, -1 ] ;
                
                    break ;
                    
                 case 'up' : 

                    if( snakeGame.playerSet[ 0 ].direction[ 1 ] != -1 )
                    
                        snakeGame.playerSet[ 0 ].direction = [ 0, 1 ] ;
                                     
                    break ;
                    
                 case 'left' : // left
                 
                    if( snakeGame.playerSet[ 0 ].direction[ 0 ] != 1 )

                        snakeGame.playerSet[ 0 ].direction = [ -1, 0 ] ;
                    
                    break ;
                    
                 case 'right' : // right
                 
                    if( snakeGame.playerSet[ 0 ].direction[ 0 ] != -1 )

                        snakeGame.playerSet[ 0 ].direction = [  1, 0 ] ;

                    break ;

                 case 's' : // up
                
                    if( snakeGame.playerSet[ 1 ].direction[ 1 ] != 1 )
                    
                        snakeGame.playerSet[ 1 ].direction = [ 0, -1 ] ;
                
                    break ;
                    
                 case 'w' : // down

                    if( snakeGame.playerSet[ 1 ].direction[ 1 ] != -1 )
                    
                        snakeGame.playerSet[ 1 ].direction = [ 0, 1 ] ;
                                     
                    break ;
                    
                 case 'a' : // left
                 
                    if( snakeGame.playerSet[ 1 ].direction[ 0 ] != 1 )

                        snakeGame.playerSet[ 1 ].direction = [ -1, 0 ] ;
                    
                    break ;
                    
                 case 'd' : // right
                 
                    if( snakeGame.playerSet[ 1 ].direction[ 0 ] != -1 )

                        snakeGame.playerSet[ 1 ].direction = [  1, 0 ] ;

                    break ;
        
        
        
        
        
        } ;
    
    } ) ;
*/


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

/*
function PlayerManager() {} ;


PlayerManager.init = function( sockets )
    {
     this.sockets = sockets ;
    
     this.playerQueue = [] ;
     this.MAX_PLAYER_COUNT = 5 ;
    
     this.sockets.on( 'connection', function( socket )
        {
         socket.emit( 'ready', '' ) ;
      
        
        
        } ) ;
    
    } ;
*/


// var playerQueue = [] ;
// var MAX_PLAYER_COUNT = 5 ;
/*
io.sockets.on('connection', function (socket) {

    console.log( 'CONNECTION' ) ;


    socket.emit( 'ready', '' ) ;


    socket.on( 'createSnake', function()
        {
         console.log( 'CREATE SNAKE' ) ;
    
         // if( snakeGame.playerSet.length < MAX_PLAYER_COUNT )
         //       {
                 var player = snakeGame.addPlayer(
                     function()
                        {
                         
                        
                        }
                    ) ;
          
                  //
                  // socket.on('disconnect', function () {

                  //  console.log( 'PLAYER DISCONNECTED' ) ;
                  //});
                  //
                  
 
 //               }
 //        else
 //           playerQueue.push( socket ) ;
            
    }  ) ;
});

*/

ogre.start( 100 ) ;

