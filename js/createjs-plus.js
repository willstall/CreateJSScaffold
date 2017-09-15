createjs.DisplayObject.prototype.componentsUpdating = false;

createjs.DisplayObject.prototype.SetComponentsUpdate = function( state )
{		
  	if((state == true) && (this.componentsUpdating == false))
  	{
		this.on("tick", this.Update,this);
  	}else{
  		this.off("tick", this.Update,this); 
  	}
  	this.componentsUpdating = state;
}

createjs.DisplayObject.prototype.AddComponent = function( component )
{

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
	var index = createjs.indexOf( this.components, component ); // will return -1 if not found
	
	if(index != -1)
	{
		this.components.splice(index, 1 );
		this.component.OnRemove();
		return true;
	}
	return false;
}

createjs.DisplayObject.prototype.Update = function( event )
{
	if(this.components == null)	
		return;
		
	for( var i = 0; i < this.components.length; i++)
	{
		var component = this.components[i];
		
		//component.OnEarlyUpdate();
		component.OnUpdate( event );
		//component.OnLateUpdate();
	}
}