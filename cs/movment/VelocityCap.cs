using UnityEngine;
using System.Collections;

public class VelocityCap : MonoBehaviour
{
	public new Rigidbody rigidbody;
	public float maxSpeed;
	
	[Range(0,1)]
	public float dampen;

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
