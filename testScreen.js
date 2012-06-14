
var ArduinoScreen = require( './ArduinoScreen' ) ;


var screen = ( new ArduinoScreen() ).init( '/dev/tty.ARDUINOBT-BluetoothSeri', 5, 8 ) ;

var columnIndex = 0 ;

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
    
    