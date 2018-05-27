function main()
{
  // Setup Stage
  setup();
  
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
  
  // Storyboard
  var mainStoryBoard = new MainStoryboard();
  var storyboard = new Storyboard();
      storyboard.add( Storyboards.MAIN, mainStoryBoard );
      storyboard.init( Storyboards.MAIN );
  
  container.addChild( mainStoryBoard );
}

function keyPressed( event )
{
	//Keycodes found at http://keycode.info
	if( event.keyCode == 32 )
	{
		console.log("enter key hit");
	}
}

function update( event )
{
	console.log("update");
}
