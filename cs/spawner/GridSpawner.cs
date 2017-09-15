using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GridSpawner : MonoBehaviour 
{
	public GameObject prefab;
	public Vector3 dimensions = Vector3.one;
	public float spacing;

	// pub/lic EditorButton refresh = new EditorButton( this.Refresh );

	List<GameObject> instances = new List<GameObject>();
	
	Vector3 lastDimensions;
	float lastSpacing;
	
	// Update is called once per frame
	void Update () {
		if( lastDimensions != dimensions )
		{
			InstantiatePrefabs();
			ArrangePrefabs();
		}

		if( lastSpacing != spacing )
			ArrangePrefabs();
		

		lastDimensions = dimensions;
		lastSpacing = spacing;
	}


	[ContextMenu ("Refresh")]
	public void Refresh()
	{
		if( !Application.isPlaying )
			return;

		foreach( GameObject instance in instances )
		{
			if( instance )
				Destroy( instance );
		}

		instances.Clear();
		
		InstantiatePrefabs();
		ArrangePrefabs();
	}

	void InstantiatePrefabs()
	{
		SanityCheck();

		int totalPrefabs = (int)(dimensions.x * dimensions.y * dimensions.z);

		while( instances.Count > totalPrefabs )
		{
			GameObject instance = instances[ instances.Count - 1 ];
			instances.RemoveAt( instances.Count - 1  );
			Destroy( instance );
		}

		while( instances.Count < totalPrefabs )
		{
			GameObject instance = Instantiate( prefab );
			instance.transform.parent = this.transform;
			instances.Add( instance );
		}
	}


	void SanityCheck()
	{
		dimensions.x = Mathf.Max( Mathf.Round(dimensions.x), 1 );
		dimensions.y = Mathf.Max( Mathf.Round(dimensions.y), 1 );
		dimensions.z = Mathf.Max( Mathf.Round(dimensions.z), 1 );
	}

	void ArrangePrefabs()
	{
		for(int i = 0; i < instances.Count; i++)
		{
			GameObject instance = instances[i];

			if( !instance )
				continue;

			instance.transform.localPosition = GetLocation(i);
		}
	}

	Vector3 GetLocation( int index )
	{
		SanityCheck();
		//int final = index;
		int z = (int)(index / (int)dimensions.x / (int)dimensions.y);
		int y = (int)(index / (int)dimensions.x) % (int)dimensions.y;
		int x = index % (int)dimensions.x;//(int)(index % (int)dimensions.x % (int)dimensions.y);

		//x * dimensions.x * dimensions.y + y * dimensions.y + z = index;

		return GetLocation( new Vector3(x, y, z) );
	}

	Vector3 GetLocation( Vector3 index )
	{
		return index * spacing;
	}

	void OnDrawGizmos()
	{
		Vector3 size = Vector3.one;


		Gizmos.matrix = transform.localToWorldMatrix;	
		#if UNITY_EDITOR
		
		if( prefab )
		{
			Renderer renderer = prefab.GetComponent<Renderer>();
			if( renderer )
				size = renderer.bounds.size;
		}

		#endif

		Gizmos.color = Color.cyan;

		for( int z = 0; z < (int)dimensions.z; z++ )
		{
			for( int y = 0; y < (int)dimensions.y; y++ )
			{
				for( int x = 0; x < (int)dimensions.x; x++ )
				{
					Gizmos.DrawWireCube( GetLocation( new Vector3(x,y,z) ), size );
					Gizmos.color = new Color(1, 1, 1, .2f);
				}

				
			}

		}	
	}
}
