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

p.OnUpdate = function()
{
	this.parent.x = this.originX + Math.sin( this.counter ) * this.amplitude;
	this.counter += this.increment;
}

// BASE COMPONENT ARCHITECTURE
function Component(){}
Component.prototype.OnAdd = function(){}
Component.prototype.OnRemove = function(){}
Component.prototype.OnEarlyUpdate = function(){}
Component.prototype.OnUpdate = function(){}
Component.prototype.OnLateUpdate = function(){}

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