
define( [], function()
{

function Snake() {} ;

Snake.prototype.init = function( color, length, game, startX, startY, onDeath ) 
    {
     this.direction = [ -1, 0 ] ;
     
     this.color = color ;
    
     this.game = game ;
     
     this.headIndex = 0 ;
    
     this.requiredGrowth = length - 1 ;
    
     this.tailSegments = new Array( 1 ) ;
     
     this.tailSegments[ 0 ] = [ startX, startY ] ;
     
     this.onDeath = onDeath ;
     
     return this ;
    } ;

    
Snake.prototype.up = function()
    {
     if( this.direction[ 1 ] != -1 ) this.direction = [ 0, 1 ] ;
    } ;


Snake.prototype.down = function()
    {
     if( this.direction[ 1 ] != 1 ) this.direction = [ 0, -1 ] ;
    } ;
    
    
Snake.prototype.right = function()
    {
     if( this.direction[ 0 ] != -1 ) this.direction = [ 1, 0 ] ;
    } ;
    

Snake.prototype.left = function()
    {
     if( this.direction[ 0 ] != 1 ) this.direction = [ -1, 0 ] ;
    } ;

Snake.prototype.destroy = function( headIsOnObstacle )
    {

     for( var i in this.tailSegments )
        if( i != this.headIndex || ( !headIsOnObstacle )  ) 
            this.game.remove( this.tailSegments[ i ] ) ;
    
    
     var j = this.game.playerSet.indexOf( this ) ;
     
     this.game.playerSet.splice( j, 1 ) ;
    // this.init( this.color, 1, this.game, 1, 1 ) ;
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
         this.requiredGrowth-- ;
        } 
     else 
        this.game.remove( tail ) ;


     
     var newHead = [ ( this.game.map.width + oldHead[ 0 ] + this.direction[ 0 ] ) % this.game.map.width, ( this.game.map.height + oldHead[ 1 ] + this.direction[ 1 ] ) % this.game.map.height ] ;
     this.tailSegments[ this.headIndex ] = newHead ;
     
     var outcome = this.game.add( newHead, -1, this.color )
     if( outcome == -1 ) 
        {
         this.destroy( true ) ;
         this.onDeath() ;
        }
     else
        this.requiredGrowth += outcome ;
    } ;
    

Snake.prototype.nextSegmentIndex = function( segmentIndex )
    {     
     return ( segmentIndex + 1 ) % this.tailSegments.length ;
    } ;
    
return Snake ;
} ) ;
