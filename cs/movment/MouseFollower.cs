using UnityEngine;
using System.Collections;

namespace Utils
{


	public class MouseFollower : MonoBehaviour {

		// Use this for initialization
		void Start () {
		
		}
		
		// Update is called once per frame
		void Update () {
			float depth = Vector3.Dot( transform.position - Camera.main.transform.position, Camera.main.transform.forward );
			transform.position = Camera.main.ScreenToWorldPoint( new Vector3( Input.mousePosition.x, Input.mousePosition.y, depth) );
		}
	}


}