using UnityEngine;
using System.Collections;
using System.Collections.Generic;

namespace ForceFields
{
	[RequireComponent( typeof(Collider) )]
	public abstract class ForceField : MonoBehaviour 
	{
		public LayerMask layersToAffect = -1;
		public ForceMode forceMode;

		List<Rigidbody> rigidbodies = new List<Rigidbody>();

		void Awake()
		{
			Collider collider = GetComponent<Collider>();
			collider.isTrigger = true;
		}

		public bool ShouldAffect( Collider other )
		{
			return IsInLayerMask(other.gameObject, layersToAffect);
		}

		protected virtual void OnTriggerEnter( Collider other )
		{
			if( !ShouldAffect(other) )
				return;

			Rigidbody rigidbody = other.GetComponent<Rigidbody>();
			
			if( rigidbody != null && !rigidbodies.Contains( rigidbody ))
				rigidbodies.Add( rigidbody );
		}


		protected virtual void OnTriggerExit( Collider other )
		{
			if( !ShouldAffect(other) )
				return;

			Rigidbody rigidbody = other.GetComponent<Rigidbody>();
			rigidbodies.Remove( rigidbody );
		}

		void FixedUpdate()
		{
			if( !enabled ) return;

			for(int i = rigidbodies.Count - 1; i >= 0; i-- )
			{
				Rigidbody rigidbody = rigidbodies[i];

				if( rigidbody == null )
				{
					rigidbodies.RemoveAt(i);
					continue;
				}
				
				ApplyForce( rigidbody );
			}
		}


		public virtual void ApplyForce( Rigidbody rigidbody )
		{
			Vector3 vector = GetVectorField( rigidbody.transform.position );
			rigidbody.AddForce( vector, forceMode );
		}


		public virtual Vector3 GetVectorField( Vector3 position )
		{
			return Vector3.zero;
		}

		static bool IsInLayerMask(GameObject obj, LayerMask mask)
	    {
	       return ((mask.value & (1 << obj.layer)) > 0);
	    }

	    public List<Rigidbody> Collection(){
	    	return rigidbodies;
	    } 
	}

}