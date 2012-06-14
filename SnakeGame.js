

define( [ './Map', './Snake', './ScreenSet', './ArduinoScreen', './RemoteScreen' ], function( Map, Snake, ScreenSet, ArduinoScreen, RemoteScreen )
{
function SnakeGame() {} ;

SnakeGame.prototype.init = function( width, height, playerCount, socketSet ) 
    {
     console.log( 'init called' ) ;
     
     var arduinoScreen = ( new ArduinoScreen() ).init( '/dev/tty.ARDUINOBT-BluetoothSeri', width, height ) ;
     
     console.log( 'arduinoScreen created' ) ;
     
     var remoteScreen  = ( new RemoteScreen() ).init( socketSet ) ;
    
     this.screen = ( new ScreenSet() ).init() ;
     
     console.log( 'screenset inited' );
     
     
     this.screen.add( arduinoScreen ) ;
     this.screen.add( remoteScreen  ) ;
    
     console.log( 'screens added' ) ;
    
     this.map = ( new Map() ).init( width, height ) ;
    
     this.playerSet = [] ;

     for( var i = 0 ; i < playerCount ; i++ )
        this.playerSet[ i ] = ( new Snake() ).init( 
        
            [ .5 * Math.random(), .5 * Math.random(), .5 * Math.random() ], 2, this,
             Math.floor( Math.random() * width ), Math.floor( Math.random() * height ) ) ;
             
     return this ;
    } ;



var columnIndex = 0 ;

function putColumn( screen, x, r, g, b )
    {
     console.log( 'COLUMN ' + x ) ;
    
     for( var y = 0 ; y < 5 ; y++ )
        screen.setColor( y, x, [ r, g, b ] ) ; 
    } ;


var lastTime = ( new Date() ).getTime() ;
SnakeGame.prototype.start = function()
    {
    
    
    
    
     var self = this ;
     this.process = setInterval( function()
        {
         for( var i in self.playerSet )
            {
             self.playerSet[ i ].move() ;
            }
        
        
    

        
        
         if( lastTime + 6000 < ( new Date() ).getTime() )
            {
             self.add( [ Math.floor( Math.random() * self.map.width ), Math.floor( Math.random() * self.map.height ) ], 1, [ .01, .01, .1 ] ) ;
          
             lastTime = ( new Date() ).getTime() ;
            }
            
            
        }, 400 ) ;
    


    /*
var head = [ 0, 7 ]
var tail = [ 0, 0 ]

setInterval( function()
    {
     self.screen.setColor( head[0], head[1], [ 0.2, 0, 0 ] ) ;

     self.screen.setColor( tail[0], tail[1], [ 0, 0, 0 ] ) ;
     
     tail[1]++ ;
     head[1]++ ;     
     
     if( tail[1] == 8 ) 
        {
         tail[1] = 0 ;
         tail[0]++ ;
         
         if( tail[0] == 5 ) tail[0] = 0 ;
        }
 
     if( head[1] == 8 ) 
        {
         head[1] = 0 ;
         head[0]++ ;
         
         if( head[0] == 5 ) head[0] = 0 ;
        }

    }, 20 ) ;
*/

/*
     this.putFrogProcess = setInterval( function()
        {
         self.add( [ Math.floor( Math.random() * self.map.width ), Math.floor( Math.random() * self.map.height ) ], 1, [ .01, .01, .1 ] ) ;
        }, 8000 ) ;
      */  
                
    } ;


SnakeGame.prototype.addPlayer = function( onDeath )
    {
     var player = ( new Snake() ).init(  [ Math.random() * .2, Math.random() * .2, Math.random() *.2 ], 2, this,
             Math.floor( Math.random() * this.map.width ), Math.floor( Math.random() * this.map.height ), onDeath ) ;

     this.playerSet.push( player ) ;
     
     return player ;
    } ;


SnakeGame.prototype.add = function( segment, newEntity, color )
    {
     var entity = this.map.add( segment, newEntity ) ;
     if( entity == -1  ) 
        return entity ;
     
     this.screen.setColor( segment[ 0 ], segment[ 1 ], color ) ;
    
     return entity ;
    } ;



SnakeGame.prototype.remove = function( segment )
    {
     this.map.remove( segment ) ;
     this.screen.setColor( segment[ 0 ], segment[ 1 ], [ .001, 0, 0 ] ) ;
    
    } ;

return SnakeGame ;

} ) ;
