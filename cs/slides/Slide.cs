using DG.Tweening;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class Slide : GameBehaviour {

	public static Slide currentSelectedSlide;

	public SlideLayout layout;
	public SlideType type;
	public bool isLocked;

	public Color backgroundColor = Color.black;

	public Action<Slide> SlideEnter;
	public Action<Slide> SlideExit;


	[HideInInspector]
	public bool isVisibleInEditor = true;

	[HideInInspector]
	public bool isVisibleInGame = true;

	// Use this for initialization

	[Range(-1,1)]
	public float t;

	bool hasEnteredScreen = false;

	void Start ()
	{
		
	}
	
	// Update is called once per frame
	void Update () 
	{
		
		var toCamera = Camera.main.transform.position - transform.position; 
		var magnitude = Vector3.Dot( toCamera, layout.layoutAxis );

		var size = GetCameraSize();
		var max = Mathf.Abs( Vector3.Dot( size, layout.layoutAxis ) );

		t =  magnitude / max;

		var vp = Camera.main.WorldToViewportPoint( transform.position );

		if( IsOnScreen() && !hasEnteredScreen )
		{
			if( SlideEnter != null )
				SlideEnter( this );

			BroadcastMessage("OnSlideEnter", this, SendMessageOptions.DontRequireReceiver);
			hasEnteredScreen = true;

		} else if( !IsOnScreen() && hasEnteredScreen ) {

			if( SlideExit != null )
				SlideExit( this );

			BroadcastMessage("OnSlideExit", this, SendMessageOptions.DontRequireReceiver);
			hasEnteredScreen = false;
			
		}

		BroadcastMessage("OnTransition", t, SendMessageOptions.DontRequireReceiver);
	}

	public void SetSlideType( SlideType type )
	{
		this.type = type;
	}

	public void OnSlideEnter()
	{
		Camera.main.DOColor( backgroundColor, 1 );
	}





	[ContextMenu("Preview Slide")]
	public void Preview()
	{
		Camera.main.transform.parent.position = GetBounds().center;
		Camera.main.backgroundColor = backgroundColor;

		currentSelectedSlide = this;
	}

		

	public Rect GetBounds()
	{
		var size = GetCameraSize();
		return new Rect( transform.position - size/2, size );
	}



	void OnDrawGizmos()
	{
		

		var size = GetCameraSize();

		var ortho = Camera.main.orthographic;

		var nearCorners = GetFrustumCorners( GetCameraDepth( ortho ? 1 : 0 ) );
		var midCorners = GetFrustumCorners( GetCameraDepth( ortho ? 1 : 0.5f ) );
		var farCorners = GetFrustumCorners( GetCameraDepth( ortho ? 1 : 1 ) );


		if( ortho )
		{
			for( int i = 0; i < 4; i++ )
			{
				midCorners[i].z = GetCameraDepth(0.5f);
				nearCorners[i].z = GetCameraDepth(0);
			}
		}

		for( int i = 0; i < 4; i++ )
		{

			nearCorners[i].z -= GetCameraDepth(0.5f);
			midCorners[i].z -= GetCameraDepth(0.5f);
			farCorners[i].z -= GetCameraDepth(0.5f);
		}

		var widthVector = midCorners[2] - midCorners[1];
		var heightVector = midCorners[1] - midCorners[0];

		var aspectRatio = heightVector.magnitude / widthVector.magnitude;
		var targetMagnitude = heightVector.magnitude / 4 * 3;
		var targetMagnitudeVector = (widthVector.normalized * targetMagnitude)/2;

		var topCenter = Vector3.Lerp( midCorners[1], midCorners[2], 0.5f );
		var bottomCenter = Vector3.Lerp( midCorners[0], midCorners[3], 0.5f );
		

		Vector3[] safeZoneCorners = new Vector3[4];

		safeZoneCorners[0] = bottomCenter - targetMagnitudeVector;
		safeZoneCorners[1] = topCenter - targetMagnitudeVector;
		safeZoneCorners[2] = topCenter + targetMagnitudeVector;
		safeZoneCorners[3] = bottomCenter + targetMagnitudeVector;

		Gizmos.matrix = transform.localToWorldMatrix;
		//Gizmos.DrawWireCube( new Vector3(0,0,size.z/2), size );

		bool drawFrustum = !Camera.current.orthographic;

		for( int i = 0; i < 4; i++ )
		{
			if( drawFrustum )
			{
				Gizmos.color = new Color(1, 0, 0, 0.2f);
				Gizmos.DrawLine( nearCorners[i], farCorners[i] );
				Gizmos.DrawLine( nearCorners[i], nearCorners[(i + 1) % 4] );
				Gizmos.DrawLine( farCorners[i], farCorners[(i + 1) % 4] );
			}
			
			
			Gizmos.color = new Color(1, 0.3f, 0, 1);
			Gizmos.DrawLine( midCorners[i], midCorners[(i + 1) % 4] );


			
			Gizmos.color = new Color(1, 0, 0, 1);
			Gizmos.DrawLine( safeZoneCorners[i], safeZoneCorners[(i + 1) % 4] );
		}
		

	}
}

public enum SlideType
{
	Normal,
	Focus,
	Start,
	Automatic,
	Manual
}
