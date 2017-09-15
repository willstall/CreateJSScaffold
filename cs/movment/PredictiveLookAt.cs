using UnityEngine;
using System.Collections;

public class PredictiveLookAt : MonoBehaviour 
{

	public Vector3 lookAxis = Vector3.forward;
	public Rigidbody target;
	public float projectileSpeed;
	public float maximumRotationSpeed;

	[Range(0,100)]
	public int iterations = 5;

	Vector3 targetVelocity;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	protected virtual void Update () 
	{

		if( target == null ) return;

		targetVelocity = target.velocity;

		Vector3 targetPosition = target.transform.position;
		Vector3 aimDirection = targetPosition - transform.position;

		Debug.DrawLine( targetPosition, targetPosition + targetVelocity, Color.red );


		for(int i = 0; i < iterations; i++)
		{
			if( targetVelocity.magnitude == 0 ) break;

			Vector3 direction = targetPosition - transform.position;
			float timeToTarget = direction.magnitude / projectileSpeed;
			Vector3 newTargetPosition = targetPosition + targetVelocity * timeToTarget;
			Vector3 newAimDirection = newTargetPosition - transform.position;

			Debug.DrawLine( transform.position, newTargetPosition, Color.blue );
			

			//stop solving if converging on solution
			if( (newAimDirection - aimDirection).sqrMagnitude < 0.1f )
			{
				aimDirection = newAimDirection;
				break;
			}

			aimDirection = newAimDirection;
		}

		Debug.DrawLine( transform.position, transform.position + aimDirection, Color.cyan );

		transform.rotation = Quaternion.RotateTowards( transform.rotation, Quaternion.FromToRotation( lookAxis, aimDirection ), maximumRotationSpeed * Time.deltaTime );

	}

}
