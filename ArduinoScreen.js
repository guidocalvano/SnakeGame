
define( [ 'serialport' ], function( serial ) 
{
function ArduinoScreen() {} ;

ArduinoScreen.prototype.init = function( serialString, width, height ) 
    {
     this.width = width ;
     this.height = height ;
     
     // '/dev/tty.ARDUINOBT-BluetoothSeri'
     this.serial = new serial.SerialPort( '/dev/tty.ARDUINOBT-BluetoothSeri' ) ;
  
       //  this.serial.write( String.fromCharCode( 3 ) + String.fromCharCode( 0 ) + String.fromCharCode(0   )+ String.fromCharCode( 2 ) ) ;
  
     return this ;
    } ;

ArduinoScreen.prototype.setColor = function( x, y, color )
    {
     console.log( 'x y color ' + x + ' ' + y + ' ' + Math.floor( 200 * color[ 0 ] ) + ' ' + Math.floor( 200 * color[ 1 ] ) + ' ' + Math.floor( 200 * color[ 2 ] ) ) ;
     var rowStartIndex           = x * this.height ;
   
     var relativeColumnIndex ;
     
     if( ( x % 2 ) == 1 )
       relativeColumnIndex = y ;
     else
       relativeColumnIndex = this.height - 1 - y ;
     
     console.log( 'rowStartIndex ' + rowStartIndex ) ;
     console.log( 'relativeColumnIndex ' + relativeColumnIndex ) ;
            
     var i = rowStartIndex + relativeColumnIndex ;
    
     console.log( 'index ' +i ) ;
    
     var str = String.fromCharCode( i ) + String.fromCharCode( Math.floor( 200 * color[ 0 ] ) ) + String.fromCharCode( Math.floor( 200 * color[ 1 ] )  )+ String.fromCharCode( Math.floor( 200 * color[ 2 ] ) ) ;
    
    
    // var str = String.fromCharCode( 3 ) + String.fromCharCode( 0 ) + String.fromCharCode(0   )+ String.fromCharCode( 2 ) ;

    
    // console.log( 'string ' + str ) ;
    
     this.serial.write( str ) ;

      // this.socketSet.emit( 'BrowserScreen.setColor', { x: x, y: y, color: color } ) ;
    } ;
    
return ArduinoScreen ;
} ) ;