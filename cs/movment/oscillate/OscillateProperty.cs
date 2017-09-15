using UnityEngine;
using System.Collections;
using System.Reflection;
using Reflection;

public class OscillateProperty : MonoBehaviour
{
    [PropertyType( typeof(float) )]
    public ComponentProperty target;

    public float frequency = 2;
    public float amplitude = 1;    
    public float offset = 0;

    float lastOffset = 0;

        
    void Update ()
    {
        if( !target.IsReady )
            return;

        var thisOffset = Mathf.Sin( ( Time.time + offset ) * frequency) * amplitude;
        target.Set( (float)target.Get() + thisOffset - lastOffset );
        lastOffset = thisOffset;
    }
}