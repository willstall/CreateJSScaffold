var profile;

function main()
{
	// Setup
	setup();

	// Keyboard
	document.onkeydown = keyPressed;
	
	// Tinder
	profile = new Profile();
	profile.on("pressup", OnPressUp, this );
	profile.on("pressmove", OnPressMove, this );
	profile.on("mousedown", OnMouseDown, this );
		
	container.addChild( profile );
}

function OnMouseDown( event )
{
 console.log("down");
// console.log( event );
 var offset = profile.globalToLocal( event.stageX, event.stageY );
 this.offset = offset;
// console.log( offset );
}

function OnPressUp( event )
{
 console.log("up");
 console.log( event );
}

function OnPressMove( event )
{
 console.log("moving");
 var position = profile.globalToLocal( event.stageX, event.stageY );
 
 profile.x += position.x - this.offset.x;
 profile.y += position.y - this.offset.y;
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
