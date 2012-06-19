
var ArduinoScreen = require( './ArduinoScreen' ) ;


var screen = ( new ArduinoScreen() ).init( '/dev/tty.ARDUINOBT-BluetoothSeri', 5, 8 ) ;

var columnIndex = 0 ;

function putColumn( x, r, g, b )
    {
    
     for( var y = 0 ; y < 5 ; y++ )
        screen.setColor( y, x, [ r, g, b ] ) ; 
    } ;
    
    
    
setInterval( function()
    {
     var t = .02 * ( new Date() ).getTime() / Math.PI ;
    
     for( var x = 0 ; x < 8 ; x++ ) 
          putColumn( x, Math.sin( t ), Math.cos( t ), Math.sin( t + Math.PI / 4 ) )  ;

     
     /*
     putColumn( columnIndex,  0.001, 0, 0 ) ;
     columnIndex++ ;
     
     if( columnIndex > 7 ) columnIndex = 0 ;
     //columnIndex = columnIndex > 7 ? 0 : columnIndex ;

     putColumn( columnIndex, .1, 0, 0 ) ;
          */
    }, 35 ) ;
    
    