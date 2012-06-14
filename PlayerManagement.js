define( [], function()
{
function PlayerManagement() {} ;

PlayerManagement.prototype.init = function( sockets, snakeGame )
    {
     var self = this ;
    
     this.sockets = sockets ;
    
     this.snakeGame = snakeGame ;
    
     this.playerQueue = [] ;
     this.MAX_PLAYER_COUNT = 1 ;
    
     this.sockets.on( 'connection', function( socket )
        {
        
         socket.emit( 'ready', '' ) ;
      
         console.log( 'CREATE SNAKE' ) ;
         
         self.enqueuePlayer( socket ) ;
        
         if( self.snakeGame.playerSet.length <= self.MAX_PLAYER_COUNT )
            self.introducePlayer() ;
        
        
        } ) ;
    
     return this ;
    } ;


PlayerManagement.prototype.enqueuePlayer = function( socket )
    {
     var self = this ;
    
     this.playerQueue.push( socket ) ;

     socket.emit( 'queuePosition', this.playerQueue.length - 1 ) ;

     socket.removeAllListeners( 'disconnect' ) ;
     socket.on( 'disconnect', function()
        {
         var i = self.playerQueue.indexOf( socket ) ;
             
         self.playerQueue.splice( i, 1 ) ; 
         
         self.introducePlayer() ;      
        } ) ;
        
     
    } ;

        

PlayerManagement.prototype.introducePlayer = function()
    {
     var self = this ;
     
     if( this.playerQueue.length < 1 ||
         self.snakeGame.playerSet.length > self.MAX_PLAYER_COUNT 
        ) return ;
     
     var socket = this.playerQueue[ 0 ] ;
     
     this.playerQueue.splice( 0, 1 ) ;
     
         
    
     var snake = this.snakeGame.addPlayer( function()
        {
        
         socket.emit( 'gameOver', '' ) ;
         
         self.enqueuePlayer( socket ) ;
        
         self.introducePlayer() ;
            
        } ) ;
    
     socket.removeAllListeners( 'disconnect' ) ;
     socket.on( 'disconnect', function()
        {
         snake.destroy( false ) ;
         self.introducePlayer() ;
        } ) ;
     
    
     socket.on( 'snakeCommand', function( data )
        {
         switch( data )
            {
             case "up"      :            snake.up()    ; break ;
             case "down"    :            snake.down()  ; break ;
             case "left"    :            snake.left()  ; break ;
             case "right"   :            snake.right() ; break ;
            } ;
            
        } ) ;
        
        socket.emit( 'snakeCreated', '' ) ; 
        
        for( var i in this.playerQueue )
            {
             this.playerQueue[ i ].emit( 'queuePosition', i ) ;
            } 
            
    
    } ;
    
 return PlayerManagement ;
} ) ;