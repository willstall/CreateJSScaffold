var storyboard = new Storyboard();;
var boards = [ Storyboards.PRELOAD, Storyboards.MAIN ];
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
	document.onkeydown = keyPressed;
  
  // Boards
  var board_1 = new createjs.StoryboardContainer();
      board_1.onBoardAdded = function()
      {
        
          var btn = new createjs.Button("meow", config.styles.button, config.sizes.button);
              // btn.y = stage.height * -.25;
              btn.onPress = () => alert('love yah ;)');
        
          this.addChild( btn );
      }
  var board_2 = new createjs.StoryboardContainer();
      board_2.onBoardAdded = function()
      {
          var img = new createjs.Img( 'logo', 2.0 );
            // img.AddComponent( new OscillateScaleComponent(20, new createjs.Point(1,1) ) );
            // img.SetComponentsUpdate( true );

          var throwableContainer = new createjs.ThrowableContainer();
              throwableContainer.addChild( img );
              throwableContainer.y = stage.height * .25;
        
        this.addChild( throwableContainer );
      }
  var board_3 = new createjs.StoryboardContainer();
      board_3.onBoardAdded = function()
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
  // Storyboard
  var mainStoryBoard = new MainStoryboard();

  // storyboard.add( Storyboards.MAIN, mainStoryBoard );
  storyboard.add( Storyboards.MAIN, board_1 );
  storyboard.add( Storyboards.MAIN, board_2 );
  storyboard.add( Storyboards.PRELOAD, board_3 );
  
  storyboard.init( boards[boardIndex] );
  
  container.addChild( mainStoryBoard, board_1, board_2, board_3 );
}

function changeBoard()
{
  boardIndex = boardIndex >= boards.length-1 ? boardIndex = 0 : boardIndex = boardIndex + 1;
  var b = boards[boardIndex];
  console.log("new board: " + b);
  storyboard.change( b );
}

function keyPressed( event )
{
	//Keycodes found at http://keycode.info
	if( event.keyCode == 32 )    // enter key
	{
		console.log("Changing Board");
    changeBoard();
	}
}