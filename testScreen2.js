
var ArduinoScreen = require( './ArduinoScreen' ) ;


var screen = ( new ArduinoScreen() ).init( '/dev/tty.ARDUINOBT-BluetoothSeri', 5, 8 ) ;


var head = [ 0, 7 ]
var tail = [ 0, 0 ]

setInterval( function()
    {
     screen.setColor( head[0], head[1], [ 0.2, 0, 0 ] ) ;

     screen.setColor( tail[0], tail[1], [ 0, 0, 0 ] ) ;
     
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



