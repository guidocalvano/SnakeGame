
var ArduinoScreen = require( './ArduinoScreen' ) ;


var screen = ( new ArduinoScreen() ).init( '/dev/tty.ARDUINOBT-BluetoothSeri', 5, 8 ) ;

var columnIndex = 0 ;

function putColumn( x, r, g, b )
    {
     console.log( 'COLUMN ' + x ) ;
    
     for( var y = 0 ; y < 5 ; y++ )
        screen.setColor( y, x, [ r, g, b ] ) ; 
    } ;

     putColumn( 0, 0, 0, .1 ) ;

     putColumn( 1, 0, .1, 0 ) ;

     putColumn( 2, 0, .1, .1 ) ;


setTimeout( function() {
     putColumn( 3, .1, 0, 0 ) ;

     putColumn( 4, .1, 0, .1 ) ;

     putColumn( 5, .1, .1, 0 ) ;

}, 50 ) ;

setTimeout( function() {



     putColumn( 6, .1, .1, .1 ) ;

     putColumn( 7, .1, 0, 0 ) ;
 }, 100 ) ;


/*
setInterval( function()
    {
     
     putColumn( columnIndex,  0, 0, 0 ) ;
     columnIndex++ ;
     columnIndex = columnIndex >= 8 ? 0 : columnIndex ;

     putColumn( columnIndex, .1, 0, 0 ) ;
          
    }, 3000 ) ;
    
    */