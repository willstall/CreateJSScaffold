using UnityEngine;
using System.Collections;


namespace ForceFields
{
	public class WrapForceField : ForceField 
	{

		public bool affectX = true;
		public bool affectY = true;
		public bool affectZ = true;

		BoxCollider boxCollider;


		protected override void OnTriggerExit( Collider other )
		{
			

			base.OnTriggerExit(other);

			if( !enabled || !ShouldAffect(other) )
				return;

			Rigidbody rigidbody = other.GetComponent<Rigidbody>();
			
			if( rigidbody == null )
				return;


			if( boxCollider == null )
				boxCollider = GetComponent<BoxCollider>();


			Vector3 position = transform.InverseTransformPoint( other.transform.position );


			if( affectX && Mathf.Abs( position.x * 2 ) >= boxCollider.size.x )
			{
				position.x = -position.x;
			}

			if( affectY && Mathf.Abs( position.y * 2 ) >= boxCollider.size.y )
			{
				position.y = -position.y;
			}

			if( affectZ && Mathf.Abs( position.z * 2 ) >= boxCollider.size.z )
			{
				position.z = -position.z;
			}

			rigidbody.MovePosition( transform.TransformPoint(position) );

		}
	}

}
