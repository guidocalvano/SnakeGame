
define( [], function() 
{
function RemoteScreen() {} ;

RemoteScreen.prototype.init = function( socketSet ) 
    {
     this.socketSet = socketSet ;        
     return this ;
    } ;

RemoteScreen.prototype.setColor = function( x, y, color )
    {
     this.socketSet.emit( 'BrowserScreen.setColor', { x: x, y: y, color: color } ) ;
    } ;
    
return RemoteScreen ;
} ) ;