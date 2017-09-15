createjs.DisplayObject.prototype.componentsUpdating = false;
createjs.DisplayObject.prototype.SetComponentsUpdate = function( state )
{
		
	//console.log("testing components update");
	//console.log("this:" + this);
	//console.log("this value:" + this.componentsUpdating);
		
  	if((state == true) && (this.componentsUpdate == false))
  	{
  		console.log("tick added");
		this.on("tick", this.Update,this);
  	}else{
  		this.off("tick", this.Update,this); 
  	}
  	this.componentsUpdating = state;
}

createjs.DisplayObject.prototype.AddComponent = function( component )
{
	// add component
	if(this.components == null)
	{
		this.components = [];
	}
		
	this.components.push( component );
	component.parent = this;
	component.OnAdd();
}

createjs.DisplayObject.prototype.RemoveComponent = function( component )
{
	// remove component
	// createjs has an indexOf function that will return -1 if the index is not present
	var index = createjs.indexOf( this.components, component )
	
	if(index != -1)
	{
		this.components.splice(index, 1 );
		this.component.OnRemove();
		return true;
	}
	return false;
}

createjs.DisplayObject.prototype.Update = function()
{
	if(this.components == null)	
		return;
		
	for( var i = 0; i < this.components.length; i++)
	{
		var component = this.components[i];
		
		component.OnEarlyUpdate();
		component.OnUpdate();
		component.OnLateUpdate();
	}
}

function Component()
{
	parent = null;
}
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