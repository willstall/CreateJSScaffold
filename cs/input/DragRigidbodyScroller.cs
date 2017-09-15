using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DragRigidbodyScroller : GameBehaviour {

	public Vector2 deadZone = new Vector2( 1, 0.4f );
	public float scrollSpeed = 5f;

	// Use this for initialization
	void Awake () {
		enabled = true;
	}
	
	// Update is called once per frame
	void LateUpdate () 
	{
		var viewport = (Vector2)Camera.main.ScreenToViewportPoint( Input.mousePosition );
		var scrolling = FindObjectOfType<Scrolling>();
		var center = new Vector2( 0.5f, 0.5f );
		var check = deadZone / 2;
		var current = viewport - center;

		if( Mathf.Abs(current.x) < check.x && Mathf.Abs(current.y) < check.y )
			return;

		var viableAxis = Vector2.one - deadZone;
			viableAxis.x = viableAxis.x > 0 ? 1 : 0;
			viableAxis.y = viableAxis.y > 0 ? 1 : 0;

		var vector = (Vector2)Vector3.Project( (viewport - center), viableAxis );

		var min = vector.normalized;
			min.Scale( 0.5f * deadZone );
		var max = vector.normalized * 0.5f;	

		

		var t = (vector - min).magnitude / (max-min).magnitude;

		// Debug.Log( max +" - " + min +" = " + (max-min) + " / " + (vector-min) + " : " + t );

		var speed = Mathf.Lerp( 0.5f * scrollSpeed, scrollSpeed, t);


		var data = new MousePlaneData2D(Vector3.zero, null, vector.normalized * speed  );

		// Debug.Log( speed );
		scrolling.SendMessage( "OnSlideAction", data );
	}

	void OnDrawGizmos()
	{
		Gizmos.color = Color.black;
		

		var center = Camera.main.ViewportToWorldPoint( new Vector3( 0.5f, 0.5f, 1.67f ) );
		var zero = Camera.main.ViewportToWorldPoint( new Vector3( 0, 0, 0 ) );
		var max = Camera.main.ViewportToWorldPoint( new Vector3( deadZone.x, deadZone.y, 0 ) );

		Gizmos.DrawWireCube( center, max - zero );
	}

	void OnRigidbodyDragStart()
	{
		enabled = true;
	}

	void OnRigidbodyDragStop()
	{
		enabled = false;
	}

	// void OnGUI()
	// {
	// 	var viewport = (Vector2)Camera.main.WorldToViewportPoint( transform.position );
	// 	var scrolling = FindObjectOfType<Scrolling>();
	// 	var center = new Vector2( 0.5f, 0.5f );
	// 	var check = deadZone / 2;
	// 	var current = viewport - center;

	// 	if( Mathf.Abs(current.x) < check.x && Mathf.Abs(current.y) < check.y )
	// 		GUI.color = Color.black;
	// 	else
	// 		GUI.color = Color.white;

		
	// 	GUILayout.Label( check.ToString() );
	// 	GUILayout.Label( current.ToString() );
	// }
}
