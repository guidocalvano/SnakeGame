
define( [], function()
{

function Map() {} ;


Map.prototype.init = function( width, height )
    {
     this.width  = width  ;
     this.height = height ;
    
    
     this.tileTable = [] ;
     
     
        
        
     for( var x = 0 ; x < width ; x++ )
        {
         this.tileTable[ x ] = [] ;
         for( var y = 0 ; y < height ; y++ )
            this.tileTable[ x ][ y ] = false ;
        } 
     return this ;
    } ;
    

Map.prototype.add = function( coord, newEntity )
    {
     var entity = this.tileTable[ coord[ 0 ] ][ coord[ 1 ] ] ;
    
     if( entity == -1 ) return -1 ;
    
     this.tileTable[ coord[ 0 ] ][ coord[ 1 ] ] = newEntity ;
     
     return entity ;
    } ;


Map.prototype.remove = function( coord )
    {
     this.tileTable[ coord[ 0 ] ][ coord[ 1 ] ] = 0 ;     
    } ;

return Map ;
} ) ;