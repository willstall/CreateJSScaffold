using UnityEngine;
using System.Collections;

[AddComponentMenu("SimpleScripts/Utils/Timer")]
public class Timer : MonoBehaviour
{
	public float durationInSeconds;
	public bool autoStart;
	public bool loop; 
	public string onComplete;
		
	private float _timeRemaining;
	private bool _isPaused;	
	private bool _isFinished;
	private bool _isRunning;
	
	void Start ()
	{	
		if(autoStart)
			StartTimer();
	}

	void Update ()
	{
		if(_isRunning == true)
		{
			_timeRemaining += Time.deltaTime;
			if(_timeRemaining >= durationInSeconds)
			{
				_isFinished = true;
				_isRunning = false;

				if( onComplete != "" )
					SendMessage( onComplete, null, SendMessageOptions.DontRequireReceiver );

				if( loop )
					StartTimer();
			}
		}
	}
	
	public Timer StartTimer( float durationInSeconds = 0.0f)
	{
        if (durationInSeconds > 0f)
        {
            this.durationInSeconds = durationInSeconds;
        } else if (this.durationInSeconds > 0f)
		{
			durationInSeconds = this.durationInSeconds;
		} else {
			this.durationInSeconds = durationInSeconds;	
		}
				
        _isRunning = true;	
        _isPaused = false;
        _isFinished = false;
        _timeRemaining = 0.0f;

		return this;
	}
	
	public void PauseTimer()
	{
		if( _isFinished == false)
			_isPaused = (_isPaused) ? ( false ) : ( true );			
	}
	
	public void StopTimer()
	{
		_isRunning = false;
		_isPaused = false;
		_isFinished = false;
	}
	
	public void ResetTimer()
	{
		StartTimer();	
	}
	
	public bool isPaused
	{
		get { return _isPaused; }
	}
	
	public bool isFinished
	{
		get { return _isFinished; }
	}
	
	public bool isRunning
	{
		get { return _isRunning; }
	}
	
	public float timeRemaining
	{
		get { return _timeRemaining; }
	}

	public float timeElapsed
	{
		get { return _timeRemaining; }
	}
		
}
