var stage;
var container;
var canvas;

function setup()
{
    // Canvas
    canvas = document.getElementById("canvas");

    // Update
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener( "tick", tick );
    createjs.Ticker.setFPS( 30 );

    // Container
    container = new createjs.Container();
    container.x = container.y = 0;

    // Stage
    stage = new createjs.Stage( canvas );
    stage.enableMouseOver();
    stage.mouseMoveOutside = true;
    stage.addChild(container);
    stage.update(); 

    // Enable Touch
    createjs.Touch.enable(stage);

    // Resize
    resize();
    window.addEventListener( 'resize', resize, false );

    // Retina
    retinalize();
}

function tick( event )
{
    center();
    stage.update();    
}

function resize()
{
    stage.clear();
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    // 300 x 620 
}

function center()
{
    if(!container)
        return;

    container.x = window.innerWidth * 0.5;
    container.y = window.innerHeight * 0.5;
}

function retinalize()
{
    let originalCanvasWidth = this.canvas.width;
    let originalCanvasHeight = this.canvas.height;
    let ratio = window.devicePixelRatio;

    if (ratio === undefined)
        return;

    let height = this.canvas.getAttribute('height');
    let width = this.canvas.getAttribute('width');

    this.canvas.setAttribute('width', Math.round( width * ratio ) );
    this.canvas.setAttribute('height', Math.round( height * ratio ) );

    // Set CSS
    this.canvas.style.width = width+"px";
    this.canvas.style.height = height+"px";
    this.stage.scaleX = this.stage.scaleY = ratio;
    
    // save original width & height into stage
    this.stage.width = originalCanvasWidth;
    this.stage.height = originalCanvasHeight;
}