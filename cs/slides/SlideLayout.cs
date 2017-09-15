using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Geometry;
using System;
using System.Linq;

[ExecuteInEditMode]
public class SlideLayout : GameBehaviour {

	public Axis layoutAxis;

	[Range(0,10)] //max of ten cause of camera size
	public float spacing;
	
	public List<Slide> slides { get; private set; }

	public Slide currentSlide{ get; private set; }
	

	List<Slide> subscribedSlides = new List<Slide>();

	// Use this for initialization

	void Awake()
	{
		UpdateSlides();

		if( !Application.isPlaying )
			return;


		foreach( Slide slide in slides )
			slide.gameObject.SetActive( true );

		if( !Application.isEditor )
		{
			currentSlide = slides[0];
			currentSlide.Preview();	
		}
	}	

	// Update is called once per frame
	void Update () 
	{
		UpdateSlides();

		var cameraSize = GetCameraSize();
		var offset = Mathf.Abs( Vector3.Dot( cameraSize, layoutAxis ) );

		for( var i = 0; i < slides.Count; i++ )
		{
			var slide = slides[i];
				slide.transform.localPosition = i * (Vector3)layoutAxis * (spacing + offset);
				slide.layout = this;
		}
	}	


	public Slide GetNextSlide( Slide slide )
	{
		var i = slides.IndexOf( slide );
		
		if( i + 1 < slides.Count )
			return slides[i+1];
		else
			return null;
	}

	public Slide GetPreviousSlide( Slide slide )
	{
		var i = slides.IndexOf( slide );
		
		if( i - 1 >= 0 )
			return slides[i-1];
		else
			return null;
	}

	public Slide GetClosestSlide( Vector3 position )
	{
		return 
			slides.OrderBy( slide => Vector3.Distance( slide.transform.position, position ) )
				.First();
	}


	public void SelectNextSlide( )
	{
		var nextSlide = GetNextSlide(currentSlide);
		if( nextSlide )
			currentSlide = nextSlide;
	}

	public void SelectPreviousSlide( )
	{
		var previousSlide = GetPreviousSlide(currentSlide);
		if( previousSlide )
			currentSlide = previousSlide;
	}


	public void SelectSlide( Slide slide )
	{
		currentSlide = slide;
	}
	void UpdateSlides()
	{
		
		if( Application.isPlaying )
			UpdateSlidesInGame();
		else
			UpdateSlidesInEditor();
	}

	void UpdateSlidesInEditor()
	{
		slides = GetComponentsInChildren<Slide>(true).ToList();

		foreach( Slide slide in slides )
		{
			slide.gameObject.SetActive( slide.isVisibleInEditor && slide.isVisibleInGame );
		}

		slides = slides.Where( slide => slide.isVisibleInGame ).ToList();

	}

	void UpdateSlidesInGame()
	{

		slides = GetComponentsInChildren<Slide>(true).Where( slide => slide.isVisibleInGame ).ToList();

		var toSubscribe = slides.Where( slide => !subscribedSlides.Contains(slide) ).ToList();
		foreach( Slide slide in toSubscribe )
		{
			slide.SlideEnter += SlideEntered;
			slide.gameObject.SetActive(true);
			subscribedSlides.Add( slide );
		}


		var oldSlides = GetComponentsInChildren<Slide>(true)
			.Where( slide => !slide.isVisibleInGame )
			.Where( slide => subscribedSlides.Contains(slide) )
			.ToList();

		foreach( Slide slide in oldSlides )
		{
			slide.SlideEnter -= SlideEntered;
			slide.gameObject.SetActive(false);
			subscribedSlides.Remove( slide );
		}
	}


	void SlideEntered( Slide slide )
	{
		currentSlide = slide;
	}


}
