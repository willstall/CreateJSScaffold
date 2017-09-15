using UnityEngine;
using System.Collections;

[RequireComponent(typeof(Rigidbody2D))]
public class VelocityCap2D : MonoBehaviour
{
	public float maxSpeed;
	
	[Range(0,1)]
	public float dampen;
	new Rigidbody2D rigidbody;

	void Start()
	{
		rigidbody = GetComponent<Rigidbody2D>();
	}

	void FixedUpdate()
	{
		if( rigidbody == null )
			return;
		
		if( rigidbody.velocity.sqrMagnitude > maxSpeed * maxSpeed)
		{
			float currentSpeed = rigidbody.velocity.magnitude;
			currentSpeed = Mathf.Lerp( currentSpeed, maxSpeed, dampen );
			rigidbody.velocity = rigidbody.velocity.normalized * currentSpeed;
		}

	}
}
