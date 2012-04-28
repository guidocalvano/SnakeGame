

define( [ './Map', './Snake', './OgreScreen' ], function( Map, Snake, OgreScreen )
{
function SnakeGame() {} ;

SnakeGame.prototype.init = function( width, height, playerCount ) 
    {
     this.screen = ( new OgreScreen() ).init( 20, width, height ) ;
    
     this.map = ( new Map() ).init( width, height ) ;
    
     this.playerSet = [] ;

     for( var i = 0 ; i < playerCount ; i++ )
        this.playerSet[ i ] = ( new Snake() ).init( 
        
            [ Math.random(), Math.random(), Math.random() ], 5, this,
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
         self.add( [ Math.floor( Math.random() * self.map.width ), Math.floor( Math.random() * self.map.height ) ], 1, [ 1, 1, 1 ] ) ;
        }, 3000 ) ;    
    } ;


SnakeGame.prototype.addPlayer = function( onDeath )
    {
     var player = ( new Snake() ).init(  [ Math.random(), Math.random(), Math.random() ], 5, this,
             Math.floor( Math.random() * this.map.width ), Math.floor( Math.random() * this.map.height ), onDeath ) ;

     this.playerSet.push( player ) ;
     
     return player ;
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
     this.screen.setColor( segment[ 0 ], segment[ 1 ], [ 0, 0, 0 ] ) ;
    
    } ;

return SnakeGame ;

} ) ;
