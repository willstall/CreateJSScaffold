/*
  Throwable Container
*/
(function() {
    function ThrowableContainer( friction = 0.9, speed = 1 )
    {
        this.Container_constructor();
        
        this.friction = friction;
        this.speed = speed;
        this.trackingRatio = 0.25;  // used to calculate velocity over time
        this.velocityComponent = new VelocityComponent(0,0, this.friction);
        
        this.AddComponent( this.velocityComponent );
                    
        this.on("added", this.t_added, this);
        this.on("removed", this.t_removed, this);
    }

    var p = createjs.extend( ThrowableContainer, createjs.Container );

        p.t_added = function( event )
        {
            this.SetComponentsUpdate( true );  

            this.on("pressmove", this.t_onPressMove, this );
            this.on("mousedown", this.t_onMouseDown, this );
            this.on("pressup", this.t_onPressUp, this );
            this.on("tick", this.t_onUpdate, this );

            this.off("added", this.t_added, this);         
        };
        p.t_removed = function( event )
        {
            this.SetComponentsUpdate( false );

            this.off("pressmove", this.t_onPressMove, this );
            this.off("mousedown", this.t_onMouseDown, this );
            this.off("pressup", this.t_onPressUp, this );
            this.off("tick", this.t_onUpdate, this );

            this.off("removed", this.t_removed, this);  
        };
        p.t_onPressMove = function( event )
        {
            // console.log("press move");
            var offsetPosition = this.globalToLocal( event.stageX, event.stageY );
            
            this.x += offsetPosition.x - this.offset.x;
            this.y += offsetPosition.y - this.offset.y;            
        };
        p.t_onMouseDown = function( event )
        {
            // console.log("mouse down");
            this.offset = this.globalToLocal( event.stageX, event.stageY );
            this.delta = new createjs.Point(0,0);
            this.lastPosition = new createjs.Point( event.stageX, event.stageY );
            this.isThrowing = true;            
        };
        p.t_onPressUp = function( event )
        {
            // console.log("press up "+ this.delta);
            this.isThrowing = false;
            this.velocityComponent.velocity = this.delta.scale( this.speed );            
        };
        p.t_onUpdate = function( event )
        {
            // console.log("update");
            if( this.isThrowing == true)
            {
                var position = new createjs.Point( stage.mouseX, stage.mouseY );
                var delta = position.subtract( this.lastPosition );
                
                this.delta = this.delta.interpolate( delta, this.trackingRatio );
                this.lastPosition = position;
            }            
        };

    createjs.ThrowableContainer = createjs.promote( ThrowableContainer, "Container" );
} () );

/*
  Img Loading Container
*/
(function() {
    function Img( resultId = '', scalar = 1 )
    {
    	this.Container_constructor();
      this.resultId = resultId;
      this.scalar = scalar;
      
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

/*
  Button Container
*/
(function() {
    function Button(title = "button", style={backgroundColor:"#222222",foregroundColor:"#FFFFFF",font:"20px Gloria Hallelujah"}, size = {x:200,y:60,r:10, p: 10})
    {
        this.Container_constructor();

        this.title = title;
        this.style= style;
        this.size = size;
      
        this.isPressable = true;

        this.alphaFadeTime = 70;
        this.alphaFadeTo = .7;
        this.alpha = this.alphaFadeTo;

        this.on("added", this.t_added, this);
        this.on("removed", this.t_removed, this);
      
        this.drawButton();
    }

    var p = createjs.extend( Button, createjs.Container );

        p.drawButton = function ()
        {
            this.backgroundColor = (this.style.backgroundColor)?(this.style.backgroundColor):("#222222");
            this.foregroundColor = (this.style.foregroundColor)?(this.style.foregroundColor):("#FFFFFF");
            this.font = (this.style.font)?(this.style.font):"40px Arial";

            this.label = new createjs.Text( this.text, this.font, this.foregroundColor );
            this.label.textAlign = "center";
            this.label.textBaseline = "middle";
            this.label.text = this.title;

            var labelBounds = this.label.getBounds();
            var labelWidth = labelBounds.width+this.size.p * 2;
            var w = (this.size.x > labelWidth) ? (this.size.x) : (labelWidth);
            
          console.log( w );
            this.background = new createjs.Shape();
            this.background.graphics.f( this.backgroundColor  ).rr(w * -.5, this.size.y * -.5, w,this.size.y,this.size.r).ef();
            this.background.setBounds( new createjs.Rectangle(w * -.5, this.size.y * -.5, w,this.size.y));
          
            this.name ="[Button]:  "+ this.title;

            this.addChild( this.background, this.label );
        }

        p.t_added = function( event )
        {
            this.on("mouseover", this.b_onMouseOver);
            this.on("mouseout", this.b_onMouseOut);
            this.on("click", this.b_onClick);

           // this.on("pressup", this.b_onPressUp, this );
            //stage.on("stagepressup", this.b_onPressUp, this);

            // this.off("added", this.t_added, this);
        };
        p.t_removed = function( event )
        {
            this.off("mouseover", this.b_onMouseOver );
            this.off("mouseout", this.b_onMouseOut);
            this.off("click", this.b_onClick);

           // this.off("pressup", this.b_onPressUp, this );
            //stage.off("stagepressup", this.b_onPressUp, this);

            this.off("removed", this.t_removed, this);
        };

        p.b_onMouseOver = function ( event )
        {
            if(this.isPressable)
                createjs.Tween.get( this ).to( { alpha: 1 }, this.alphaFadeTime );
        };

        p.b_onMouseOut = function ( event )
        {
            createjs.Tween.get( this ).to( { alpha: this.alphaFadeTo }, this.alphaFadeTime );
        };

        p.b_onClick = function( event )
        {
            if(this.isPressable)
                this.onPress( event );
        };

        p.onPress = function( event )
        {
            console.log("pressed: "+this.name);
        }

    createjs.Button = createjs.promote( Button, "Container" );
} () );
