define( [], function()
    {
     function ScreenSet() {} ;
     
     ScreenSet.prototype.init = function()  
        {
         this.screenSet = [] ;
         
         return this ;
        } ;
    
     ScreenSet.prototype.add = function( screen )
        { this.screenSet.push( screen ) ; } ;
        
        
     ScreenSet.prototype.setColor = function( x, y, color )
        {
         for( var i in this.screenSet )
            this.screenSet[ i ].setColor( x, y, color ) ;
        } ;
    
    
    
     return ScreenSet ;
    } ) ;