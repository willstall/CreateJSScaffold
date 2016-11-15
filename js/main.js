function main()
{	
	// Setup
	setup();
	
	// Keyboard Test
	document.onkeydown = keyPressed;

	// Display Test
	var testing = new createjs.Shape();
		//testing.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
		testing.graphics.beginFill("DeepSkyBlue").rect(0,0,50,50);

	container.addChild(testing);  

	// Extension Test
  	var extend_test = new ExtendedContainer();
		extend_test.output();
}
	
function keyPressed( event )
{
	//Keycodes found at http://keycode.info
	if( event.keyCode == 32 )
	{
		console.log("testing");
	}
}