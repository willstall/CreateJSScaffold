using UnityEngine;
using System.Collections;

namespace ForceFields
{

	public class BrownianForceField : ForceField
	{
		public float force = 1.0f;
		
		public float noiseScale = 1.0f;
	//	public Vector3 offset;
	//	public Vector3 drift;

		public bool affectX = true;
		public bool affectY = true;
		public bool affectZ = true;




		void Update()
		{
			//offset += drift * Time.deltaTime;
		}


		public override Vector3 GetVectorField( Vector3 position )
		{

			Vector3 noiseVector  = Random.onUnitSphere * noiseScale;

			noiseVector.Scale( new Vector3(affectX ? 1 : 0, affectY ? 1 : 0, affectZ ? 1: 0) );
			noiseVector *= force;
			
			return noiseVector;
		}


		

	}

}