var stage;
var container;

function keyPressed( event )
{
	//Keycodes found at http://keycode.info
	if( event.keyCode == 32 )
		console.log("Space Bar Pressed");

	if(event.keyCode == 13 )
		console.log("Enter Key Pressed");
}

function setup()
{
    // Enable Touch
    createjs.Touch.enable(stage);

    // Update
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener( "tick", tick );
    createjs.Ticker.setFPS( 30 );

    // Container
    container = new createjs.Container();
	container.x = container.y = 0;

	// Stage
	stage = new createjs.Stage( "canvas" );
    stage.enableMouseOver();
    stage.mouseMoveOutside = true;
    stage.addChild(container);
	stage.update();	

	// Resize
    resize();
	window.addEventListener( 'resize', resize, false );
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