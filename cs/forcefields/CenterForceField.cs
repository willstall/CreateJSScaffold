using UnityEngine;
using System.Collections;

namespace ForceFields
{

	public class CenterForceField : ForceField
	{
		public float force = 1.0f;

		public bool affectX = true;
		public bool affectY = true;
		public bool affectZ = true;




		public override Vector3 GetVectorField( Vector3 position )
		{
			BoxCollider boxCollider = GetComponent<BoxCollider>();

			Vector3 affect = new Vector3(affectX ? 1 : 0, affectY ? 1 : 0, affectZ ? 1: 0);
			Vector3 vector = transform.position - position;
			vector.Scale( affect );
			
			vector.Normalize();

			Vector3 dist = transform.position - position;
			Vector3 halfSize = 0.5f * boxCollider.size;
			Vector3 attenuate = new Vector3( Mathf.Abs(dist.x) / halfSize.x, Mathf.Abs(dist.y)/halfSize.y, Mathf.Abs(dist.z)/halfSize.z );
			//attenuate = new Vector3( 1/ attenuate.x, 1/attenuate.y, 1/attenuate.z );
			attenuate.Scale( affect );

			

			vector *= force;

			vector.Scale( attenuate );
			
			return vector;
		}


		

	}

}