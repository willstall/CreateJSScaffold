using UnityEngine;
using System.Collections;

public class OscillatePosition : MonoBehaviour
{
    
    public float frequency = 2;
    public float amplitude = 1;    
    public float offset = 0;
    public bool randomOffset;
    public Vector3 movementDirection;
    

    Vector3 lastOffset;

    void Start()
    {
        if( randomOffset )
            offset = Random.value;
    }
        
    void Update ()
    {
        Vector3 thisOffset = movementDirection * Mathf.Sin( ( Time.time + offset ) * frequency) * amplitude;
        transform.localPosition += thisOffset - lastOffset;
        lastOffset = thisOffset;
    }
}