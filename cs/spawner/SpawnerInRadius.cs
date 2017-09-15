using UnityEngine;
using System.Collections;

/**
 * @class Spawner
 * @classdesc Spawn will Instantiate an object at an interval with collision detection. SpawnObject() may be called for manual spawning. Use a layermask for better performance.
 */

[AddComponentMenu("SimpleScripts/Create/SpawnerInRadius")]
public class SpawnerInRadius: MonoBehaviour
{
	/**	Prefab GameObject you would like to Instantiate */
	public GameObject objectToInstantiate;
	/**
	* @default  "this.transform.parent"
	* The parent transform of the object being created. 
	*/
	public Transform objectParentTransform;	
	/** Set this value to true to use the position of the prefab. Set this value to false to use the position of the attached parent transform. */
	public bool useObjectPosition = false;
	/** Set this value to true to use the rotation of the prefab. Set this value to false to use the rotation of the attached transform. */	
	public bool useObjectRotation = false;
	/** Interval is set in seconds. Turn interval to 0 to spawn objects as soon as they are out of the collision radius. */
	public float interval = 1.0f;
	/** Change your radius to define the area tested for collision upon spawn. Turn on debug mode to show radius gizmo. */
	public float radius = 1.0f;
	/** Change your layers to reflect the layermask of the object you are spawning. Turn layers to "Nothing" if you would like to turn off collision detection. */
	public LayerMask layers = -1;	
	/** Turn on debug to show radius gizmo. */
	public bool limitedAmount = true;
	public int maxObjects = 10;


	public bool debug = false;	
	
	private float _timer;
		
	void Start ()
	{
		_timer = 0;
		if(!objectParentTransform)
			objectParentTransform = this.transform.parent;
	}
	
	void Update ()
	{
		_timer += Time.deltaTime;
		if(_timer < interval)
			return;
		
		if(SpawnObject())
			_timer = 0;
	}

	void OnDrawGizmos()
	{
		if(debug)
		{
			Gizmos.color = Color.yellow;
			Gizmos.DrawWireSphere(transform.position, radius);
		}
	}
	
	/**
	* Manually spawn an object.
	* @returns { bool } Will return false if the object was not created due to a collision.
	*/
	public bool SpawnObject()
	{
		Collider[] hitColliders = Physics.OverlapSphere(transform.position, radius, layers);
        
        if(limitedAmount == true && hitColliders.Length > maxObjects)
		{
        	return false;
		}


        Vector3 targetPosition = Random.insideUnitSphere * radius;
		GameObject go = Instantiate(objectToInstantiate, transform.TransformPoint(targetPosition), useObjectRotation ? objectToInstantiate.transform.rotation : Quaternion.identity) as GameObject;
				   go.transform.parent = objectParentTransform;

        return true;
	}
	
}

