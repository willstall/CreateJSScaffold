using UnityEngine;
using System.Collections;

[RequireComponent(typeof(Rigidbody2D))]
public class Motor2D : MonoBehaviour
{
	
	public Vector3 force;
	public ForceMode2D forceMode = ForceMode2D.Force;
	
	public bool isOneShot;

	public bool isLocal;

	new Rigidbody2D rigidbody;

	void Start()
	{
		rigidbody = GetComponent<Rigidbody2D>();
		
		Apply();
		if( isOneShot )
			enabled = false;
	}

	void FixedUpdate()
	{
		Apply();
	}

	void Apply()
	{
		rigidbody.AddForce( isLocal ? transform.TransformDirection(force): force, forceMode );
	}
}
