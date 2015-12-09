var data = [
{
  "label": "2016",
  "values": [
  { "day": "1", "value": 180},
  { "day": "2", "value": 182},
  { "day": "3", "value": 0},
  { "day": "4", "value": 0}
  ]
}
]
var margin = {
  top: 20,
  right: 80,
  bottom: 30,
  left: 50
},
  width = 895 - margin.left - margin.right,
  height = 355 - margin.top - margin.bottom;

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
  .x(function(d) { return x(d.day);})
  .y(function(d) {return y(d.value);})
  .interpolate("linear");

  var svg = d3.select(".linechart-yeartoyear").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  color.domain(data.map(function (d) { return d.label; }));

  data.forEach(function (kv) {
    kv.values.forEach(function (d) {
      d.value = +d.value; 
    });
  });


var minY = d3.min(data, function (kv) { return d3.min(kv.values, function (d) { return d.value; }) });
var maxY = d3.max(data, function (kv) { return d3.max(kv.values, function (d) { return d.value; }) });

x.domain(data[0].values.map(function (d) { return d.day; }));
y.domain([0, 1.3*(maxY)]);

svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);

svg.append("g")
.attr("class", "y axis")
.call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end");

  var city = svg.selectAll(".branch")
  .data(data)
  .enter().append("g")
  .attr("class", "branch");

  city.append("path")
  .attr("class", "line")
  .attr("d", function (d) {
    return line(d.values);
  })
.style("stroke", function (d) {
  return color(d.label);
})
.style("fill", "none");

$(document).ready(function () {
  filterData();
  console.log(filteredData);
  updateContent();
});

function updateContent() {
  var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = $('#mainContent').width() - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width])
    .domain(d3.range(1,5));

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var color = d3.scale.category20b();

  var line = d3.svg.line()
    .interpolate('linear')
    .x(function(d) { return x(d.key); })
    .y(function(d) {
      console.log(d.values);
      return y(d.amount);
    });

  var svg = d3.select(".linechart-yeartoyear").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data = convertForLine(filteredData);

  color.domain(d3.keys(data[0]).filter(function(key) { return key == 'year'; }));

  data = d3.nest()
    .key(function(d) { return d.year; })
    .sortKeys(d3.ascending)
    .entries(data);

  y.domain([0, d3.max(data, function(d) {
    return d3.max(d.values, function (d) {
      return d.amount;
    });
  })]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

  var years = svg.selectAll(".year")
    .data(data, function(d) { return d.key; })
    .enter().append('g')
    .attr('class', 'year');

  years.append('path')
    .attr('class', 'line')
    .attr('d', function(d) { console.log(line(d.values)); return line(d.values); })
    .style('stroke', function(d) { return color(d.key); });

  console.log(data);
  console.log('done');
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
    for (j = 0; j < periods.length; j++) {
      holdingObj = {
        'year': series[i],
        'period': periods[j],
        'amount': 0.0
      };
      outData.push(holdingObj);
    }
  }

  for (i = 0; i < inData.length; i++) {
    for (j = 0; j < outData.length; j++) {
      if (inData[i].year == outData[j].year && inData[i].period == outData[j].period) {
        outData[j].amount += parseFloat(inData[i].amount);
      }
    }
  }

  console.log(toString(outData));
  return outData;
}

