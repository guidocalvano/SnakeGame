

function SnakeGame() {} ;


SnakeGame.prototype.init = function( width, height, playerCount ) 
    {
     this.screen = ( new SnakeScreen() ).init( 20, width, height ) ;
    
     this.map = ( new Map() ).init( width, height ) ;
    
     this.playerSet = [] ;

     for( var i = 0 ; i < playerCount ; i++ )
        this.playerSet[ i ] = ( new Snake() ).init( 
        
            'rgb( ' + Math.floor( ( Math.random() * 256 ) ) + ', ' +  Math.floor( ( Math.random() * 256 ) ) + ', ' +  Math.floor( ( Math.random() * 256 ) ) + ' )' , 5, this,
             Math.floor( Math.random() * width ), Math.floor( Math.random() * height ) ) ;
             
     return this ;
    } ;
    
SnakeGame.prototype.start = function()
    {
     var self = this ;
     this.process = setInterval( function()
        {
         for( var i in self.playerSet )
            {
             self.playerSet[ i ].move() ;
            }
        }, 200 ) ;
    


     this.putFrogProcess = setInterval( function()
        {
         self.add( [ Math.floor( Math.random() * self.map.width ), Math.floor( Math.random() * self.map.height ) ], 1, '#FFFFFF' ) ;
        }, 3000 ) ;    
    } ;




SnakeGame.prototype.add = function( segment, newEntity, color )
    {
     var entity = this.map.add( segment, newEntity ) ;
     if( entity == -1  ) 
        return entity ;
     
     this.screen.setColor( segment[ 0 ], segment[ 1 ], color ) ;
    
     return entity ;
    } ;



SnakeGame.prototype.remove = function( segment )
    {
     this.map.remove( segment ) ;
     this.screen.setColor( segment[ 0 ], segment[ 1 ], '#000000' ) ;
    
    } ;

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



function Snake() {} ;

Snake.prototype.init = function( color, length, game, startX, startY ) 
    {
     this.direction = [ -1, 0 ] ;
     
     this.color = color ;
    
     this.game = game ;
     
     this.headIndex = 0 ;
    
     this.requiredGrowth = length - 1 ;
    
     this.tailSegments = new Array( 1 ) ;
     
     this.tailSegments[ 0 ] = [ startX, startY ] ;
     
     
     return this ;
    } ;
    
    
Snake.prototype.reset = function()
    {

     for( var i in this.tailSegments )
        if( i != this.headIndex ) 
            this.game.remove( this.tailSegments[ i ] ) ;
    
    
     this.init( this.color, 1, this.game, 1, 1 ) ;
    } ;
    
    
Snake.prototype.move = function()
    {
     var tailIndex = this.nextSegmentIndex( this.headIndex ) ;
     var tail = this.tailSegments[ tailIndex ] ;
     
     
     
     var oldHead = this.tailSegments[ this.headIndex ] ;
     
     this.headIndex = this.nextSegmentIndex( this.headIndex ) ;
     
     if( this.requiredGrowth > 0 )
        {   
         this.tailSegments.splice( this.headIndex, 0, [] ) ;      
         this.requiredGrowth -- ;
        } 
     else 
        this.game.remove( tail ) ;


     
     var newHead = [ ( this.game.map.width + oldHead[ 0 ] + this.direction[ 0 ] ) % this.game.map.width, ( this.game.map.height + oldHead[ 1 ] + this.direction[ 1 ] ) % this.game.map.height ] ;
     this.tailSegments[ this.headIndex ] = newHead ;
     
     var outcome = this.game.add( newHead, -1, this.color )
     if( outcome == -1 ) 
        this.reset() ;
     else
        this.requiredGrowth += outcome ;
    } ;
    

Snake.prototype.nextSegmentIndex = function( segmentIndex )
    {     
     return ( segmentIndex + 1 ) % this.tailSegments.length ;
    } ;


function SnakeScreen() {} ;

SnakeScreen.prototype.init = function( tileWidth, columnCount, rowCount ) 
    {
     var paper = Raphael(0, 0, tileWidth * columnCount, tileWidth * rowCount ) ; 
     
     this.tileTable = [] ;
     
     for( var x = 0 ; x < columnCount ; x++ )
        {
         this.tileTable[ x ] = [] ;
         for( var y = 0 ; y < columnCount ; y++ )
            {
             this.tileTable[ x ][ y ] = paper.rect( x * tileWidth, y * tileWidth, tileWidth, tileWidth ) ;
             this.tileTable[ x ][ y ].attr( 'fill', '#000000' ) ;
            } 
        } 
        
     return this ;
    } ;

SnakeScreen.prototype.setColor = function( x, y, color )
    {
     this.tileTable[ x ][ y ].attr( 'fill', color ) ;
    } ;
