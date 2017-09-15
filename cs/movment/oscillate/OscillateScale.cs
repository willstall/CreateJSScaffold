using UnityEngine;
using System.Collections;

public class OscillateScale : MonoBehaviour
{
    public float frequency = 2;
    public Vector3 amplitude = Vector3.one; 
    public bool randomOffset;   
    

    float offset;

    Vector3 lastOffset;

    void Start()
    {
        offset = 0.0f;
        if(randomOffset)
            offset = Random.Range(0,10000);
    }
        
    void Update ()
    {
        var thisOffset = Mathf.Sin( (Time.time + offset) * frequency ) * amplitude;
        transform.localScale += thisOffset - lastOffset;
        lastOffset = thisOffset;
    }
}