
var opsInWorkArea = { /*count the gates in the workspace */
    gates: 0,
    operator: 0
};

var moveGroup = function () {
    var g = d3.select(this);

    var mouse = {dx: d3.event.x, dy: d3.event.y};
    var currentObj = {
        x: currentOp.attr('x'),
        y: currentOp.attr('y'),
        width: currentOp.attr('width'),
        height: currentOp.attr('height')
    };
    var parentObj = {
        x: parent.attr('x'),
        y: parent.attr('y'),
        width: parent.attr('width'),
        height: parent.attr('height')
    };


    g.attr('transform', 'translate(' + d3.event.x + ',' + d3.event.y + ')');

};

var moveOp = function () {

    var elem = d3.select(this);
    elem.attr('x', d3.mouse(this)[0] + 5);
    elem.attr('y', d3.mouse(this)[1] + 5);

};

var moveEnd = function () {

    var elem = d3.select(this);
    var drawingGroup;

    if (selectedObject != null) {

        if (elem.attr('type') == 'and_gate' || 	elem.attr('type') == 'or_gate' || 	elem.attr('type') == 'not_gate' || 	elem.attr('type') == 'nand_gate' || 	elem.attr('type') == 'nor_gate' || 	elem.attr('type') == 'xor_gate' ||	elem.attr('type') == 'xnor_gate') {
				
            drawingGroup = d3.select('#' + selectedObject.id);
            var currGroup = drawingGroup
                    .append('g')
                    .attr('id', function () {
                        opsInWorkArea.gates += 1;
                        return 'gates-' + opsInWorkArea.gates;
                    })
                    .attr('class', 'gates')
                    .on('mouseover', function () {

                        d3.select(this).select(function () {
                            return this.parentNode
                        }).selectAll('.node').style('visibility', 'visible');

                        var g = d3.select(this);
                        selectedQbox = {
                            id: g.attr('id'),
                            cls: g.attr('class')
                        };
                       
					
                    })
                    .on('mouseout', function () {


                        d3.select(this).select(function () {
                            return this.parentNode
                        }).selectAll('.node').style('visibility', 'hidden');


                    })
                   

            var operatorBox = currGroup.append('image') /* 'operatorBox' gives the outline width and height and image of the current gates(operators).*/
                    .attr('class', 'operatorBox') 
                    .attr('width', elem.attr('width') )
                    .attr('height', elem.attr('height') * 2)
                    .attr('x', d3.mouse(this)[0])
                    .attr('y', d3.mouse(this)[1])
                    .attr('xlink:href', elem.attr('href'))
                ;
				
			if(elem.attr('type')=='not_gate')	//Left dot for not_gate
			{
				currGroup
                .append('circle')
                .attr('class', 'node nodeLeft nodeQbox')
                .attr('id', function () {
                    return 'nodeLeft--' + currGroup.attr('id');
                })
                .attr('cx', operatorBox.attr('x'))
                .attr('data-cx', operatorBox.attr('x'))
                .attr('cy', operatorBox.attr('height') / 2 + Number(operatorBox.attr('y')))
                .attr('data-cy', operatorBox.attr('height') / 2 + Number(operatorBox.attr('y')))
                .attr('r', 5)
                .style('fill', 'red')

                .on('mouseover', function () {
                    selectedCircle = {
                        id: d3.select(this).attr('id'),
                        cls: 'nodeLeft'
                    }

                    d3.select(this).attr('r', d3.select(this).attr('r')*2);
                })
                .on('mouseout', function () {
                    d3.select(this).attr('r', d3.select(this).attr('r')*0.5);

                })
                .call(circleDrag)
            ;
				
			}
			else	//Left dot for outer gates
			{
				//dot left top
				currGroup
					.append('circle')
					.attr('class', 'node nodeLeftTop nodeQbox')
					.attr('id', function () {
						return 'nodeLeftTop--' + currGroup.attr('id');
					})
					.attr('cx', operatorBox.attr('x'))
					.attr('data-cx', operatorBox.attr('x'))
					.attr('cy', operatorBox.attr('height') / 2.8 + Number(operatorBox.attr('y')))
					.attr('data-cy', operatorBox.attr('height') / 2.8 + Number(operatorBox.attr('y')))
					.attr('r', 5)
					.style('fill', 'red')

					.on('mouseover', function () {
						selectedCircle = {
							id: d3.select(this).attr('id'),
							cls: 'nodeLeftTop'
						}
						d3.select(this).attr('r', d3.select(this).attr('r')*2);
					})
                .on('mouseout', function () {
                    d3.select(this).attr('r', d3.select(this).attr('r')*0.5);

                })
					.call(circleDrag)
				;
				//dot left bottom
				currGroup
					.append('circle')
					.attr('class', 'node nodeLeftBot nodeQbox')
					.attr('id', function () {
						return 'nodeLeftBot--' + currGroup.attr('id');
					})
					.attr('cx', operatorBox.attr('x'))
					.attr('data-cx', operatorBox.attr('x'))
					.attr('cy', operatorBox.attr('height') *2/ 3 + Number(operatorBox.attr('y')))
					.attr('data-cy', operatorBox.attr('height') *2/ 3 + Number(operatorBox.attr('y')))
					.attr('r', 5)
					.style('fill', 'red')

					.on('mouseover', function () {
						selectedCircle = {
							id: d3.select(this).attr('id'),
							cls: 'nodeLeftBot'
						}
						d3.select(this).attr('r', d3.select(this).attr('r')*2);
					})
                .on('mouseout', function () {
                    d3.select(this).attr('r', d3.select(this).attr('r')*0.5);

                })
					.call(circleDrag)
				;
			}
			//dot right mid
            currGroup
                .append('circle')
                .attr('class', 'node nodeRight nodeQbox')
                .attr('id', function () {
                    return 'nodeRight--' + currGroup.attr('id');
                })
                .attr('cx', Number(operatorBox.attr('x')) + Number(operatorBox.attr('width')))
                .attr('data-cx', Number(operatorBox.attr('x')) + Number(operatorBox.attr('width')))
                .attr('cy', operatorBox.attr('height') / 2 + Number(operatorBox.attr('y')))
                .attr('data-cy', operatorBox.attr('height') / 2 + Number(operatorBox.attr('y')))
                .attr('r', 5)
                .style('fill', 'red')

                .on('mouseover', function () {
                    selectedCircle = {
                        id: d3.select(this).attr('id'),
                        cls: 'nodeRight'
                    }
					d3.select(this).attr('r', d3.select(this).attr('r')*2);
                })
                .on('mouseout', function () {
                    d3.select(this).attr('r', d3.select(this).attr('r')*0.5);

                })
                .call(circleDrag)

            ;

           currGroup.call(d3.behavior.drag()
                .origin(function () {
                    var t = d3.select(this);
                    return {
                        x: t.attr("x") + d3.transform(t.attr("transform")).translate[0],
                        y: t.attr("y") + d3.transform(t.attr("transform")).translate[1]
                    }
                })
                .on('drag', function () {

                    var mouse = {dx: d3.event.x, dy: d3.event.y};
                    var currentObj = {
                        x: operatorBox.attr('x'),
                        y: operatorBox.attr('y'),
                        width: operatorBox.attr('width'),
                        height: operatorBox.attr('height')
                    };
                    var parentObj = {
                        x: drawingGroup.select('rect').attr('x'),
                        y: drawingGroup.select('rect').attr('y'),
                        width: drawingGroup.select('rect').attr('width'),
                        height: drawingGroup.select('rect').attr('height')
                    };


                    var loc = getXY(mouse, currentObj, parentObj);
                    d3.select(this).select('.operatorBox').attr('transform', 'translate(' + loc.x + ',' + loc.y + ')');


                    var g = d3.select(this);

                    g.selectAll('circle')
                        .attr('cx', function () {

                            return parseFloat(d3.select(this).attr('data-cx')) + parseFloat(loc.x);
                        })
                        .attr('cy', function () {

                            return parseFloat(d3.select(this).attr('data-cy')) + parseFloat(loc.y);
                        });

                    var img = d3.select(this).select('image');

                    g.selectAll('.operator').attr('transform', function () {



                        var meX = 0; // Number(d3.select(this).attr("initial-x"));
                        var meY = 0;// Number(d3.select(this).attr("initial-x"));

                        var pX = Number(d3.transform(img.attr("transform")).translate[0]);
                        var pY = Number(d3.transform(img.attr("transform")).translate[1]);

                        return 'translate(' + (meX+pX) + ',' + (meY+pY) + ')';

                    });

                    d3.selectAll('.line')[0].forEach(function (el) {


                        var parent_id = g.attr('id')
                        var line = d3.select(el)

                       
                        if(line.attr('id') != 'dummyLine'){
                            var nodeType = line.attr('id').split("__");  // id tells us if the line is connected to the left or right node
                            var operators = line.attr('class').split(" ");  // class holds info on what operators the line is connected to

                            var sourceCircleId = nodeType[0].split("--")[0] + '--' + operators[1];
                            var targetCircleId = nodeType[1].split("--")[0] + '--' + operators[2];

                            if (parent_id == operators[1] || parent_id == operators[2]) {  // the line is connected to the operator we are moving

                                var x1 = d3.select('#' + sourceCircleId).attr('cx');
                                var y1 = d3.select('#' + sourceCircleId).attr('cy');
                                var x2 = d3.select('#' + targetCircleId).attr('cx');
                                var y2 = d3.select('#' + targetCircleId).attr('cy');
								

                                line.attr('x1', x1)
                                line.attr('y1', y1)
                                line.attr('x2', x2)
                                line.attr('y2', y2)
                            }
                        }
                    });
                }))
			}
		}

    elem.attr('x', elem.attr('initial-x'));
    elem.attr('y', elem.attr('initial-y'));

}

var operatorDrag = d3.behavior.drag().on('drag', moveOp).on('dragend', moveEnd);
