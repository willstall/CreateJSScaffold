// Config
var config =
{
  assetPath: "assets/",

  assets: [
    { id: "logo", src: "logo.png" }
  ],

  colors:
  {
    white: "#FFFFFF",
    black: "000000"
  },

  fonts:
  {
    default: "14px Gloria Hallelujah",
    button: "20px Gloria Hallelujah"
  },
  
  sizes:
  {
     button: { x: 180, y: 48, r: 5, p: 10 } 
  }
}
// Styles
config.styles =
{
  button:
  {
    backgroundColor: config.colors.black,
    foregroundColor: config.colors.white,
    font: config.fonts.button
  }
}