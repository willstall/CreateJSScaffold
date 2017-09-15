using UnityEngine;
using System.Collections;

public class GetClosestRigidbody : MonoBehaviour
{

	public Rigidbody target;
	public LayerMask targetLayerMask;
	public float acquisitionRadius;
	public bool constantlyUpdateTarget = false;

	public bool debug = false;

	// Update is called once per frame
	void Update () 
	{
		
		if(( !target )|| ( constantlyUpdateTarget ))
		{	
			Collider[] colliders = Physics.OverlapSphere( transform.position, acquisitionRadius, targetLayerMask );

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

		if( target && (target.transform.position - transform.position).magnitude > acquisitionRadius )
			target = null;

	}

	public void OnDrawGizmos()
	{
		if(!debug)
			return;

		Gizmos.color = Color.magenta;
		Gizmos.DrawWireSphere( transform.position, acquisitionRadius );
	}
}
