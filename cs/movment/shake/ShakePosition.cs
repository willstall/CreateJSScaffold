using UnityEngine;
using System.Collections;

public class ShakePosition : MonoBehaviour
{
    
    public float frequency = 2;
    public float amplitude = 1;    
    public float offset = 0;
    public bool randomOffset;
    public Vector3 movementDirection = Vector3.one;
    

    Vector3 lastOffset;

    void Start()
    {
        if( randomOffset )
            offset = Random.value;
    }
        
    void Update ()
    {

        float seed = Time.time * frequency;

        Vector3 result;
        result.x = 2 * ( (Mathf.PerlinNoise (seed, 0f)) - 0.5f);
        result.y = 2 * ( (Mathf.PerlinNoise (0f, seed)) - 0.5f); 
        result.z = 2 * ( (Mathf.PerlinNoise (seed, seed)) - 0.5f); 
        result = result * amplitude;
        result.Scale( movementDirection );

        Vector3 thisOffset = result;
        transform.localPosition += thisOffset - lastOffset;
        lastOffset = thisOffset;
    }


}