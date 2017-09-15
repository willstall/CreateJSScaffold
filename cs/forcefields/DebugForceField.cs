using UnityEngine;
using System.Collections;


namespace ForceFields
{

	[ExecuteInEditMode]
	public class DebugForceField : MonoBehaviour 
	{

		public Color displayColor = new Color(0.5f, 0.92f, 0.5f);
		public float displayResolution = 0.5f;
		public float displayScale = 1;
		// public ForceField[] fields;

		[Range(0,1)]
		public float displayZ = 0.5f;

		bool showGizmos = false;

		public void OnEnable()
		{
			showGizmos = true;
		}

		public void OnDisable()
		{
			showGizmos = false;
		}

		void OnDrawGizmosSelected()
		{	if(showGizmos == false)
				return;

			displayResolution = Mathf.Max(displayResolution, 0.1f);

			BoxCollider boxCollider = GetComponent<BoxCollider>();
			if( boxCollider != null )
				DrawBoxCollider(boxCollider);
			else{
				SphereCollider sphereCollider = GetComponent<SphereCollider>();
				if( sphereCollider != null )
					DrawSphereCollider( sphereCollider ); 
			}
			//}

		}


		void DrawBoxCollider( BoxCollider collider )
		{
			Vector3 size = collider.size;
			Vector3 center = collider.center;
			Vector3 halfSize = 0.5f * size;

			Gizmos.matrix = transform.localToWorldMatrix;
			Gizmos.color = displayColor;

			ForceField[] fields = GetComponents<ForceField>();

			//for( float z = -halfSize.z; z < halfSize.z; z += displayResolution ) {

			float z = Mathf.Lerp( -halfSize.z + center.z, halfSize.z + center.z, displayZ );
			for( float y = -halfSize.y + center.y; y < halfSize.y + center.y; y += displayResolution ) {
			for( float x = -halfSize.x + center.x; x < halfSize.x + center.x; x += displayResolution )
			{
				Vector3 pos = new Vector3(x, y, z);
				Vector3 vel = Vector3.zero;
				Vector3 localPos = transform.TransformPoint(pos);
				foreach( ForceField field in fields )
				{
					if( field.enabled )
						vel += field.GetVectorField( localPos );
				}
				
				Gizmos.DrawLine( pos, pos + vel * displayScale );
			}}
		}

		void DrawSphereCollider( SphereCollider collider )
		{

			Vector3 center = collider.center;

			float radius = collider.radius;//Mathf.Lerp(collider.radius, 0, 2 * Mathf.Abs( .5f - displayZ ));

			Gizmos.matrix = transform.localToWorldMatrix;
			Gizmos.color = displayColor;

			ForceField[] fields = GetComponents<ForceField>();

			//for( float z = -halfSize.z; z < halfSize.z; z += displayResolution ) {

		//	float z = center.z +  


			float circumference = 2 * Mathf.PI * radius;
			float t = displayResolution/circumference * 360;

			for( float angle = 0; angle < 360; angle += t )
			{
				for( float r = 0; r < radius; r += displayResolution/2 )
				{
					Vector3 pos = Quaternion.AngleAxis(angle, Vector3.forward) * Vector3.up * r;
					//pos.z = z;

					Vector3 vel = Vector3.zero;
					Vector3 localPos = transform.TransformPoint(pos);
					foreach( ForceField field in fields )
					{
						if( field.enabled )
							vel += field.GetVectorField( localPos );
					}
					
					Gizmos.DrawLine( pos, pos + vel * displayScale );
				}
			}


		}


	}


}