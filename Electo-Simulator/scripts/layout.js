/* This JavaScript file consider about placing each configs(from config.js) into the HTML page(index.html)*/

//draw the layout
var mainLayout = d3.select("body")
        .append('svg')
        .attr('height', svgCanvasH)
        .attr('width', '100%')	
    ;

//draw the gates layout
var operators = mainLayout
        .append('rect')
		.attr('x','1%')
		.attr('y','6%')
		.attr('rx', '10')
		.attr('ry', '10')
		.attr('class', 'gates')
        .attr('height','48%')
        .attr('width', '15%')
        .style('fill', 'rgba(251,251,251,0.8)')	
    ;



//draw the labels layout
var streams = mainLayout
        .append('rect')
		.attr('x','1%')
		.attr('y','55%')
		.attr('rx', '10')
		.attr('ry', '10')
		.attr('id', 'labels')
        .attr('height','40%')
        .attr('width', '15%')
		.style('fill', 'rgba(251,251,251,0.8)')	
        
    ;



var selectedObject; /* 'selectedObject' use for mouse events. */
var selectedCircle; /* 'selectedCircle' use for select the red dodes of the operator or labels.*/


var drawingGroup = mainLayout
        .append('g')
        .attr('class', 'draw')
        .attr('id', 'draw')
        .on('mouseover', function () {
            var elem = d3.select(this);
            selectedObject = {
                id: elem.attr('id'),
                cls: elem.attr('class')
            };
        }
    )
		
        .
        on('mouseout', function () {
            selectedObject = null;
        })
        .on('mousemove', function () {
            if (currentLine.sourceGroup != '') {
                d3.select('#' + currentLine.lineId)
                    .attr('x2', d3.mouse(this)[0])
                    .attr('y2', d3.mouse(this)[1]);
            }

            if(dragging){
                d3.select('#dummyLine')
                    .attr('x2', d3.mouse(this)[0])
                    .attr('y2', d3.mouse(this)[1])

                    .style('visibility','visible')
                    .style('stroke','red')
                    .style('stroke-width','4px');
            }else{
                d3.select('#dummyLine')
                    .style('visibility', 'hidden');
            }
        })
    ;
/* In here use moves events : 
				'mouseover' : mouse pointer on the object.
				'mouseout' : mouse pointer not on the object.
				'mousemove' : check dragging or not and do the actions.
		*/


//draw the drawing layout
var drawings = drawingGroup
        .append('rect')
        .attr('x', '17%')
        .attr('height','61%')
		.attr('y', '6%')
		.attr('rx', '15')
		.attr('ry', '15')
		.attr('id','middleSideBar')
        .attr('width', '65%')
        .style({
		'fill': 'rgba(250,250,250,1)',
		'border-style': 'outset'
		})
    ;



drawingGroup.append('line')
    .attr('id', 'dummyLine')
    .attr('class', 'dummyLine')
    .attr('x1', 0)
    .attr('y1', 0)
    .style('stroke:green; stroke-width:2px');

var dragging = false;
var circleID;
var dummyLine = {
    src  : '',
    target : ''
};
//draw the output layout
var output = mainLayout
        .append('rect')
		.attr('x','17%')
		.attr('y','68%')
		.attr('rx', '10')
		.attr('ry', '10')
		.attr('class', 'out')
        .attr('height','27%')
        .attr('width', '65%')
        .style('fill', 'rgba(251,251,251,0.8)')	
    ;
//draw the menu layout
var menu = mainLayout
        .append('rect')
		.attr('x','83%')
		.attr('y','6%')
		.attr('rx', '10')
		.attr('ry', '10')
		.attr('id', 'sidebar')
        .attr('height','89%')
        .attr('width', '16%')
		.style('fill', 'rgba(251,251,251,0.8)')	
        
    ;
//draw the gate_title layout
var gatetitle = mainLayout
        .append('rect')
		.attr('x','2%')
		.attr('y','7%')
		.attr('rx', '5')
		.attr('ry', '5')
		.attr('id', 'gatetitle')
        .attr('height','5%')
        .attr('width', '13%')
		.style('fill', 'rgba(32,26,32,0.8)') 
    ;
	
	//topic for gate_title
	var operatorsTitle = mainLayout
		.append('text')
		.attr('x','3%')
		.attr('y','10.25%')
		.attr('width','7%')
		.attr('class', 'gates')
		.text('Gates')
		.style({
			'font-size': 20,
			'fill': '#ffffff',
			'text-align':'center'
		});
//draw the lable_title layout
var labletitle = mainLayout
        .append('rect')
		.attr('x','2%')
		.attr('y','56%')
		.attr('rx', '5')
		.attr('ry', '5')
		.attr('id', 'labletitle')
        .attr('height','5%')
        .attr('width', '13%')
		.style('fill', 'rgba(32,26,32,0.8)')	
    ;
	//topic for lable_title
	var operatorsTitletxt = mainLayout
		.append('text')
		.attr('x','3%')
		.attr('y','59.25%')
		.attr('width','7%')
		.attr('class', 'labletitletxt')
		.text('Lables')
		.style({
			'font-size': 20,
			'fill': '#ffffff',
			'text-align':'center'
		});
//draw the workspace_title layout
var workspacetitle = mainLayout
        .append('rect')
		.attr('x','18%')
		.attr('y','7%')
		.attr('rx', '5')
		.attr('ry', '5')
		.attr('id', 'workspacetitle')
        .attr('height','5%')
        .attr('width', '63%')
		.style('fill', 'rgba(32,26,32,0.8)')	   
    ;
	//topic for workspace_title
	var workspacetitletxt = mainLayout
		.append('text')
		.attr('x','19%')
		.attr('y','10.25%')
		.attr('width','7%')
		.attr('class', 'workspacetitletxt')
		.text('Work Space')
		.style({
			'font-size': 20,
			'fill': '#ffffff',
			'text-align':'center'
		});
//draw the output_title layout
var outputtitle = mainLayout
        .append('rect')
		.attr('x','18%')
		.attr('y','69%')
		.attr('rx', '5')
		.attr('ry', '5')
		.attr('id', 'outputtitle')
        .attr('height','5%')
        .attr('width', '63%')
		.style('fill', 'rgba(32,26,32,0.8)')	    
    ;
	//topic for output_title
	var outputtitletxt = mainLayout
		.append('text')
		.attr('x','19%')
		.attr('y','72.25%')
		.attr('width','7%')
		.attr('class', 'outputtitletxt')
		.text('Output')
		.style({
			'font-size': 20,
			'fill': '#ffffff',
			'text-align':'center'
		});
//draw the menu_title layout
var menutitle = mainLayout
        .append('rect')
		.attr('x','84%')
		.attr('y','7%')
		.attr('rx', '5')
		.attr('ry', '5')
		.attr('id', 'menutitle')
        .attr('height','5%')
        .attr('width', '14%')
		.style('fill', 'rgba(32,26,32,0.8)')	  
    ;
	//topic for menu_title
	var menutitletxt = mainLayout
		.append('text')
		.attr('x','85%')
		.attr('y','10.25%')
		.attr('width','7%')
		.attr('class', 'menutitletxt')
		.text('Menu')
		.style({
			'font-size': 20,
			'fill': '#ffffff',
			'text-align':'center'
		});
		
/*drawOperators() and drawStreams() functions are calling from function.js*/
drawOperators(Operators, operatorsConfig, operatorsRectConfig);
drawStreams(Streams, streamsConfig, streamsRectConfig);
