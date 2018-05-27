(function () {
  
    function MainStoryboard()
    {
      this.StoryboardContainer_constructor();
      // this.init();
    } 
  
    var p = createjs.extend(MainStoryboard, createjs.StoryboardContainer);
        p.init = function()
        {
          var img = new createjs.Img( 'logo', 2.0 );
            // img.AddComponent( new OscillateScaleComponent(20, new createjs.Point(1,1) ) );
            // img.SetComponentsUpdate( true );

          var throwableContainer = new createjs.ThrowableContainer();
              throwableContainer.addChild( img );
              throwableContainer.y = stage.height * .25;

          var positionComponent = new OscillatePositionComponent();
            positionComponent.amplitude.y = 50;

          var lookAtComponent = new LookAtComponent();
          var rotateComponent = new RotateComponent( .5 );
          //		rotateComponent.increment = 0.5

          // Display 
          var test1 = new createjs.Shape();
            test1.graphics.beginFill("DeepSkyBlue").rect(-25,-25,50,50);
            test1.rotation = 45;
            test1.x = 60;
            test1.AddComponent( new OscillateScaleComponent(20, new createjs.Point(1,0) ) );
            test1.AddComponent( new SpinComponent(0.01,3600) );
            test1.SetComponentsUpdate( true );

          var test2 = new createjs.Shape();
            test2.graphics.beginFill("Red").drawCircle(0, 0, 10);
            test2.AddComponent( positionComponent );
            test2.SetComponentsUpdate( true );

          var test3 = new createjs.Shape();
            test3.x = -60;
            test3.graphics.beginFill("Green").rect(-30, -25, 60,50);
            test3.AddComponent( lookAtComponent );
            test3.SetComponentsUpdate( true );

            lookAtComponent.target = test2;
            //test2.on("tick", update);

          var spinningContainer = new createjs.Container();
            spinningContainer.addChild( test1,test2,test3 );
            spinningContainer.AddComponent( rotateComponent );
            spinningContainer.SetComponentsUpdate( true );

          var btn = new createjs.Button("meow", config.styles.button, config.sizes.button);
              btn.y = stage.height * -.25;
              btn.onPress = () => alert('love yah ;)');

          // Extension
            var extend_test = new ExtendedContainer();
            extend_test.output();

          this.addChild(spinningContainer,btn, throwableContainer );          
        }
    window.MainStoryboard = createjs.promote(MainStoryboard, "StoryboardContainer");
}());    