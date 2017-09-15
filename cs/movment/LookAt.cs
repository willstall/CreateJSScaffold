using UnityEngine;
using System.Collections;
using Geometry;

public class LookAt : MonoBehaviour 
{

	public Axis axis;
	public Transform target;


	public bool restrictToPlane;
	public Vector3 planeNormal;

	public float maximumRotationSpeed = 10;


	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	protected virtual void Update () 
	{

		if( target == null ) return;

		var normal = (target.position - transform.position).normalized;

		if( restrictToPlane )
			normal = Vector3.ProjectOnPlane( normal, planeNormal );
			
		var rotation = Quaternion.FromToRotation( axis, normal );
		transform.rotation = Quaternion.RotateTowards( transform.rotation, rotation, maximumRotationSpeed * Time.deltaTime);

	}

}
