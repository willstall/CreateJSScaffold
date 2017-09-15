using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class MouseActions : MonoBehaviour {


	public Action<GameObject> MouseDown;
	public Action<GameObject> MouseUp;
	public Action<GameObject> MouseOver;
	public Action<GameObject> MouseOut;

	void OnMouseDown()
	{
		if( MouseDown != null )
			MouseDown( this.gameObject );
	}
	void OnMouseUp()
	{
		if( MouseUp != null )
			MouseUp( this.gameObject );
	}
	void OnMouseOver()
	{
		if( MouseOver != null )
			MouseOver( this.gameObject );
	}
	void OnMouseOut()
	{
		if( MouseOut != null )
			MouseOut( this.gameObject );
	}
}
