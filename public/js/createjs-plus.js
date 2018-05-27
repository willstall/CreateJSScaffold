// TEXT DEBUG EXTENSION
createjs.Text.prototype.log = function()
{
	var args = Array.prototype.slice.call(arguments, 0);
	var output = "";
	for( var i = 0; i < args.length; i++)
	{
		var value = args[i];
		output += JSON.stringify( value ) + "\n";
	}
	this.text = output;
}

// STAGE EXTENSIONS

// MOVEMENT EXTENSIONS
createjs.DisplayObject.prototype.GetPosition = function( )
{
    return new createjs.Point( this.x, this.y );
}
createjs.DisplayObject.prototype.DegreesToTarget = function( target )
{
    var degrees = this.GetPosition().degreesTo( target.GetPosition() );
    if( degrees < 0 )
        degrees += 360;

    return degrees;
}

// COMPONENT EXTENSION
createjs.DisplayObject.prototype.componentsUpdating = false;		// DO NOT SET THIS DIRECTION, USE SETCOMPONENTSUPDATE
createjs.DisplayObject.prototype.SetComponentsUpdate = function( state )
{
  	if((state == true) && (this.componentsUpdating == false))
  	{
		this.on("tick", this.Update,this);
  	}else{
  		this.off("tick", this.Update,this);
  	}
  	this.componentsUpdating = state;
}

createjs.DisplayObject.prototype.AddComponent = function( component )
{

	if(this.components == null)
	{
		this.components = [];
	}

	this.components.push( component );
	component.parent = this;
	component.OnAdd();
}

createjs.DisplayObject.prototype.GetComponent = function( type )
{

	if(this.components == null)
	{
		this.components = [];
	}

    var match = this.components.filter( component => component instanceof type );

    return match.length > 0 ? match[0] : null;
}

createjs.DisplayObject.prototype.RemoveComponent = function( component )
{
	var index = createjs.indexOf( this.components, component ); // will return -1 if not found

	if(index != -1)
	{
		this.components.splice(index, 1 );
		this.component.OnRemove();
		return true;
	}
	return false;
}
createjs.DisplayObject.prototype.Update = function( event )
{
	if(this.components == null)
		return;

    if( !this.timeStamp )
    {
        this.timeStamp = event.timeStamp;
        return;
    }


    this.deltaTime = (event.timeStamp - this.timeStamp) / 1000;
    this.timeStamp = event.timeStamp;

	for( var i = 0; i < this.components.length; i++)
	{
		var component = this.components[i];
            component.deltaTime = this.deltaTime;

		//component.OnEarlyUpdate();
		component.OnUpdate( event );
		//component.OnLateUpdate();
	}
}


// POINT EXTENSION
createjs.Point.prototype.add = function(v){
	return new createjs.Point(this.x + v.x, this.y + v.y);
};
createjs.Point.prototype.clone = function(){
	return new createjs.Point(this.x, this.y);
};
createjs.Point.prototype.degreesTo = function(v){
	var dx = this.x - v.x;
	var dy = this.y - v.y;
	var angle = Math.atan2(dy, dx); // radians
	return angle * (180 / Math.PI); // degrees
};
createjs.Point.prototype.distance = function(v){
	var x = this.x - v.x;
	var y = this.y - v.y;
	return Math.sqrt(x * x + y * y);
};
createjs.Point.prototype.equals = function(toCompare){
	return this.x == toCompare.x && this.y == toCompare.y;
};
createjs.Point.prototype.interpolate = function(v, f){
	return new createjs.Point( v.x + (this.x - v.x) * f, v.y + (this.y - v.y) * f );
};
createjs.Point.prototype.length = function(){
	return Math.sqrt(this.x * this.x + this.y * this.y);
};
createjs.Point.prototype.normalize = function(thickness){
	var l = this.length();
	this.x = this.x / l * thickness;
	this.y = this.y / l * thickness;
};
createjs.Point.prototype.orbit = function(origin, arcWidth, arcHeight, degrees){
	var radians = degrees * (Math.PI / 180);
	this.x = origin.x + arcWidth * Math.cos(radians);
	this.y = origin.y + arcHeight * Math.sin(radians);
};
createjs.Point.prototype.offset = function(dx, dy){
	this.x += dx;
	this.y += dy;
};
createjs.Point.prototype.normalized = function(){
	var l = this.length();
	return new createjs.Point(this.x / l, this.y / l);
};
createjs.Point.prototype.scale = function(s)
{
	return new createjs.Point( this.x * s, this.y * s );
}
createjs.Point.prototype.subtract = function(v){
	return new createjs.Point(this.x - v.x, this.y - v.y);
};
createjs.Point.prototype.toString = function(){
	return "(x=" + this.x + ", y=" + this.y + ")";
};
createjs.Point.interpolate = function(pt1, pt2, f){
	return pt1.interpolate(pt2, f);
};
createjs.Point.polar = function(len, angle){
	return new createjs.Point(len * Math.cos(angle), len * Math.sin(angle));
};
createjs.Point.distance = function(pt1, pt2){
	var x = pt1.x - pt2.x;
	var y = pt1.y - pt2.y;
	return Math.sqrt(x * x + y * y);
};
createjs.Point.randomOnUnitCircle = function(){
	return new createjs.Point( Math.random() * 2 - 1, Math.random() * 2 - 1)
};
createjs.Point.cross = function( pt1, pt2 )
{
	return pt1.x*pt2.y-pt1.y*pt2.x;
}
createjs.Point.dot = function( pt1, pt2 )
{
	return pt1.x*pt2.x + pt1.y*pt2.y;
}

// MATH EXTENSIONS
createjs.Math = {};
createjs.Math.lerp = function ( A, B, t )
{
    return  A + t * (B - A);
}
createjs.Math.clamp = function(val, min, max)
{
	return val < min ? min : (val > max ? max : val);
}
createjs.Math.randomRange = function(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}