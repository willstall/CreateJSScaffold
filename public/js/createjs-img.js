(function() {
    function Img( resultId = '', scalar = 1 )
    {
    	this.Container_constructor();
      this.resultId = resultId;
      this.scalar = 1;
      
      this.init();
    }

    var p = createjs.extend( Img, createjs.Container );
        p.init = function()
        {
          if(!loader)
            return;

          var bmp = new createjs.Bitmap( loader.getResult( this.resultId ) );
          var b = bmp.getBounds();

              bmp.y = b.height * this.scalar * -0.5 ;
              bmp.x = b.width * this.scalar * -0.5 ;
              bmp.scaleX = bmp.scaleY = this.scalar;

          this.imgBounds = b;
          this.addChild( bmp );
        };

    createjs.Img = createjs.promote( Img, "Container" );
}());