
var currentLine = { /* initialize the current selected line before it use.*/
	
    sourceGroup: '',
    sourceNodeClass: '',
    targetGroup: '',
    targetNodeClass: '',
    lineId: ''

};

graph = {}; /* 'graph' use for make the graph of objects.*/

function addNode(nodeName, type) { /* this function use to create child node.*/

    var child;
    if (type == 'gates') {
        child = {
            nodeLeftIn: '',
            nodeLeftOut: '',
            nodeRightIn: '',
            nodeRightOut: ''
        }
    } else {
        child = {
            nodeLeft: '',
            nodeRight: ''
        }
    }

    if (!graph.hasOwnProperty(nodeName)) {
        graph[nodeName] = child;
    }

    return graph;

}

function updateNode(nodeName, type, key, value) { /* update the graph*/

    addNode(nodeName, type);

    graph[nodeName][key] = value;

    return graph;
}

function isDrawingLine() {    /*cheack whether the line is drawing or not.*/
    if (currentLine.sourceGroup = '') {
        return false;
    }
    return true;

}


function getXY(mouse, current, parent) { /* this function use to find the location of the mouse , current selected object and the parent object.*/

    var obj = {
        x: 0,
        y: 0
    };

    var dx = mouse.dx;
    var dy = mouse.dy;

    obj.x = dx;
    obj.y = dy;

    var xGap = current.x - parent.x;
    var yGap = current.y - parent.y;

    if (dx < 0) {
        if ((dx + xGap) < 0) {
            obj.x = -1 * xGap + 10;
        }
    } else {
        if ((dx + xGap) > parent.width) {
            obj.x = parent.width - xGap - current.width - 10;
        }
    }

    if (dy < 0) {
        if ((dy + yGap) < 0) {
            obj.y = -1 * yGap + 10;
        }

    } else {
        if ((dy + yGap) > parent.height) {
            obj.y = parent.height - yGap - current.height - 10;
        }
    }


    return obj;
}

function float(x) {
    return parseFloat(x);
}


function getCoordinatesForOperators(parentConfig, operatorConfig, noOfIcons) { /* get the coordinates of the position for the gates(operators).*/

    var W = parentConfig.width, H = parentConfig.height;

    var x = operatorConfig.horMargin, y = operatorConfig.vertMargin, w = operatorConfig.icon_width, h = operatorConfig.icon_height;

    n = Math.round((W - x) / (w + x));
    m = Math.round((H - y) / (h + y));

    var coordinates = [];
    var row = 0, col = 0;
    var i;
    for (i = 0; i < noOfIcons; i++) {

        var x_i = (col + 1) * x + col * x;
        var y_i = (row + 1) * y + row * y + 30;
        var alpha = [x_i, y_i];

        coordinates.push(alpha);
        col += 1;

        if (col == n) {
            row += 1;
            col = 0
        }
    }
    return coordinates;
}

function getConfigsForStreams(parentConfig, streamsConfig, noOfStreams) { /* get the coordinates of the position for the labels(streams).*/
    var H = streamsConfig.vertMargin;
    var W = parentConfig.width;

    var h = H //- 30 - noOfStreams * streamsConfig.vertMargin) / noOfStreams;
    var w = (W - 10) * 0.6;
    var coordinates = [];

    for (var i = 0; i < noOfStreams; i++) {

        var x = parentConfig.x + 10;
        var y = parentConfig.y + 30 + i * (h + streamsConfig.vertMargin);
        var obj = {x: x, y: y, height: h, width: w};
        coordinates.push(obj);

    }

    return coordinates;
}

//draw gate's(operator's) icons.

function drawOperators(operators, operatorsConfig, operatorRectConfig) {

    var coordinates = getCoordinatesForOperators(operatorRectConfig, operatorsConfig, operators.length);

    mainLayout.selectAll('image')
        .data(operators)
        .enter()
        .append('g')
        .append('svg:image')
        .attr('xlink:href', function (d) {
           
            return "images/" + d.icon;
        })
        .attr('type', function (d) {
            return d.type;
        })
        .attr('width', operatorsConfig.icon_width)
        .attr('height', operatorsConfig.icon_height)
        .attr('x','4.7%')
        .attr('initial-x','4.7%')
        .attr('y', function (d, i) {
            return coordinates[i][1]+45;

        })
        .attr('initial-y', function (d, i) {
            return coordinates[i][1]+45;

        })
        .call(operatorDrag)
        .append('svg:title')
        .text(function (d, i) {
            return d.type;
        });

}

//draw the label(stream).
function drawStreams(streams, streamsConfig, streamRectConfig) {

    var coordinates = getConfigsForStreams(streamRectConfig, streamsConfig, streams.length);

    var myGroup = mainLayout.selectAll('rect.streams')
        .data(streams)
        .enter()
        .append('g')
        .attr('class', 'streams')
        .call(streamsDrag);


    myGroup.append('rect')
        .attr('stream_name',function (d) {

            return d.connectionName;
        })
        .attr('class', 'streams')
        .style('fill', 'rgba(32,0,32,0.9)')
        .attr('width', '50')
        .attr('height', '30')
		.attr('rx', '3')
        .attr('ry', '3')
        .attr('x','6.5%')
		.attr('y', function (d, i) {
            return coordinates[i].y + 70;
        })
        

    myGroup.append('text')
        .text(function (d, i) {
            var stream_name = streams[i].connectionName;
            if (stream_name.length <= 18) {
                return stream_name;
            }
            return streams[i].connectionName.substr(0, 18) + '...';
        })
        .attr('x', '6.5%')
		.attr('y', function (d, i) {
            return coordinates[i].y + streamsConfig.vertMargin+68;
        })
       
        .attr('width', '30')
        .attr('height', '10')
		.style('fill', 'rgba(252,252,252,0.9)')
        .append('svg:title')
        .text(function (d, i) {
            return streams[i].connectionName;
        });

}

var circleDrag = d3.behavior.drag() /*drag the circle.*/
        .on('dragstart', function () {
            d3.event.sourceEvent.stopPropagation();

        })
        .on('drag', function () {
            var parentGroupId = d3.select(this).select(function () {
                return this.parentNode;
            });
            var grandParent = parentGroupId.select(function () {
                return this.parentNode;
            });

            var drawingGroup = d3.select('#' + grandParent.attr('id'));
            var currentC = d3.select(this);

            dragging = true;
           
            d3.select('#dummyLine')
                .attr('x1', d3.select(this).attr('cx'))
                .attr('y1', d3.select(this).attr('cy'))

            ;

            dummyLine.src = currentC.attr('id');
      

        })
        .on('dragend', function () {

            

            if (selectedCircle != null) {


                dummyLine.target = selectedCircle.id;
                dragging = false;


                var targetNode = d3.select('#' + dummyLine.target);
                var srcNode = d3.select('#' + dummyLine.src);
          

                var group = '#' + (dummyLine.src).split('--')[1];
          
                var line = d3.select(group).append('line')
                        .attr('id', function () {


                            var a = (dummyLine.src).split('--');
                            var b = (dummyLine.target).split('--');
                            if (a[0] == 'nodeRight') {
                                return dummyLine.src + '__' + dummyLine.target;
                            } else {
                                return dummyLine.target + '__' + dummyLine.src;
                            }

                        })
                        .attr('class', function () {
                            var a = (dummyLine.src).split('--');
                            var b = (dummyLine.target).split('--');
                            return 'line ' + a[1] + ' ' + b[1];
                        })
                        .attr('x1', srcNode.attr('cx'))
                        .attr('y1', srcNode.attr('cy'))
                        .attr('x2', targetNode.attr('cx'))
                        .attr('y2', targetNode.attr('cy'))
                        .style('stroke', 'black')
                        .style('stroke-width', '3px')
                        .on('mouseover', function () {
                            d3.select(this).style('stroke-width', '4px');
                        })
                        .on('mouseout', function () {
                            d3.select(this).style('stroke-width', '4px');
                        });
                dummyLine.src = null;
                dummyLine.target = null;
            }
        });