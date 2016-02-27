
var moveStream = function () {
    var g = d3.select(this);
    g.attr('transform', 'translate(' + (d3.event.x + 50) + ',' + (d3.event.y + 50) + ')');
}; /* 'moveStream' take the selected object(each label) and transform the object in x+50(pixel) and y+50(pixel) */


var moveStreamEnd = function () { /* label drag and drop, then do drag in the workspace.*/

    var t = d3.select(this);
    var rect = t.select('rect');
    var text = t.select('text');
    var title = t.select('title');

    if (selectedObject != null && d3.select('#' + rect.attr('stream_name')).empty()) {
        var drawingGroup = d3.select('#' + selectedObject.id);

		//Menu for the label stream
        createFormStream('menubar', rect.attr('stream_name'));
       // $('form.stream').hide();
        $('table#' + rect.attr('stream_name')).show();
    
		
		//Table 
		 createTableStream('output', rect.attr('stream_name'));
       // $('table.stream').hide();
        $('table#' + rect.attr('stream_name')).show();
         
		

        var currentGroup = drawingGroup
            .append('g')
            .attr('class', 'stream')
            .attr('tx', d3.transform(t.attr('transform')).translate[0])
            .attr('ty', d3.transform(t.attr('transform')).translate[1])
            .attr('id', rect.attr('stream_name'))
            .on('mouseover', function () {

                d3.select(this).select(function () {
                    return this.parentNode
                }).selectAll('.node').style('visibility', 'visible');

            })
            .on('mouseout', function () {

                d3.select(this).select(function () {
                    return this.parentNode
                }).selectAll('.node').style('visibility', 'visible');
            })

//**************************
.on('mouseout', function () {

                    d3.select(this).select(function () {
                        return this.parentNode
                    }).selectAll('.node').style('visibility', 'hidden');

                })
				
                .call(d3.behavior.drag()
                    .origin(function () {
                        var t = d3.select(this);

                        return {
                            x: t.attr("x") + d3.transform(t.attr("transform")).translate[0],
                            y: t.attr("y") + d3.transform(t.attr("transform")).translate[1]
                        }
                    })
                    .on('drag', function () {


                        var t = d3.select(this);
                        var tx = Number(d3.transform(t.attr('transform')).translate[0]);
                        var ty = Number(d3.transform(t.attr('transform')).translate[1]);

                        var mouse = {dx: d3.event.x, dy: d3.event.y};
                        var currentObj = {
                            x: d3.select(this).select('rect').attr('x'),
                            y: d3.select(this).select('rect').attr('y'),
                            width: d3.select(this).select('rect').attr('width'),
                            height: d3.select(this).select('rect').attr('height')
                        };
                        var parentObj = {
                            x: drawingGroup.select('rect').attr('x'),
                            y: drawingGroup.select('rect').attr('y'),
                            width: drawingGroup.select('rect').attr('width'),
                            height: drawingGroup.select('rect').attr('height')
                        };


                        var loc = getXY(mouse, currentObj, parentObj);

                        d3.select(this).select('rect').attr('transform', 'translate(' + loc.x + ',' + loc.y + ')');

                        d3.select(this).select('text')
                            .attr('x', function () {
                                return Number(d3.select(this).attr('initial-x')) + Number(loc.x);
                            })
                            .attr('y', function () {
                                return Number(d3.select(this).attr('initial-y')) + Number(loc.y);
                            });

                        d3.select(this).selectAll('circle')
                            .attr('cx', function () {
                                return Number(d3.select(this).attr('data-cx')) + Number(loc.x);
                            })
                            .attr('cy', function () {
                                return Number(d3.select(this).attr('data-cy')) + Number(loc.y);
                            });

                        var g = d3.select(this);
                        var parent_id = g.select(function () {
                            return this.parentNode;
                        }).attr('id');

                        d3.selectAll('.line')[0].forEach(function (el) {


                            var parent_id = g.attr('id')
                            var line = d3.select(el)

                            if(line.attr('id') != 'dummyLine'){
                                var nodeType = line.attr('id').split("__");  // id tells us if the line is connected to the left or right node
                                var operators = line.attr('class').split(" ");  // class holds info on what operators the line is connected to

                                console.log('NODE TYPE : ', nodeType);

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
                    })

            )//**********************
        ;

        var dx = Number(d3.transform(t.attr('transform')).translate[0]) + Number(d3.mouse(this)[0]);
        var dy = Number(d3.transform(t.attr('transform')).translate[1]) + Number(d3.mouse(this)[1]);

        //label after drag
        var r = currentGroup
                .append('rect')
                .attr('x', dx)
                .attr('y', dy)
				.attr('rx', '3')
                .attr('ry', '3')
                .attr('width', rect.attr('width'))
                .attr('height', rect.attr('height'))
                .style('fill', 'rgba(80,0,0,1)')
            ;

        currentGroup
            .append('text')
            .attr('x', dx)
            .attr('initial-x', dx )
            .attr('y', dy+18)
            .attr('initial-y', dy +18)
			.style('fill', 'rgba(255,255,255,0.9)')
            .attr('width', text.attr('width'))
            .attr('height', text.attr('height'))
            .text(function () {
                var stream_name = title.text();
                if (stream_name.length <= 18) {
                    return stream_name;
                }
                return stream_name.substr(0, 18) + '...';
            })
        ;


       
//*******************

 //*******************************
  currentGroup
            .append('circle')
            .attr('class', 'node nodeLeft')
            .attr('id', function () {
                return 'nodeLeft--' + currentGroup.attr('id');
            })
            .attr('cx', r.attr('x'))
            .attr('data-cx', r.attr('x'))
            .attr('cy', r.attr('height') / 2 + Number(r.attr('y')))
            .attr('data-cy', r.attr('height') / 2 + Number(r.attr('y')))
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

        currentGroup
            .append('circle')
            .attr('class', 'node nodeRight')
            .attr('id', function () {
                return 'nodeRight--' + currentGroup.attr('id');
            })
            .attr('cx', Number(r.attr('x')) + Number(r.attr('width')))
            .attr('data-cx', Number(r.attr('x')) + Number(r.attr('width')))
            .attr('cy', r.attr('height') / 2 + Number(r.attr('y')))
            .attr('data-cy', r.attr('height') / 2 + Number(r.attr('y')))
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
    }

//********************************
    t.attr('transform', 'translate(0,0)');
};

var streamsDrag = d3.behavior.drag() 
        .origin(function () {
            var t = d3.select(this);

            return {
                x: t.attr("x") + d3.transform(t.attr("transform")).translate[0],
                y: t.attr("y") + d3.transform(t.attr("transform")).translate[1]
            }
        }
    )
        .on('drag', moveStream)
        .on('dragend', moveStreamEnd)
    ;