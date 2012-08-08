
var ArduinoScreen = require( './ArduinoScreen' ) ;

var WIDTH  = 5 ;
var HEIGHT = 8 ;

var screen = ( new ArduinoScreen() ).init( '/dev/tty.usbmodem1a21', WIDTH, HEIGHT ) ;

var columnIndex = 0 ;


function clearScreen()
    {
     for( var x = 0 ; x < WIDTH ; x++ )
     for( var y = 0 ; y < HEIGHT ; y++ )
        {
         screen.setColor( x, y, [ 0,0,0 ] ) ;
        } ;
    } ;
    
clearScreen() ;

function intensity( x, y, t )
    {
     var rX = 2 - x ;
     var rY = 3 - y ;
     
     var distance = Math.sqrt( rX * rX + rY * rY ) ;
     
     
     var height = Math.sin( ( distance / 3.5 ) * Math.PI - t ) / 2 + .5 ;
     
     return  height  ;
    }


function updateScreen()
    {
     var periodDuration = 2500 ;
     
     var timeScaleFactor = Math.PI * 2 / periodDuration ; 
     
    
     var t = ( new Date() ).getTime() * timeScaleFactor ; // / 200 ;
    
    
     for( var x = 0 ; x < WIDTH ; x++ )
     for( var y = 0 ; y < HEIGHT ; y++ )
        {
         
        
         screen.setColor( x, y, [ Math.pow( intensity( x, y, t ), 3 ) ,  Math.pow( intensity( x, y, t + Math.PI * 2 / 3 ), 3),  Math.pow( intensity( x, y, t + 2 * Math.PI * 2 / 3 ), 3 ) ] ) ;
        } ;
    } ;




setInterval( updateScreen, 50 ) ;    
    
/*
function putColumn( x, r, g, b )
    {
     console.log( 'COLUMN ' + x ) ;
    
     for( var y = 0 ; y < 5 ; y++ )
        screen.setColor( y, x, [ r, g, b ] ) ; 
    } ;
    
setInterval( function()
    {
     
     putColumn( columnIndex,  0.001, 0, 0 ) ;
     columnIndex++ ;
     
     if( columnIndex > 7 ) columnIndex = 0 ;
     //columnIndex = columnIndex > 7 ? 0 : columnIndex ;

     putColumn( columnIndex, .1, 0, 0 ) ;
          
    }, 200 ) ;
    
    */