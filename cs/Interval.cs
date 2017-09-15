using UnityEngine;
using System.Collections;

#if UNITY_EDITOR
using UnityEditor;
#endif

[System.Serializable]
public class Interval {
	
	public float length;

	public Interval( float length )
	{
		this.length = length;
	}

	public void Update()
	{
		Update( Time.deltaTime );
	}

	public void Update( float deltaTime )
	{
		currentTime += deltaTime;
		currentTime = Mathf.Clamp(currentTime, 0, length);
	}

	public void Reset()
	{
		currentTime = 0;
	}

	public void FastForward()
	{
		currentTime = length;
	}

	public float currentTime { get; private set; }

	public bool isComplete
	{
		get
		{
			return currentTime >= length;
		}
	}

	public float percentComplete
	{
		get
		{
			return Mathf.Clamp(currentTime / length, 0, 1);
		}
	}

	public float timeRemaining
	{
		get
		{
			return length - currentTime;
		}
	}


	public static implicit operator Interval(float t)
    {
    	Interval i = new Interval(t);
        return i;
    }
}




#if UNITY_EDITOR
[CustomPropertyDrawer (typeof (Interval))]
public class IntervalDrawer : PropertyDrawer {
	
	// Draw the property inside the given rect
	public override void OnGUI (Rect position, SerializedProperty property, GUIContent label) {
		// Using BeginProperty / EndProperty on the parent property means that
		// prefab override logic works on the entire property.
		EditorGUI.BeginProperty (position, label, property);
		
		// Draw label
		position = EditorGUI.PrefixLabel (position, label);
		
		// Don't make child fields be indented
		var indent = EditorGUI.indentLevel;
		EditorGUI.indentLevel = 0;
		
		// Calculate rects
		var fieldRect = new Rect (position.x, position.y, position.width - 30 , position.height);
		var unitRect = new Rect (position.x + position.width - 25, position.y, 25, position.height);
		
		// Draw fields - passs GUIContent.none to each so they are drawn without labels
		EditorGUI.PropertyField (fieldRect, property.FindPropertyRelative ("length"), GUIContent.none);
		EditorGUI.LabelField (unitRect, "sec");
		
		// Set indent back to what it was
		EditorGUI.indentLevel = indent;
		
		EditorGUI.EndProperty ();
	}
}

#endif

