using UnityEngine;
using System.Collections;

namespace ForceFields
{
	public class LayerMaskForceField : ForceField
	{	
		// only works with single layer
		[Header("Only works with single layer.")]
		public LayerMask layersToChangeTo;

		public override void ApplyForce( Rigidbody rigidbody )
		{
			rigidbody.gameObject.layer = layersToChangeTo.value - 1;
		}
	}
}
