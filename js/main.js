function main()
{
	// Setup
	setup();

	// Keyboard
	document.onkeydown = keyPressed;
	
	// Tinder
	var profile = new Profile();
		profile.on("pressup", OnPressUp, this );
		profile.on("pressmove", OnPressMove, this );
		profile.on("mousedown", OnMouseDown, this );
		
	container.addChild( profile );


}

function OnMouseDown( event )
{
 console.log("down");
}

function OnPressUp( event )
{
 console.log("up");
}

function OnPressMove( event )
{
 console.log("moving");
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
