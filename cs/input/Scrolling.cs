using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Scrolling : MonoBehaviour
{
	[Header("Input")]
	public MousePlaneInput2D mouseInput;

 	[Header("Movement Ranges")]
 	public Vector2 yBounds = new Vector2(-20.0f,0.0f);	 //Imporant. SMALL NUMBER ON THE LEFT	
	public Vector2 xBounds = new Vector2(0,0);

	[Header("Limits")]
	public bool limitY = false;
	public bool limitX = true;

	[Header("Settings")]
	public float movementMultiplier = 1.0f;
	[Range(0.0f,1.0f)]
	public float dragFriction = 0.03f;
	[Range(0.0f,1.0f)]
	public float boundsDrag = 0.2f;	// Should be greater than dragFriction
	public bool autoAdjustBoundsOnStart = true;

	[ReadOnly]
	public Vector2 targetPosition = new Vector2();

	void Awake()
	{
		if(mouseInput == null)
			mouseInput = gameObject.GetComponent<MousePlaneInput2D>() as MousePlaneInput2D;	
	}

	void Start ()
	{
		targetPosition = (Vector2)transform.position;

		if( autoAdjustBoundsOnStart )
			AutoAdjustBounds();
	}

	void AutoAdjustBounds()
	{
		if( yBounds.x > targetPosition.y)
		{
			yBounds.x = targetPosition.y;
		}
		
		if(yBounds.y < targetPosition.y)
		{
			yBounds.y = targetPosition.y;
		}

		if( xBounds.x > targetPosition.x)
		{
			xBounds.x = targetPosition.x;
		}
		
		if(xBounds.y < targetPosition.x)
		{
			xBounds.y = targetPosition.x;
		}
	}

	void OnEnable()
	{
        mouseInput.OnSlideStartAction += OnSlideStartAction;
        mouseInput.OnSlideAction += OnSlideAction;
        mouseInput.OnSlideEndAction += OnSlideEndAction;
    }

	void OnDisable()
	{
        mouseInput.OnSlideStartAction -= OnSlideStartAction;
        mouseInput.OnSlideAction -= OnSlideAction;
        mouseInput.OnSlideEndAction -= OnSlideEndAction;
    }

	void OnSlideStartAction(MousePlaneData2D data)
	{
		targetPosition.y += data.delta.y * movementMultiplier;
		targetPosition.x += data.delta.x * movementMultiplier;

		
	}


	MousePlaneData2D slideData;
	Vector3 maxDelta;
	Vector3 avgDelta;

	void OnSlideAction(MousePlaneData2D data)
	{
		slideData = data;
		if( data.delta.magnitude > maxDelta.magnitude )
			maxDelta = data.delta;

		if( data.delta.magnitude > 0 )
		{
			avgDelta -= 0.1f * avgDelta;
			avgDelta += 0.1f * data.delta;
		}
			

		targetPosition.y += data.delta.y * movementMultiplier;
		targetPosition.x += data.delta.x * movementMultiplier;
	}

	void OnSlideEndAction(MousePlaneData2D data)
	{
		//targetPosition.y += data.delta.y * movementMultiplier;
		//targetPosition.x += data.delta.x * movementMultiplier;		
	}

	void Update ()
	{
		Vector3 finalPosition = transform.position;

		float factor = Application.targetFrameRate * Time.deltaTime;

		

		// Vector2 velocity = (targetPosition - (Vector2)transform.position) * dragFriction * factor;

		// finalPosition = Vector3.Lerp( transform.position, targetPosition, dragFriction * factor );

		if(limitY == false)
			finalPosition.y = Mathf.Lerp( transform.position.y, targetPosition.y, dragFriction * factor );

		if(limitX == false)
			finalPosition.x = Mathf.Lerp( transform.position.x, targetPosition.x, dragFriction * factor );

		// Clamp Y
		if(( targetPosition.y < yBounds.x ) || ( targetPosition.y > yBounds.y))
		{
			float yClamp = Mathf.Clamp( targetPosition.y, yBounds.x, yBounds.y );
			targetPosition.y = Mathf.Lerp( targetPosition.y, yClamp, boundsDrag * factor );
		}

		// Clamp X
		if(( targetPosition.x < xBounds.x ) || ( targetPosition.x > xBounds.y))
		{
			float xClamp = Mathf.Clamp( targetPosition.x, xBounds.x, xBounds.y );
			targetPosition.x = Mathf.Lerp( targetPosition.x, xClamp, boundsDrag * factor );
		}


		transform.position = finalPosition;

	}


	// void OnGUI()
	// {
	// 	if( slideData == null )
	// 		return;


	// 	GUI.skin.label.normal.background = Texture2D.blackTexture;
	// 	GUI.skin.label.fontSize = 50;
	// 	GUI.skin.label.normal.textColor = Color.black;
			
		
	// 	GUILayout.Label( "data " + slideData.delta , GUI.skin.label );
	// 	GUILayout.Label( "max " + maxDelta , GUI.skin.label );
	// 	GUILayout.Label( "avg " + avgDelta , GUI.skin.label );
		
	// }


	void OnDrawGizmos()
	{
		
		Gizmos.color = Color.yellow;
		Gizmos.DrawLine( new Vector3( xBounds.x, yBounds.x, 0 ), new Vector3( xBounds.y, yBounds.x, 0 ) );
		Gizmos.DrawLine( new Vector3( xBounds.y, yBounds.x, 0 ), new Vector3( xBounds.y, yBounds.y, 0 ) );
		Gizmos.DrawLine( new Vector3( xBounds.y, yBounds.y, 0 ), new Vector3( xBounds.x, yBounds.y, 0 ) );
		Gizmos.DrawLine( new Vector3( xBounds.x, yBounds.y, 0 ), new Vector3( xBounds.x, yBounds.x, 0 ) );
	}

}