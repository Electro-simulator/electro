
var svgCanvasH = 820, svgCanvasW = 1000; // web application window higth(= svgCanvasH) and width(= svgCanvasW)

//rectangle of gates are displaying 
var operatorsRectConfig = {
    height: 400,
    width: 160,
    x: 10,
    y: 20,
    background: 'white' /* 'operatorsRectConfig' define the operator display area in the web application page.*/

};
//label area
var streamsRectConfig = {
    height: 420,
    width: 160,
    x: 5,
    y: 410,
    background: 'grey' /* 'streamsRectConfig' define the label stream disply area in the web application page.*/

};

var drawingRectConfig = {
    height: 500,
    width: 600,
    x: 180,
    y: 20,
    background: 'grey' /* 'drawingRectConfig' define the workspace area of the web application. */

};

//Output result area
var resultRectConfig = {
    height: 300,
    width: 600,
    x: 180,
    y: 530,
    background: 'grey' /* 'resultRectConfig' define the result (output) tables area in the web application.*/

};

//side bar area for menu

var menuRectConfig = {
    height: 810,
    width: 200,
    x: 790,
    y: 20,
    background: 'grey' /* 'menuRectConfig' define the menu area of the web application. */

};
//label icon
var streamsConfig = {
    
	height:10,
	width:0,
	vertMargin: 20,
	horMargin: 25

};

//gates icons

var operatorsConfig = {
	
    icon_height: 40,
	icon_width: 100,
	vertMargin: 25,
	horMargin: 25
      
};

/*This each part define as  SVGcanvases configs. If some developer need to add more area parts(configs),then they need to difine area configs as follow 
			
		var <CONFIG_NAME> = {
				height : <height_number>,
				width : <width_number>,
				x : <distance_from_left_side>, - for 'icons' , x => vertMargin
				y : <distance_from_top>, - for 'icons' , y => horMargin
				background : '<background_color>'
		};
		
		
  */