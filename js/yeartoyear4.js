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

