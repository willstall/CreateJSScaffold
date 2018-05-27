(function () {
  
    function MainStoryboard()
    {
      this.StoryboardContainer_constructor();
      // this.init();
    } 
  
    var p = createjs.extend(MainStoryboard, createjs.StoryboardContainer);
        p.init = function()
        {
          // Extension
            var extend_test = new ExtendedContainer();
                extend_test.output();

          this.addChild( extend_test );          
        }
    window.MainStoryboard = createjs.promote(MainStoryboard, "StoryboardContainer");
}());    