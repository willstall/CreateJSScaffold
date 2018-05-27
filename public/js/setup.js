var stage;
var container;
var canvas;
//var debug;

function setup()
{
    // Canvas
    canvas = document.getElementById("canvas");

    // Update
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener( "tick", tick );
    createjs.Ticker.framerate = 30;

    // Container
    container = new createjs.Container();
    container.x = container.y = 0;

    // Debug
   // debug = new createjs.Text();
    //debug.log( "Debug" );

    // Stage
    stage = new createjs.Stage( canvas );
    stage.enableMouseOver( 20 );  //default 20 per second, max 50
    stage.mouseMoveOutside = true;
    stage.addChild(container);//, debug);
    stage.update(); 

    // Enable Touch
    createjs.Touch.enable(stage);

    // Resize
    resize();
    window.addEventListener( 'resize', resize, false );

   // Rescale Container for Height
    //rescale();
    //window.addEventListener( 'resize', rescale, false );

    // Lock Orientation
    orient();
    window.addEventListener('deviceorientation', orient, this);     
}

function tick( event )
{
    // Center
    if(!container)
    return;

    container.x = window.innerWidth * 0.5;
    container.y = window.innerHeight * 0.5;

    // Update Stage
    stage.update();    
}

function resize()
{
    // Resize
    stage.clear();
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;   
    
    // Retinalize
    var originalCanvasWidth = this.canvas.width;
    var originalCanvasHeight = this.canvas.height;
    var pixelRatio = window.devicePixelRatio;
    
    if (pixelRatio === undefined)
    return;
    
    var height = this.canvas.getAttribute('height');
    var width = this.canvas.getAttribute('width');
    
    this.canvas.setAttribute('width', Math.round( width * pixelRatio ) );
    this.canvas.setAttribute('height', Math.round( height * pixelRatio ) );
    
    // Set CSS
    this.canvas.style.width = width+"px";
    this.canvas.style.height = height+"px";
    
    this.stage.scaleX = this.stage.scaleY = pixelRatio;
    
    // save original width & height into stage
    this.stage.width = originalCanvasWidth;
    this.stage.height = originalCanvasHeight;
}

function orient( event )
{
    var divId = "content";

    if (window.orientation == -90) {
        document.getElementById( divId ).className = 'orientright';
    }
    if (window.orientation == 90) {
        document.getElementById( divId ).className = 'orientleft';
    }
    if (window.orientation == 0) {
        document.getElementById( divId ).className = '';
    }
}

function rescale()
{
    // Resize Container for iOS
    var orientationRatio =  this.canvas.height / this.canvas.width;
    orientationRatio = Math.min(1, this.canvas.height/600);
    
    container.scaleX = container.scaleY = orientationRatio;    
}