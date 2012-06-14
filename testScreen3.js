
var ArduinoScreen = require( './ArduinoScreen' ) ;


var screen = ( new ArduinoScreen() ).init( '/dev/tty.ARDUINOBT-BluetoothSeri', 5, 8 ) ;

var columnIndex = 0 ;

function putColumn( x, r, g, b )
    {
     console.log( 'COLUMN ' + x ) ;
    
     for( var y = 0 ; y < 5 ; y++ )
        screen.setColor( y, x, [ r, g, b ] ) ; 
    } ;
/*
     putColumn( 0, 0, 0, .1 ) ;

     putColumn( 1, 0, .1, 0 ) ;

     putColumn( 2, 0, .1, .1 ) ;



setTimeout( function() {

     putColumn( 3, .1, 0, 0 ) ;

     putColumn( 4, .1, 0, .1 ) ;

     putColumn( 5, .1, .1, 0 ) ;

}, 140 ) ;

setTimeout( function() {



     putColumn( 6, .1, .1, .1 ) ;

     putColumn( 7, .1, 0, 0 ) ;
 }, 280 ) ;

*/

setInterval( function()
    {/*
     for( var x = 0 ; x < 5 ; x++ )
     for( var y = 0 ; y < 8 ; y++ )
     if( Math.random() > .8 ) 
            { 
               */
            
             var x = Math.floor( Math.random() * 5 ) ;
             var y = Math.floor( Math.random() * 8 ) ;
                                             
             var r = Math.random() ;
             var g = Math.random() ;
             var b = Math.random() ;             
             
             
             screen.setColor( 3, 3, 0, 0, 1 ) ;
            // } ;
    
         if( columnIndex > 7 ) columnIndex = 0 ;

  /*   
     putColumn( columnIndex,  0, 0, 0 ) ;
     columnIndex++ ;
     
     if( columnIndex > 7 ) columnIndex = 0 ;
     //columnIndex = columnIndex > 7 ? 0 : columnIndex ;

     putColumn( columnIndex, .1, 0, 0 ) ;
         */ 
    }, 1000 ) ;
    
    