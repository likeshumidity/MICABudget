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

  var color = d3.scale.category20b();

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
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
/*
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");
*/

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

