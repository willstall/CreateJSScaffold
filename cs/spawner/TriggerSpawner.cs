using UnityEngine;
using System.Collections;

public class TriggerSpawner : MonoBehaviour
{

	public GameObject prefab;
	public Transform parent;
	public float radius = 1;
	public float interval = 1;
	public LayerMask triggerLayers;
	public LayerMask collisionLayers;

	public bool oneShotSpawn = false;

	bool isActive;
	bool hasFired;

	float intervalTimer = Mathf.Infinity;

	// Use this for initialization
	void Start ()
	{
		ResetOneShot();
	}

	void FixedUpdate()
	{
		if( !enabled )
			return;

		if( !prefab )
			return;

		intervalTimer += Time.deltaTime;
		bool canSpawn = intervalTimer >= interval;

		if( !canSpawn )
			return;

		isActive = Physics.CheckSphere( transform.position, radius, triggerLayers );

		if( isActive )
		{
			if( oneShotSpawn )
			{
				if( !hasFired )
					SpawnObject();
			}else{
				SpawnObject();	
			}
			intervalTimer = 0;
		}
			
	}

	public void ResetOneShot()
	{
		hasFired = false;
	}

	public bool SpawnObject()
	{
		if( !enabled )
			return false;

		if( !Physics.CheckSphere( transform.position, radius, collisionLayers ) )
		{
			GameObject go = Instantiate( prefab, transform.position, transform.rotation ) as GameObject;
			go.transform.parent = parent;
			hasFired = true;
			return true;
		}

		return false;
	}

	void OnDrawGizmos()
	{
		Gizmos.matrix = transform.localToWorldMatrix;
		Gizmos.color = isActive ? Color.green : Color.red;

		Gizmos.DrawWireSphere( Vector3.zero, radius );
	}
}

