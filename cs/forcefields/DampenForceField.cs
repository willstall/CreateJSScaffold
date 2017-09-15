using UnityEngine;
using System.Collections;

namespace ForceFields
{


	public class DampenForceField : ForceField
	{
		public float maxVelocity = 1.0f;


		public float dampen = 0.3f;



		public override void ApplyForce( Rigidbody rigidbody )
		{
			Vector3 velocity = rigidbody.velocity;

			if( velocity.magnitude > maxVelocity )
			{
				velocity -= velocity * dampen * Time.deltaTime;
			}

			//rigidbody.AddForce( velocity, ForceMode.VelocityChange );	
			rigidbody.velocity = velocity;
		}
	}

}