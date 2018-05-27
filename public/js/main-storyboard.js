(function () {
  
    function MainStoryboard()
    {
      this.StoryboardContainer_constructor();
    } 
  
    var p = createjs.extend(MainStoryboard, createjs.StoryboardContainer);

    window.MainStoryboard = createjs.promote(MainStoryboard, "StoryboardContainer");
}());    