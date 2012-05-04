

function BrowserScreen() {} ;

BrowserScreen.prototype.init = function( tileWidth, columnCount, rowCount ) 
    {
     var paper = Raphael(0, 0, tileWidth * columnCount, tileWidth * rowCount ) ; 
     
     this.tileTable = [] ;
     
     for( var x = 0 ; x < columnCount ; x++ )
        {
         this.tileTable[ x ] = [] ;
         for( var y = 0 ; y < rowCount ; y++ )
            {
             this.tileTable[ x ][ y ] = paper.rect( x * tileWidth, y * tileWidth, tileWidth, tileWidth ) ;
             this.tileTable[ x ][ y ].attr( 'fill', '#000000' ) ;
            } 
        } 
        
     return this ;
    } ;

BrowserScreen.prototype.setColor = function( x, y, color )
    {
     this.tileTable[ x ][ y ].attr( 'fill', 'rgb( ' + 255 * color[ 0 ] + ', ' + 255 * color[ 1 ] + ', ' + 255 * color[ 2 ] + ' )' ) ;
    } ;
