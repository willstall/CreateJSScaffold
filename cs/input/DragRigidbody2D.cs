using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DragRigidbody2D : MonoBehaviour {


	public LayerMask layerMask;
	public bool inheritVelocity = true;

	Vector3 lastMousePos;
	Rigidbody2D currentRigidbody;
	Vector3 clickOffset;


	// Update is called once per frame
	void FixedUpdate ()
	{
		
		if( Input.GetMouseButtonDown(0) )
		{
			Ray ray = Camera.main.ScreenPointToRay( Input.mousePosition );
			var hit = Physics2D.GetRayIntersection( ray, Mathf.Infinity, layerMask );
			if( hit.rigidbody )
			{
				currentRigidbody = hit.rigidbody;
				lastMousePos = GetWorldMousePoint();
				clickOffset = lastMousePos - currentRigidbody.transform.position;

				//Debug.Log( clickOffset );

				currentRigidbody.SendMessage( "OnRigidbodyDragStart", null, SendMessageOptions.DontRequireReceiver );
			}
		}

		if( Input.GetMouseButton(0) )
		{
			if( !currentRigidbody )
				return;

			Vector3 thisMousePos = GetWorldMousePoint();
			Vector3 offset = thisMousePos - lastMousePos;

			if( inheritVelocity )
				currentRigidbody.velocity = Vector3.Lerp( currentRigidbody.velocity, offset / Time.deltaTime, 0.3f );
				
			currentRigidbody.MovePosition( thisMousePos - clickOffset );
			lastMousePos = thisMousePos;
		}


		if( Input.GetMouseButtonUp(0) )
		{
			DropAll();
		}

	}

	public void DropAll()
	{
		if( currentRigidbody )
			currentRigidbody.SendMessage( "OnRigidbodyDragStop", null, SendMessageOptions.DontRequireReceiver );
				
		currentRigidbody = null;
	}


	Vector3 GetWorldMousePoint( )
	{
		Plane plane = new Plane( Vector3.back, Vector3.zero );
		Ray ray = Camera.main.ScreenPointToRay( Input.mousePosition );

		float enter = 0;
		if( !plane.Raycast( ray, out enter ) )
			return Vector3.zero;

		return ray.GetPoint( enter );
	}

}


