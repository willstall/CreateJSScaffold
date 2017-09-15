using UnityEngine;
using System.Collections;

[RequireComponent( typeof(GetClosestRigidbody) )]
public class FollowClosestRigidbody : MonoBehaviour
{

	public float followSpeed;
	public float followRadius;

	GetClosestRigidbody targetProvider;

	void LateUpdate()
	{

		if( target != null )
		{
			Vector3 radialDirection = transform.position - target.transform.position;
			Vector3 targetPosition = target.transform.position + radialDirection.normalized * followRadius;
			Vector3 newPosition = Vector3.MoveTowards( transform.position, targetPosition, followSpeed * Time.deltaTime );

			transform.position = newPosition;
		}
	}

	Rigidbody target
	{
		get
		{
			if( !targetProvider )
				targetProvider = GetComponent<GetClosestRigidbody>();

			return targetProvider.target;
		}
	}
}
