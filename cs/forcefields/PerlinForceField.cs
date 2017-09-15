using UnityEngine;
using System.Collections;

namespace ForceFields
{

	public class PerlinForceField : ForceField
	{
		public float force = 1.0f;
		
		public float noiseScale = 1.0f;
		public Vector3 offset;
		public Vector3 drift;

		public bool allowOverRotation = false;

		public bool affectX = true;
		public bool affectY = true;
		public bool affectZ = true;




		void Update()
		{
			offset += drift * Time.deltaTime;
		}


		public override Vector3 GetVectorField( Vector3 position )
		{
			position = position * noiseScale + offset; 
			float maxRotation = allowOverRotation ? 4 * Mathf.PI : 2 * Mathf.PI;
			float angle = Mathf.Lerp( 0, maxRotation, Mathf.PerlinNoise(position.x, position.y) );
			Vector3 noiseVector  = new Vector3( Mathf.Cos(angle), Mathf.Sin(angle), 0 );

			//noiseVector = Random.onUnitSphere;

			noiseVector.Scale( new Vector3(affectX ? 1 : 0, affectY ? 1 : 0, affectZ ? 1: 0) );
			noiseVector *= force;
			
			return noiseVector;
		}


		

	}

}