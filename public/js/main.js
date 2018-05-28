var storyboard = new Storyboard();;
var boards = [ Storyboards.PRELOAD, Storyboards.MAIN, Storyboards.GAME ];
var boardIndex = 0;

function main()
{
  // Setup Stage
  setup();
  
  // Initialize Sugar
  Sugar.extend();
  
  // Load Assets
	loader = new createjs.LoadQueue( false, config.assetPath, true );
	loader.on( "complete", bootstrap, this );
	loader.on( "error", ( error ) => console.error( error ) );
  
  if(config.assets.length > 0)
	  loader.loadManifest( config.assets );
  else
    bootstrap();
}

function bootstrap()
{

	// Keyboard
  var kDown = new Rx.Observable.fromEvent(document, 'keydown');
      kDown.subscribe( keyPressed );
  
  // Boards
  var board_1 = new createjs.StoryboardContainer();
      board_1.onBoardAdded = function()
      {
          var img = new createjs.Img( 'logo', 2.0 );
          var throwableContainer = new createjs.ThrowableContainer();
              throwableContainer.addChild( img );
        
        this.addChild( throwableContainer );
      }
  var board_2 = new createjs.StoryboardContainer();
      board_2.onBoardAdded = function()
      {
          var positionComponent = new OscillatePositionComponent();
            positionComponent.amplitude.y = 50;

          var lookAtComponent = new LookAtComponent();
          var rotateComponent = new RotateComponent( .5 );
          //		rotateComponent.increment = 0.5

          // Display 
          var test1 = new createjs.Shape();
            test1.graphics.beginFill("DeepSkyBlue").rect(-25,-25,50,50);
            test1.rotation = 45;
            test1.x = 60;
            test1.AddComponent( new OscillateScaleComponent(20, new createjs.Point(1,0) ) );
            test1.AddComponent( new SpinComponent(0.01,3600) );
            test1.SetComponentsUpdate( true );

          var test2 = new createjs.Shape();
            test2.graphics.beginFill("Red").drawCircle(0, 0, 10);
            test2.AddComponent( positionComponent );
            test2.SetComponentsUpdate( true );

          var test3 = new createjs.Shape();
            test3.x = -60;
            test3.graphics.beginFill("Green").rect(-30, -25, 60,50);
            test3.AddComponent( lookAtComponent );
            test3.SetComponentsUpdate( true );

            lookAtComponent.target = test2;
            //test2.on("tick", update);

            this.addChild( test1,test2,test3 );
            this.AddComponent( rotateComponent );
            this.SetComponentsUpdate( true );
      }
  var board_3 = new createjs.StoryboardContainer();
      board_3.onBoardAdded = function()
      {
        
        var bmp = loader.getResult('logo');
        
        var mat = new createjs.Matrix2D()
          .translate( -25, -25 )
          .scale( 50 / bmp.width, 50 / bmp.height )
        
        var particles = new createjs.ParticleSystem( () => ({
          lifetime: Math.random() * 2 + 1,
          velocity: new createjs.Point.polar(1, Math.random() * 2 * Math.PI).scale( Math.random() * 1000 + 500 ).add( new createjs.Point(0,-Math.random()*2000)),
          angularVelocity: Math.random() * 720 - 360,
          drawing: graphics => graphics.beginBitmapFill(bmp, "no-repeat", mat).drawRect(-25,-25,50, 50).endFill(),
          caching: [ -25, -25, 50, 50 ]
          }));
        
        this.particles = particles;
        
        this.particles.addModifier(
          ParticleModifiers.sizeOverLifetime(5, 0, createjs.Ease.elasticOut),
          ParticleModifiers.turbulence(10),
          ParticleModifiers.damping(.1),
          ParticleModifiers.drift( new createjs.Point(0, 1), 1000 )
        );
        
        
        this.addChild( this.particles ); 
      }
      board_3.onBoardSetup = function()
      {
        this.particles.start();
        this.particles.spawn(100);
        
        this.visible = this.mouseEnabled = this.mouseChildren = true;
        
        console.log("hey");
        try{

          this.StoryboardContainer_onBoardSetup();
          console.log(this.__proto__.onBoardSetup);
          this.__proto__.onBoardSetup();
          // super.onBoardSetup();
        }catch(err)
        {
          console.log(err);
        }

        console.log("hey");        
      }
  // Storyboard
  storyboard.add( Storyboards.MAIN, board_1 );
  storyboard.add( Storyboards.PRELOAD, board_2 );
  storyboard.add( Storyboards.GAME, board_3 );
  
  storyboard.init( boards[boardIndex] );
  // Change Button
  var btn = new createjs.Button("meow", config.styles.button, config.sizes.button);
      btn.y = stage.height * .25;
      btn.onPress = () => changeBoard();

  container.addChild( btn, board_1, board_2, board_3 );
}

function changeBoard()
{
  boardIndex = boardIndex >= boards.length-1 ? boardIndex = 0 : boardIndex = boardIndex + 1;
  var b = boards[boardIndex];
  storyboard.change( b );
}

function keyPressed( event )
{
	//Keycodes found at http://keycode.info
	if( event.keyCode == 32 )    // space key
	{
    changeBoard();
	}
}