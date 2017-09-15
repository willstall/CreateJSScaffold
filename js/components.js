// LOOK AT COMPONENT
    function LookAtComponent()
    {
        this.ease = .1;
    }
    var p = createjs.extend( LookAtComponent, Component );
    p.OnAdd = function()
    {
        this.target = this.target || null;
    }
    p.OnUpdate = function( event )
    {
        if(this.target == null)
            return;

        var degrees = this.parent.DegreesToTarget( this.target );
        this.parent.rotation = createjs.Math.lerp( this.parent.rotation, degrees, this.ease );
    }

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
    function OscillatePositionComponent()
    {
        this.counter = 0;
        this.increment = .1;
        this.amplitude = new createjs.Point(0, 10);        
    }
    var p = createjs.extend( OscillatePositionComponent, Component );
    p.OnAdd = function()
    {
        this.origin = this.origin || this.parent.GetPosition();
    }
    p.OnUpdate = function( event )
    {       
        this.parent.x = this.origin.x + Math.sin( this.counter ) * this.amplitude.x;
        this.parent.y = this.origin.y + Math.cos( this.counter ) * this.amplitude.y;
        this.counter += this.increment;     
    }

// BASE COMPONENT ARCHITECTURE
    function Component()
    {
        this.deltaTime = 0;     // is set on every update
        this.parent = null;     // is assigned when OnAdd is called
    }
    Component.prototype.OnAdd = function(){}
    Component.prototype.OnRemove = function(){}
    Component.prototype.OnUpdate = function( event ){}
    //Component.prototype.OnEarlyUpdate = function(){}
    //Component.prototype.OnLateUpdate = function(){}