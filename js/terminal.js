(function() {
    function Terminal( startDown = false, h = 200 )
    {
        this.Container_constructor();
        
        this.height = h;
        this.isDown = startDown;
        this.lineHeight = 13;
        this.y = - h;

        if(startDown)
            this.open();

        this.background = new createjs.Shape();
		this.background.graphics.beginFill("#222222").drawRect(0,0,stage.width,this.height);
		this.background.alpha = 0.9;

	    this.txt = new createjs.Text();
		this.txt.x = 20;
		this.txt.y = this.height - 20;
		this.txt.color ="#FFFFFF";
		this.txt.text = "testing";
        this.txt.textBaseline = "bottom";
        this.txt.lineHeight = this.lineHeight;

        this.addChild( this.background,this.txt );

        this.takeOverErrors();
        this.takeOverConsole();
        
        window.addEventListener("keydown",this.keyPressed.bind(this));

        //document.onkeydown = onkeydown.bind(this);;
    }

    var p = createjs.extend( Terminal, createjs.Container );
        p.keyPressed = function( e )
        {
            //Keycodes found at http://keycode.info
            if( e.keyCode == 192 )
            {
                this.toggle();
            }
        }
        p.toggle = function()
        {
            var yTo = (this.isDown) ? (-this.height) : (0);
        
            createjs.Tween.get(this, {override: true}).to(
                {y: yTo}, 300, createjs.Ease.bounceOut);
    
            this.isDown = (this.isDown) ? (false) : (true);
        }
        p.open = function()
        {
            this.isDown = false;
            this.toggle();
        }
        p.updateTerminal = function( s )
        {
            this.txt.text = this.txt.text + "\n" +s;
            this.txt.y -= this.lineHeight;
        }
        p.break = function()
        {
            this.updateTerminal("");
        }
        p.takeOverConsole = function()
        {
            var console = window.console;
            var scope = this;
            if (!console) return;
            function intercept(method){
                var original = console[method];
                console[method] = function(){
                    // do sneaky stuff
                    var message = Array.prototype.slice.apply(arguments).join(' ');
                    
                    scope.updateTerminal( message );
                    if (original.apply){
                        // Do this for normal browsers
                        original.apply(console, arguments);
                    }else{
                        // Do this for IE
                        var message = Array.prototype.slice.apply(arguments).join(' ');
                        original(message);
                    }
                }
            }
            var methods = ['log', 'warn', 'error'];
            for (var i = 0; i < methods.length; i++)
                intercept(methods[i]);
        }
        p.takeOverErrors = function()
        {
            window.addEventListener("error", handleError, true, this);
            var scope = this;

            function handleError(evt)
            {
                scope.open();
                if (evt.message) { // Chrome sometimes provides this
                    scope.updateTerminal("error: "+evt.message +" at linenumber: "+evt.lineno+" of file: "+evt.filename);
                } else {
                    scope.updateTerminal("error: "+evt.type+" from element: "+(evt.srcElement || evt.target));
                }
            }  
        }

    window.Terminal = createjs.promote( Terminal, "Container" );
} () );