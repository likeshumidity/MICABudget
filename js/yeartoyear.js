/* implementation heavily influenced by http://bl.ocks.org/1166403 */

/*
function updateContent() {
  // define dimensions of graph
var m = [80, 80, 80, 80]; // margins
var w = 1000 - m[1] - m[3]; // width
var h = 400 - m[0] - m[2]; // height

// create a simple data array that we'll plot with a line (this array
// represents only the Y values, X will just be the index location)
var data = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2,
1, 3, 8, 9, 2, 5, 9, 2, 7];
//
// X scale will fit all values from data[] within pixels 0-w
var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
// Y scale will fit values from 0-10 within pixels h-0 (Note the inverted
// domain for the y-scale: bigger is up!)
var y = d3.scale.linear().domain([0, 10]).range([h, 0]);
// automatically determining max range can work something like this
// var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);
//
// create a line function that can convert data[] into x and y points
var line = d3.svg.line()
// assign the X function to plot our line as we wish
.x(function(d,i) { 
// verbose logging to show what's actually being done
console.log('Plotting X value for data point: ' + d + ' using index: ' + i +
' to be at: ' + x(i) + ' using our xScale.');
// return the X coordinate where we want to plot this datapoint
return x(i); 
})
.y(function(d) { 
// verbose logging to show what's actually being done
console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) +
" using our yScale.");
// return the Y coordinate where we want to plot this datapoint
return y(d); 
})
//
// Add an SVG element with the desired dimensions and margin.
var graph = d3.select(".linechart-yeartoyear").append("svg:svg")
.attr("width", w + m[1] + m[3])
.attr("height", h + m[0] + m[2])
.append("svg:g")
.attr("transform", "translate(" + m[3] + "," + m[0] + ")");
//
// create yAxis
var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
// Add the x-axis.
graph.append("svg:g")
.attr("class", "x axis")
.attr("transform", "translate(0," + h + ")")
.call(xAxis);
//
//
// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
// Add the y-axis to the left
graph.append("svg:g")
.attr("class", "y axis")
.attr("transform", "translate(-25,0)")
.call(yAxisLeft);
//
// Add the line by appending an svg:path element with the data line we
//created above
// do this AFTER the axes above so that the line is above the tick-lines
graph.append("svg:path").attr("d", line(data));
//
}
*/

$(document).ready(function () {
  updateContent();
});

function updateContent() {
  filterData();
  $('.linechart-yeartoyear').html('');
  data = convertForLine(filteredData);

  var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = $('#mainContent').width() - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var color = d3.scale.category20();

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var line = d3.svg.line()
    .x(function(d) { return x(d.period);})
    .y(function(d) {return y(d.value);})
    .interpolate("linear");

  var svg = d3.select(".linechart-yeartoyear").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  color.domain(data.map(function (d) { return d.series; }));

  data.forEach(function (kv) {
    kv.values.forEach(function (d) {
      d.value = +d.value; 
    });
  });


  var minY = d3.min(data, function (kv) { return d3.min(kv.values, function (d) { return d.value; }) });
  var maxY = d3.max(data, function (kv) { return d3.max(kv.values, function (d) { return d.value; }) });

  x.domain(data[0].values.map(function (d) { return d.period; }));
  y.domain([0, 1.3*(maxY)]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(-" + margin.left +"," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('$ in thousands');

  var series = svg.selectAll(".branch")
    .data(data)
    .enter().append("g")
    .attr("class", "branch");

  series.append("path")
    .attr("class", "line")
    .attr("d", function (d) {
      return line(d.values);
    })
    .style("stroke", function (d) {
      return color(d.series);
    })
    .style("fill", "none");

  series.append('text')
    .datum(function(d) { return { name: d.year, value: d.values[d.values.length - 1]}; })
    .attr('transform', function(d) { return 'translate(' + x(d.value.period) + "," + y(d.value.value) + ")"; })
    .attr('x', 3)
    .attr('dy', '.35em')
    .text(function(d) { return d.name; });
}

function convertForLine(inData) {
  var series = [];
  var periods = [];
  var outData = [];

  for (i = 0; i < inData.length; i++) {
    if ($.inArray(inData[i].year, series) < 0) {
      series.push(inData[i].year);
    }
    if ($.inArray(inData[i].period, periods) < 0) {
      periods.push(inData[i].period);
    }
  }

  for (i = 0; i < series.length; i++) {
    var holdingObj = {
      'series': series[i],
      'values': []
    };
    for (j = 0; j < periods.length; j++) {
      var holdingObj2 = {'period': periods[j], 'value': 0.0};
      holdingObj.values.push(holdingObj2);
    }
    outData.push(holdingObj);
  }

  for (i = 0; i < inData.length; i++) {
    for (j = 0; j < outData.length; j++) {
      if (inData[i].year == outData[j].series) {
        for (k = 0; k < outData[j].values.length; k++) {
          if (inData[i].period == outData[j].values[k].period) {
            outData[j].values[k].value += parseFloat(inData[i].amount);
          }
        }
      }
    }
  }

  return outData;
}
/*
*/

