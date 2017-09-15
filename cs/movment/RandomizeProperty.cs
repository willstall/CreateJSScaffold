using UnityEngine;
using System.Collections;
using System.Reflection;
using Reflection;

public class RandomizeProperty : MonoBehaviour
{
    [PropertyType( typeof(float) )]
    public ComponentProperty target;

    public float minRange = 1;
    public float maxRange = 3;    
    public bool isRelative = false;

    bool hasBeenSet = false;
    bool initialIsSet = false;
    float initial;

        
    void Update()
    {
        if( !target.IsReady )
            return;

        if( !initialIsSet )
        {
            initial = (float)target.Get();
            initialIsSet = true;
        }

        if( hasBeenSet )
            return;

        float value = Random.Range(minRange, maxRange);
        if( isRelative )
            value += initial;

        target.Set( value );

        hasBeenSet = true;
    }
}