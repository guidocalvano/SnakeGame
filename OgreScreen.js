
define( [], function()
{

function OgreScreen() {} ;

OgreScreen.prototype.init = function( tileWidth, columnCount, rowCount ) 
    {
    // var paper = Raphael(0, 0, tileWidth * columnCount, tileWidth * rowCount ) ; 
     
     this.tileTable = [] ;
     
     this.camNode = ( new ogre.SceneNode() ).init() ;

     this.camNode.setParent( ogre.root ) ;
     
     this.camNode.moveL3N( 0, 0, 300 ) ;
     this.camNode.yaw( 3.14 ) ;

     ogre.camera.setParent( this.camNode ) ;

     var spacing = .5 * tileWidth ;
     var offsetX  = -.5 * spacing * columnCount ;
     var offsetY  = -.5 * spacing * rowCount ;
          
     for( var x = 0 ; x < columnCount ; x++ )
        {
         this.tileTable[ x ] = [] ;
         for( var y = 0 ; y < rowCount ; y++ )
            {
             var sn = ( new ogre.SceneNode() ).init() ;
             var en = ( new ogre.Entity() ).init( 'sphere.mesh' ) ;
             
             var mat = ( new ogre.Material() ).init() ;
             
             en.setParent( sn ) ;
             sn.setParent( ogre.root ) ;
             en.setMaterial( mat ) ;
             
             
             sn.moveL3N( offsetX + spacing * x, offsetY + spacing * y, 0 ) ;

            /*    
             mat.setSelfIllumination( 1, 1, 1 ) ;
             mat.setDiffuse( 1, 1, 1 ) ;
             mat.setAmbient( 1, 1, 1 ) ;             
            */
              
             this.tileTable[ x ][ y ] = mat ;
             
             this.setColor( x, y, [ 0, 0, 0 ] ) ;
            } 
        } 
        
     return this ;
    } ;

OgreScreen.prototype.setColor = function( x, y, color )
    {
     var mat = this.tileTable[ x ][ y ] ;

     mat.setSelfIllumination( color[ 0 ], color[ 1 ], color[ 2 ] ) ;
     mat.setDiffuse( color[ 0 ], color[ 1 ], color[ 2 ] ) ;
     mat.setAmbient( color[ 0 ], color[ 1 ], color[ 2 ] ) ;
    } ;

return OgreScreen ;
} ) ;