using UnityEngine;
using System.Collections;

public class AutoPredictiveLookAt : PredictiveLookAt
{

	public LayerMask targetLayerMask;
	public float activationRadius;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	protected override void Update () 
	{
		
		if( !target )
		{	
			Collider[] colliders = Physics.OverlapSphere( transform.position, activationRadius, targetLayerMask );

			float minDistance = Mathf.Infinity;
			foreach( Collider collider in colliders )
			{
				Rigidbody rb = collider.GetComponent<Rigidbody>();
				if( !rb ) continue;

				float dist = (rb.transform.position - transform.position).sqrMagnitude;
				if( dist < minDistance )
				{
					target = rb;
					minDistance = dist;
				}
			}
		}

		if( target && (target.transform.position - transform.position).magnitude > activationRadius )
			target = null;

		base.Update();
	}

	public void OnDrawGizmos()
	{
		Gizmos.color = Color.magenta;
		Gizmos.DrawWireSphere( transform.position, activationRadius );
	}


}
