using UnityEngine;
using System.Collections;

[AddComponentMenu("SimpleScripts/Movement/Simple Rotator")]
public class SimpleRotator : MonoBehaviour {

	public Vector3 axisOfRotation = Vector3.up;
	public float speed= 10.0f;
	public bool useLocalSpace = true;
	public bool randomDirection = false;

	private Transform _transform;

	void Start () 
    {
		_transform = this.transform;	

		if( randomDirection )
			axisOfRotation = Random.onUnitSphere;
	}
	
	void Update () 
    {
		Space space = (useLocalSpace) ? Space.Self : Space.World ;
		_transform.Rotate(axisOfRotation.normalized * speed * Time.deltaTime, space);	
	}

    public void SetRotationSpeed( float speed )
    {
        this.speed = speed;  
    }

    public void SwitchDirection()
    {
        speed *= -1;
    }
}
