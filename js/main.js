function main()
{	
	// Setup
	setup();
	
	// Keyboard Test
	document.onkeydown = keyPressed;

	// Component Test
	var testComponent = new OscillateScaleComponent();	
	// Display Test
	var testing = new createjs.Shape();
		 testing.graphics.beginFill("DeepSkyBlue").rect(0,0,50,50);
		 testing.AddComponent( testComponent );
		 testing.SetComponentsUpdate( true );		 
		//testing.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
		//testing.on("tick", update);

	// Extension Test
  	var extend_test = new ExtendedContainer();
		 extend_test.output();
	
	container.addChild(testing);  
}
	
function keyPressed( event )
{
	//Keycodes found at http://keycode.info
	if( event.keyCode == 32 )
	{
		console.log("testing");
	}
}

function update( event )
{
	console.log("update");
}