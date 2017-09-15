using UnityEngine;
using System.Collections;

public class GetClosestRigidbody2D : MonoBehaviour
{

	public Rigidbody2D target;
	public LayerMask targetLayerMask;
	public float acquisitionRadius;

	public bool debug = false;

	// Update is called once per frame
	void FixedUpdate () 
	{
		
		if( !target )
		{	
			Collider2D[] colliders = Physics2D.OverlapCircleAll( transform.position, acquisitionRadius, targetLayerMask );

			float minDistance = Mathf.Infinity;
			foreach( Collider2D collider in colliders )
			{
				if( collider.gameObject == gameObject )
					continue;

				Rigidbody2D rb = collider.GetComponent<Rigidbody2D>();
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
