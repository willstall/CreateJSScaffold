using DG.Tweening;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SlideBackground : MonoBehaviour
{
	
	
	public Color backgroundColor = Color.white;
	
	void Start ()
	{
		
	}


	[ContextMenu("Change Background on Camera")]
	public void UpdateCamera()
	{
		Camera.main.backgroundColor = backgroundColor;
	}
	
	public void OnSlideEnter()
	{
		Camera.main.DOColor( backgroundColor, 1 );
	}
}