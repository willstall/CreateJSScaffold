using UnityEngine;
using System.Collections;

public class ShakeRotation : MonoBehaviour
{
    
    public float frequency = 2;
    public float amplitude = 1;    
    public float offset = 0;
    public float baseRotation = 0;
    public Vector3 axisOfRotation = Vector3.forward;    
    
    void Start()
    {
    
    }
        
    void Update ()
    {
        
        float seed = Time.time * frequency;
        float noise = ( (Mathf.PerlinNoise (seed, 0f)) - 0.5f);

        float r = baseRotation + noise * amplitude;

        Quaternion rotation = Quaternion.AngleAxis( r, axisOfRotation );

        transform.localRotation = rotation;
        
    }
}