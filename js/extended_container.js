(function() {
    function ExtendedContainer()
    {
    	this.Container_constructor();
        
    }

    var p = createjs.extend( ExtendedContainer, createjs.Container );
	    p.output = function()
	    {
	    	console.log("Console Output Test.");
	    };

    window.ExtendedContainer = createjs.promote( ExtendedContainer, "Container" );
} () );