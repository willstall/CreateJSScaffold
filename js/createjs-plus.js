createjs.DisplayObject.prototype.componentsUpdating = false;
createjs.DisplayObject.prototype.SetComponentsUpdate = function( state )
{
		console.log(this);
		console.log("testing components update");
		
  	if((state == true) && (this.componentsUpdate == false))
  	{
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
	console.log(this + "Added");
}
Component.prototype.OnRemove = function()
{
	console.log(this + "Removed");
}
Component.prototype.OnEarlyUpdate = function()
{
	console.log(this + "Early Update");
}
Component.prototype.OnUpdate = function()
{
	console.log(this + "Update");
}
Component.prototype.OnLateUpdate = function()
{
	console.log(this + "Late Update");
}