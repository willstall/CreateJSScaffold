using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SimpleMover : MonoBehaviour 
{
	public Vector3 direction = Vector3.right;
	public float magnitude = 1;
	public bool useLocal = false;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () 
	{
	
		if( useLocal )
			transform.position += transform.TransformDirection(direction) * magnitude * Time.deltaTime;	
		else
			transform.position += direction * magnitude * Time.deltaTime;	
	}

}
