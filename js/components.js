// ROTATION COMPONENT

/*

	// Rotation
	if(pin.targetRotation < 0 )
	{
		pin.targetRotation = 0; 
	}else{	
		var ease = .1;
		//var destination = pin.targetRotation - ( pin.targetRotation * accel );
		//pin.rotation += destination;
		//pin.targetRotation -= destination;
		
		pin.rotation = lerp( pin.rotation, pin.targetRotation, ease);

	}


    	audioPlaying = false;
	// console.log("press animal");
	var targetRotation = Math.atan2(event.target.y,event.target.x) * 180 / Math.PI;
		targetRotation = Math.round( targetRotation );

	if(targetRotation <= 0 )
	{
		targetRotation += 360;
	}

	var currentRotations = Math.floor( pin.targetRotation / 360 );
	var finalTargetRotation = currentRotations * 360 + targetRotation;

	if(finalTargetRotation <= pin.targetRotation)
		finalTargetRotation += 360;

    pin.targetRotation = finalTargetRotation + 720;
    

    // Plot on Circle 
    var x = radius * Math.cos(2 * Math.PI * i / itemCount);
    var y = radius * Math.sin(2 * Math.PI * i / itemCount);       
*/

// OSCILLATE SCALE COMPONENT - TEST
function OscillateScaleComponent(){}
    var p = createjs.extend( OscillateScaleComponent, Component );

    p.OnAdd = function()
    {
      this.frequency = 20;
      this.amplitude = new createjs.Point(1, 0.3);

      this.randomOffset = false;
      this.offset = 0;
      this.stop = false;

      this.lastOffset = new createjs.Point(0,0);

      if(this.randomOffset)
        this.offset = Math.random() * 10000;
    }

    p.OnUpdate = function( event )
    {
        var currentScale = Math.sin(  (event.timeStamp/1000 + this.offset) * this.frequency );
        var currentOffset = this.amplitude.scale( currentScale );

        this.parent.scaleX += this.lastOffset.x - currentOffset.x;
        this.parent.scaleY += this.lastOffset.y - currentOffset.y;

        this.lastOffset = currentOffset;

    }

// OSCILLATE COMPONENT - TEST
function OscillateComponent(){}

var p = createjs.extend( OscillateComponent, Component );

p.OnAdd = function()
{
	this.originX = this.parent.x;
	this.counter = 0;
	this.increment = .1;
	this.amplitude = 50;
}

p.OnUpdate = function( event )
{
	this.parent.x = this.originX + Math.sin( this.counter ) * this.amplitude;
	this.counter += this.increment;
}

// BASE COMPONENT ARCHITECTURE
function Component()
{
    this.deltaTime = 0;
    this.parent = null;
}

Component.prototype.OnAdd = function(){}
Component.prototype.OnRemove = function(){}
Component.prototype.OnUpdate = function( event ){}

//Component.prototype.OnEarlyUpdate = function(){}
//Component.prototype.OnLateUpdate = function(){}

/*

Component.prototype.OnAdd = function()
{
	console.log("This:" + this + "Added");
}
Component.prototype.OnRemove = function()
{
	console.log("This:" + this + "Removed");
}
Component.prototype.OnEarlyUpdate = function()
{
	console.log("This:" + this + "Early Update");
}
Component.prototype.OnUpdate = function()
{
	console.log("This:" + this + "Update");
}
Component.prototype.OnLateUpdate = function()
{
	console.log("This:" + this + "Late Update");
}

*/
