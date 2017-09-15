using UnityEngine;
using System.Collections;

namespace ForceFields
{
	public class DestroyForceField : ForceField
	{
		protected override void OnTriggerExit( Collider other )
		{
			base.OnTriggerExit( other );

			if( !ShouldAffect(other) )
				return;

			Destroy( other.gameObject );
		}
	}
}