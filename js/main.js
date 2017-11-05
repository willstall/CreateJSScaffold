function main()
{
	// Setup
	setup();

	// Keyboard
	document.onkeydown = keyPressed;
	
	// Tinder
	var profile = new Profile();
		
		
	container.addChild( profile );




/*
	// Components
//	var spinComponent = new SpinComponent();
//		spinComponent.targetRotation = 3600;
//		spinComponent.ease = 0.01;

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

	// Extension
  	var extend_test = new ExtendedContainer();
		extend_test.output();

	container.addChild(test1,test2,test3);
	container.AddComponent( rotateComponent );
	container.SetComponentsUpdate( true );
	
	*/
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
