// LOOK AT COMPONENT
    function LookAtComponent()
    {
        this.ease = .1;
    }
    var p = createjs.extend( LookAtComponent, Component );

// SPIN COMPONENT
    function SpinComponent()
    {
        this.ease = .1;
    }
    var p = createjs.extend( SpinComponent, Component );
    p.OnAdd = function()
    {
        this.targetRotation = this.targetRotation || this.parent.rotation;

    }
    p.OnUpdate = function( event )
    {
        this.parent.rotation = createjs.Math.lerp( this.parent.rotation, this.targetRotation, this.ease );
    }

// OSCILLATE SCALE COMPONENT
    function OscillateScaleComponent()
    {
        this.frequency = 20;
        this.amplitude = new createjs.Point(1, 1);
  
        this.randomOffset = false;
        this.offset = 0;
        this.stop = false;
  
        this.lastOffset = new createjs.Point(0,0);
    }
    var p = createjs.extend( OscillateScaleComponent, Component );
    p.OnAdd = function()
    {
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
    function OscillateComponent()
    {
        this.counter = 0;
        this.increment = .1;
        this.amplitude = 50;
    }
    var p = createjs.extend( OscillateComponent, Component );
    p.OnAdd = function()
    {
        this.originX = this.originX || this.parent.x;
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