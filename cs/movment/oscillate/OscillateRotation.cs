using UnityEngine;
using System.Collections;

public class OscillateRotation : MonoBehaviour
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
        float r = baseRotation + Mathf.Sin( ( Time.time + offset ) * frequency) * amplitude;

        Quaternion rotation = Quaternion.AngleAxis( r, axisOfRotation );

        transform.localRotation = rotation;
        
    }
}