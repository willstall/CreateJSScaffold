var b = document.getElementById("t_toggle");
var l = document.getElementById("t_log");
var t = document.getElementById("t_value");
    t.oninput = function(e)
    {
        var v = t.value;
        var check = v[v.length-1];
            
        if(check == '`')
        {
            v = v.substr(0,v.length-1);
            t.value = v;
        }
    }

var btn = document.getElementById("t_input");
    btn.onsubmit = function(e)
    {
        e.preventDefault();
        console.log(t.value);
        try {
            eval(t.value);
        }
        catch(err) {
            console.warn(err);
            return;
        }				
        t.value = "";				
    }

var h = document.getElementById("header");

var showTerminal = function()
{			
    h.style.top = "0";
}
var toggleTerminal = function()
{			
    h.style.top = (h.style.top != "-30%")?("-30%"):("0");
}
var terminalKey = function(e)
{			
    if( e.keyCode == 192 )
    {
        toggleTerminal();
    }
}		
window.addEventListener("keydown",this.terminalKey.bind(this));

var takeOverErrors = function()
{
    window.addEventListener("error", handleError, true, this);
    
    function handleError(evt)
    {
        showTerminal();
        console.log("error");
        if (evt.message) { // Chrome sometimes provides this
            l.innerText += "\n" + "error: "+evt.message +" at linenumber: "+evt.lineno+" of file: "+evt.filename;
            //scope.updateTerminal("error: "+evt.message +" at linenumber: "+evt.lineno+" of file: "+evt.filename);
        } else {
            l.innerText += "\n" + "error: "+evt.type+" from element: "+(evt.srcElement || evt.target);
            //scope.updateTerminal("error: "+evt.type+" from element: "+(evt.srcElement || evt.target));
        }
    }  
}

var autoOpenOnLog = false;

var takeOverConsole = function()
{
    var console = window.console;
    var scope = this;
    if (!console) return;
    function intercept(method){
        var original = console[method];
        console[method] = function(){
            // do sneaky stuff
            var message = Array.prototype.slice.apply(arguments).join(' ');
            
            if(autoOpenOnLog)
                showTerminal();
              
            //scope.updateTerminal( message );
            
            l.innerText += "\n"+message;
            l.scrollTop = l.scrollHeight;

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

var headerClicked = function(e)
{
    toggleTerminal();
}
b.addEventListener("click", this.headerClicked.bind(this));


takeOverErrors();
takeOverConsole();
toggleTerminal();