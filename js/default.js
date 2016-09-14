// VARIABLES
var stage;
var container;

// FUNCTIONS
function main()
{	
	// Setup
	setup();

	// Game
	container = new createjs.Container();
	container.x = container.y = 0;

	document.onkeydown = keyPressed;

    stage.addChild(container);
    center();
    stage.update();

	var testing = new createjs.Shape();
		//testing.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
		testing.graphics.beginFill("DeepSkyBlue").rect(0,0,50,50);
		testing.x = window.innerWidth * 0.5;
		testing.y = window.innerHeight * 0.5;
	stage.addChild(testing);    
}
	
function keyPressed( event )
{
	//Keycodes found at http://keycode.info
	if( event.keyCode == 32 )
	{
		console.log("testing");
	}
}

function setup()
{
	// Stage
	stage = new createjs.Stage( "canvas" );
    stage.enableMouseOver();
    stage.mouseMoveOutside = true;
	stage.update();	

    // Resize
    resize();
	window.addEventListener( 'resize', resize, false );

    // Enable Touch
    createjs.Touch.enable(stage);

    // Update
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener( "tick", tick );
    createjs.Ticker.setFPS( 30 );
}

function tick( event )
{
	center();
    stage.update();    
}

function resize()
{
    stage.clear();
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
}

function center()
{
	if(!container)
		return;

	container.x = window.innerWidth * 0.5;
	container.y = window.innerHeight * 0.5;
}