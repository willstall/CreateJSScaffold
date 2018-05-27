(function() {
    function Profile()
    {
    	this.Container_constructor();
       this.init();
    }

    var p = createjs.extend( Profile, createjs.Container );
        p.init = function()
        {
          //Background
            var ratio = 16 / 9;
            var height = 200;
            var corner = 10;
            var bg = new createjs.Shape();
                bg.graphics.beginFill("#EEEEEE").drawRoundRect(height * -0.5, ratio * height * -0.5, height,ratio * height, corner);
                this.addChild(bg);
        };

    window.Profile = createjs.promote( Profile, "Container" );
} () );