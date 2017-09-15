using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using System;

public class MousePlaneInput2D : MonoBehaviour
{

	/*


		Colliders will recieve SendMessage
			InputSelect
			InputDeselect

		Actions are fired during each event
			InputTap - when a tap anywhere is recieved
			InputSelect - when an item is tapped
			InputDeselect
			InputSlide 

		Both Messages and Actions include a data object of MousePlaneData

		MousePlaneData
			Vector3 position
			Collider collider
			Vector3 delta
	
		
	*/

	[Header("Properties")]
	public Vector3 inputAxis = Vector3.up;
	public LayerMask layerMask = -1;
	
	public float pressDistanceTolerance = 0.3f;
	public EventSystem eventSystem;

	[Header("Options")]
	public bool isRelativeToCamera = true;
	public bool selectOnDown = false;	
	public bool toggleSelectOnTap = false;
	public bool ignoreUIElements = false;
	

	public Action<MousePlaneData2D> OnTapAction;
	public Action<MousePlaneData2D> OnSlideAction;
	public Action<MousePlaneData2D> OnSlideStartAction;
	public Action<MousePlaneData2D> OnSlideEndAction;
	public Action<MousePlaneData2D> OnSelectAction;
	public Action<MousePlaneData2D> OnDeselectAction;


	Vector3 lastPressPosition;
	Vector3 lastSlidePosition;
	MousePlaneData2D lastMouseData;

	bool isSliding;
	bool isSelected;

	void Start ()
	{
		
	}

	Vector3 GetMousePlanePosition()
	{
		Plane plane = new Plane( inputAxis, 0.0f );
		
		if( isRelativeToCamera )
			plane.distance = (Camera.main.transform.forward * Camera.main.farClipPlane).magnitude;
		

		
		Vector3 mousePlanePosition = Vector3.zero;

		Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		float rayDistance;
		if (plane.Raycast(ray, out rayDistance))
			mousePlanePosition = ray.GetPoint(rayDistance);

		return mousePlanePosition;
	}

	Collider2D CheckForCollider( )
	{
		return CheckForCollider( this.layerMask );
	}

	Collider2D CheckForCollider( LayerMask layerMask )
	{
		Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		var hit = Physics2D.GetRayIntersection( ray, Mathf.Infinity, layerMask );

		return hit.collider;
	}

	void ExecuteSelect(Vector3 position, Collider2D collider)
	{
		isSelected = true;

		MousePlaneData2D data = new MousePlaneData2D( position , collider, Vector3.zero );
		if(OnSelectAction != null)
			OnSelectAction( data );	
		
		collider.gameObject.SendMessage("InputSelect", data , SendMessageOptions.DontRequireReceiver);

		lastMouseData = data;
	}

	void ExecuteDeselect(Vector3 position, Collider2D collider)
	{
		isSelected = false;
		
		MousePlaneData2D data = new MousePlaneData2D( position , collider, Vector3.zero );
		if(OnDeselectAction != null)
			OnDeselectAction( data );	
		
		if(lastMouseData.collider != null)
			lastMouseData.collider.gameObject.SendMessage("InputDeselect", data, SendMessageOptions.DontRequireReceiver);

		lastMouseData = data;
	}
	
	void ExecuteSlide(Vector3 position, Vector3 delta )
	{
		MousePlaneData2D data = new MousePlaneData2D( position , null, delta );

		if(OnSlideAction != null)
			OnSlideAction( data );	
	}

	void ExecuteSlideStart(Vector3 position, Vector3 delta )
	{
		MousePlaneData2D data = new MousePlaneData2D( position , null, delta );

		if(OnSlideStartAction != null)
			OnSlideStartAction( data );	
	}


	void ExecuteSlideEnd(Vector3 position, Vector3 delta )
	{
		MousePlaneData2D data = new MousePlaneData2D( position , null, delta );

		if(OnSlideEndAction != null)
			OnSlideEndAction( data );	
	}

	void Update ()
	{
		Vector3 mousePosition = Input.mousePosition;//GetMousePlanePosition();

		if(!ignoreUIElements && eventSystem != null && eventSystem.IsPointerOverGameObject())
			return;


		if( Input.GetMouseButtonDown(0))
		{	
			Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			var hit = Physics2D.GetRayIntersection( ray, Mathf.Infinity, layerMask );

			Debug.Log( hit.collider );


			if(isSelected == true)
			{
				Collider2D collider = CheckForCollider();					
				if(toggleSelectOnTap == true)
				{
					if(collider == lastMouseData.collider)
					{
						ExecuteDeselect(mousePosition , lastMouseData.collider);
					}
					// Debug.Log("DeSelect");
				}else{
					if(collider != lastMouseData.collider)
					{
						ExecuteDeselect(mousePosition , lastMouseData.collider);
						// Debug.Log("DeSelect")
					}					
				}
			}
		
			if(selectOnDown == true)
			{
				Collider2D collider = CheckForCollider();
				if(collider != null)
				{	
					ExecuteSelect( mousePosition, collider);
					// Debug.Log("Select");
				}
			}

			isSliding = false;	
			lastPressPosition = mousePosition;
		}
		
		if( isSelected == false)
		{
			if( Input.GetMouseButtonUp(0))
			{
				if(isSliding == false)
				{
					Collider2D collider = CheckForCollider();
					if(collider == null)
					{
						MousePlaneData2D data = new MousePlaneData2D( mousePosition , null, Vector3.zero );
						if(OnTapAction != null)
							OnTapAction( data );

						lastMouseData = data;
						// Debug.Log("Tap");
					}else{						
						ExecuteSelect( mousePosition, collider);
						// Debug.Log("Select");
					}
				}else{
					Vector3 difference = lastSlidePosition - mousePosition;

					ExecuteSlide( mousePosition, difference );
					ExecuteSlideEnd( mousePosition, difference );
					// Debug.Log("Slide: "+ distance);
				}
			}else if(Input.GetMouseButton(0))
			{
				if(isSliding == true)
				{
					Vector3 difference = lastSlidePosition - mousePosition;
					lastSlidePosition = mousePosition;

					ExecuteSlide( mousePosition, difference );
					
					// Debug.Log("Slide: "+ distance);
				}else{
					float distance = Vector3.Distance( mousePosition, lastPressPosition );
					distance = Mathf.Abs( distance );

					if(distance >= pressDistanceTolerance)
					{
						Vector3 difference = lastPressPosition - mousePosition;

						isSliding = true;
						lastSlidePosition = mousePosition;
						
						ExecuteSlideStart( mousePosition, difference );
						ExecuteSlide( mousePosition, difference );
						// Debug.Log("Slide Started: " + distance);
					}
				}
			}
		}

	}
}

public class MousePlaneData2D
{
	public Vector3 position;
	public Collider2D collider;
	public Vector3 delta;

	public MousePlaneData2D( Vector3 position, Collider2D collider, Vector3 delta )
	{
		this.position = position;
		this.collider = collider;
		this.delta = delta;
	}
}