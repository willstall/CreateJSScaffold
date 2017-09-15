//OSCILLATE SCALE
/*
using UnityEngine;
using System.Collections;

public class OscillateScale : MonoBehaviour
{

    public float frequency = 2;
    public Vector3 amplitude = Vector3.one;
    public bool randomOffset;


    float offset;

    Vector3 lastOffset;

    void Start()
    {
        offset = 0.0f;
        if(randomOffset)
            offset = Random.Range(0,10000);
    }

    void Update ()
    {
        var thisOffset = Mathf.Sin( (Time.time + offset) * frequency ) * amplitude;
        transform.localScale += thisOffset - lastOffset;
        lastOffset = thisOffset;
    }
}
*/

function OscillateScale(){}
    var p = createjs.extend( OscillateScale, Component );

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
