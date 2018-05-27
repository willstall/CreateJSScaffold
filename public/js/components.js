// private var ball:Ball;
// private var spring:Number = 0.1;
// private var vx:Number = 0;
// private var vy:Number = 0;
// private var friction:Number = 0.95;
// private var springLength:Number = 100;

// public function OffsetSpring()
// {
//     init();
// }

// private function init():void
// {
//     ball = new Ball(20);
//     addChild(ball);
//     addEventListener(Event.ENTER_FRAME, onEnterFrame);
// }


// private function onEnterFrame(event:Event):void
// {
//     var dx:Number = ball.x - mouseX;
//     var dy:Number = ball.y - mouseY;
//     var angle:Number = Math.atan2(dy, dx);
//     var targetX:Number = mouseX + Math.cos(angle) * springLength;
//     var targetY:Number = mouseY + Math.sin(angle) * springLength;
//     vx += (targetX - ball.x) * spring;
//     vy += (targetY - ball.y) * spring;
//     vx *= friction;
//     vy *= friction;
//     ball.x += vx;
//     ball.y += vy;
//     graphics.clear();
//     graphics.lineStyle(1);
//     graphics.moveTo(ball.x, ball.y);
//     graphics.lineTo(mouseX, mouseY);

// SPRING COMPONENT
    // function SpringComponent()
    // {

    //     this.velocity = new createjs.Point();
    // }
    // var p = createjs.extend( SpringComponent, Component );
    // p.OnUpdate = function( event )
    // {
    //     if( this.target == null)
    //         return;

    //    var pos = this.parent.GetPosition();
    //    var targetPos = this.target.GetPosition();

    //     var d = 

    // }
    
// THROW COMPONENT
  function ThrowComponent()
  {
    this.velocity = new createjs.Point(0,0);
  }
  var p = createjs.extend( ThrowComponent, Component );
  p.OnUpdate = function( event )
  {
  
  }


// OFFSET SPRING COMPONENT
    function SpringComponent()
    {
        this.distance = 1;
        this.friction = 0.95;
        this.spring = .1;
        this.velocity = new createjs.Point();
    }
    var p = createjs.extend( SpringComponent, Component );
    p.OnUpdate = function( event )
    {
        if( this.target == null)
            return;

        var pos = this.parent.GetPosition();
        var targetPos = this.target.GetPosition();
        var angle = targetPos.degreesTo( pos );
        var targetX = pos.x - Math.cos(angle) * this.distance;
        var targetY = pos.y - Math.sin(angle) * this.distance;
        this.velocity.x += (targetX - targetPos.x) * this.spring;
        this.velocity.y += (targetY - targetPos.y) * this.spring;
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.parent.x += this.velocity.x;
        this.parent.y += this.velocity.y;
    }

// FADE COMPONENT
  function FadeComponent(ease = 0.9, autoDestroy = false)
  {
    this.ease = ease;
    this.autoDestroy = autoDestroy;
  }
  var p = createjs.extend( FadeComponent, Component );
  p.OnUpdate = function( event )
  {
    if(this.parent.alpha < 0 )
    {
      this.parent.alpha = 0;
      if(this.autoDestroy == false)
        return;      
        
      this.SetComponentsUpdate( false );
      this.parent.parent.removeChild( this.parent);
     }else{   
      this.parent.alpha *= this.ease;
    }
  }

// LOOK AT COMPONENT
    function LookAtComponent( ease = 0.1)
    {
        this.ease = ease;
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

// ROTATE COMPONENT
    function RotateComponent( increment = 2 )
    {
        this.increment = increment;
    }
    var p = createjs.extend( RotateComponent, Component );
    p.OnUpdate = function( event )
    {
        this.parent.rotation += this.increment
    }

// SPIN COMPONENT
    function SpinComponent( ease = 0.1 , targetRotation )
    {
        this.ease = ease;
        if( targetRotation )
          this.targetRotation = targetRotation;
    }
    p.OnAdd = function()
    {
        this.targetRotation = this.targetRotation || this.parent.rotation;
    }    
    var p = createjs.extend( SpinComponent, Component );
    p.OnUpdate = function( event )
    {
        this.parent.rotation = createjs.Math.lerp( this.parent.rotation, this.targetRotation, this.ease );
    }

// OSCILLATE SCALE COMPONENT
    function OscillateScaleComponent( frequency = 20, amplitude = new createjs.Point(1, 1) )
    {
        this.frequency = frequency;
        this.amplitude = amplitude;
  
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
    function OscillatePositionComponent( counter = 0, increment = 0.1)
    {
        this.counter = counter;
        this.increment = increment;
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

// TRANSLATE COMPONENT
  function TranslateComponent()
  {
    this.velocity = new createjs.Point(0,2);
  }
  var p = createjs.extend( TranslateComponent, Component );
  p.OnUpdate = function( event )
  {
    this.parent.x += this.velocity.x;
    this.parent.y += this.velocity.y;
  }
  
// VELOCITY COMPONENT
  function VelocityComponent()
  {
    this.velocity = new createjs.Point(0,0);
    this.friction = 0.9;
  }
  var p = createjs.extend( VelocityComponent, Component );
  p.OnUpdate = function( event )
  {
    this.velocity = this.velocity.scale( this.friction );
    this.parent.x += this.velocity.x;
    this.parent.y += this.velocity.y;
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