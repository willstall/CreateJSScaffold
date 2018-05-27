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

/*
  Storyboard Container
*/
(function () {
  
    function StoryboardContainer()
    {
      this.Container_constructor();
      
      this.visible = this.mouseEnabled = this.mouseChildren = false;
    } 
  
    var p = createjs.extend(StoryboardContainer, createjs.Container);
        p.onBoardAdded = e => console.log(e);
        p.onBoardSetup = function(){
            this.visible = this.mouseEnabled = this.mouseChildren = true;
        };
        p.onBoardTeardown = function(){
            this.visible = this.mouseEnabled = this.mouseChildren = false;
        };
        p.onBoardRemoved = e => console.log(e);
        p.onBoardPause = e => console.log(e);
        p.onBoardResume = e => console.log(e);
  
    createjs.StoryboardContainer = createjs.promote(StoryboardContainer, "Container");;
}());  

/*
  Modal Container
*/
(function() {

    function UIModal( acceptLabel = "Accept",cancelLabel = "Cancel", titleLabel = "Title", descriptionLabel = "Description", style = config.styles.modal.default, acceptStyle = config.styles.button.defaultModal, cancelStyle = config.styles.button.whiteModal, size = config.modalSize )
    {
        this.Container_constructor();

        this.style = style;
        this.acceptStyle = acceptStyle;
        this.cancelStyle = cancelStyle;

        this.size = size;

        this.acceptLabel = acceptLabel;
        this.cancelLabel = cancelLabel;
        this.titleLabel = titleLabel;
        this.descriptionLabel = descriptionLabel;

        this.on("added", this.t_added, this);
        this.on("removed", this.t_removed, this);

        this.scaleX = this.scaleY = 0;

        this.autoHideTimeout = 0;

        this.init();
    }

    var p = createjs.extend( UIModal, createjs.Container );
        p.init = function()
        {
            var h = 0;
            var padding = this.size.p;

            /*
                Container
            */
            this.container = new createjs.Container();

            /*
                Labels
            */
            if( this.titleLabel )
            {
                this.title = new createjs.Text( this.titleLabel, this.style.fonts.title, this.style.titleColor );
                this.title.textAlign = "center";
                this.title.textBaseline = "top";

                this.container.addChild( this.title );

                var b = this.title.getBounds();
                h += b.height + padding * .5;
            }

            if( this.descriptionLabel )
            {
                this.description = new createjs.Text( this.descriptionLabel, this.style.fonts.description, this.style.descriptionColor );
                this.description.textAlign = "center";
                this.description.textBaseline = "top";
                this.description.y = h;

                this.container.addChild( this.description );

                var b = this.description.getBounds();
                h += b.height + padding*2;
            }

            /*
                Buttons
            */
            this.btns = new createjs.Container();

            if( this.acceptLabel )
            {
                this.acceptBtn = new UIButton( this.acceptLabel, this.acceptStyle, config.modalButtonSize );
                this.acceptBtn.onPress = () => {
                    this.hide( true );
                };
                this.btns.addChild( this.acceptBtn );

                if( this.cancelLabel )
                    this.acceptBtn.x += this.acceptBtn.size.x * .5 + padding;

                //var b = this.acceptBtn.getBounds();
                h += this.acceptBtn.size.y *.5 + padding;
            }

            if( this.cancelLabel )
            {
                this.cancelBtn = new UIButton( this.cancelLabel, this.cancelStyle, config.modalButtonSize );
                this.cancelBtn.onPress = () => {
                    this.hide( false );
                };
                this.btns.addChild( this.cancelBtn );

                if( this.acceptLabel )
                {
                    this.cancelBtn.x -= this.cancelBtn.size.x * .5 + padding;
                }else{
                    //var b = this.cancelBtn.getBounds();
                    h += this.cancelBtn.size.y *.5 + padding;
                }
            }

            this.btns.y = h;
            this.container.addChild( this.btns );

            /*
                Background
            */
           var rect = new createjs.Graphics.RoundRect( -this.size.x/2, -this.size.y/2, this.size.x, this.size.y, this.size.r , this.size.r , this.size.r , this.size.r );
           var background = new createjs.Shape();
               background.graphics.f( this.style.backgroundColor ).append( rect ).ef();
               background.shadow = new createjs.RetinaShadow( config.colors.shadows.modal, 0, 10, 0 );

           var outline = new createjs.Shape();
               outline.graphics.ss(3).ls( config.colors.gradients.gold, [0,1], 0, -this.size.y/2, 0, this.size.y/2 ).append( rect ).es();

            /*
                ScreenFill
            */
            //
            // this.lightbox = new createjs.Shape();
            //
            // this.lightbox.graphics
            //     .beginFill( this.style.fadeColor )
            //     .drawRectAnchored( () => -stage.width/2, () => -stage.height/2, () => stage.width, () => stage.height );

            // this.lightbox.on( "mousedown", (e) => e.stopPropagation() );


            /*
               Layer Containers
            */
            this.container.y = ( h + padding*2 ) * -.5;
            this.addChild( background, outline, this.container);

        };
        p.t_added = function( event )
        {

            this.show();
            this.off("added", this.t_added, this);
        };
        p.t_removed = function( event )
        {
            this.off("removed", this.t_removed, this);
        };
        p.autoHide = function( secondTillHide )
        {
            var s = new Rx.Observable.interval( secondTillHide ).take(1).subscribe( e => this.hide(false) );
        };
        p.hide = function( isAccepted = false)
        {
            if( !this.parent )
                return;

            // if( this.lightbox.parent )
            //     createjs.Tween.get( this.lightbox )
            //         .to({alpha:0}, 300)
            //      .call( () => this.lightbox.parent.removeChild( this.lightbox ) );

            // console.log("hide");
            createjs.Tween.get( this, {override:true} )
            .to( {
                scaleX: 0,
                scaleY: 0,
                // alpha: 0
            }, 300 , createjs.Ease.backIn)
            .call( () =>
            {
                this.onPress( isAccepted );
                this.parent.removeChild( this );
            });
        }
        p.shine = function()
        {
            if(this.acceptBtn)
            {
                this.acceptBtn.shine();
                return;
            }
            
            if(this.cancelBtn)
                this.cancelBtn.shine();
        }
        p.show = function()
        {
            // console.log("show");
            // ui.frame.addChild( this.lightbox );

            // this.lightbox.alpha = 0;
            // createjs.Tween.get( this.lightbox )
            //     .to({alpha:1}, 200);

            sounds.playSound('modal');

            this.scaleX = this.scaleY = 0;
            this.alpha = 1;

            createjs.Tween.get( this )
            .to( {
                scaleX: 1,
                scaleY: 1
            }, 500 , createjs.Ease.elasticOut)
            .call( () => this.shine() )
            .call(e => {if(this.autoHideTimeout > 0) this.autoHide( this.autoHideTimeout )});
        }
        p.onPress = function( isAccepted )
        {
            console.log("Modal was accepted: "+ isAccepted);
        }
    createjs.UIModal = createjs.promote(UIModal, "Container");
}());
