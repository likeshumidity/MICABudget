function drawLineChart() {
  var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = $('#mainContent').width() - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

  var x = d3.scale.linear()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var color = d3.scale.category10();

  var line = d3.svg.line()
    .interpolate("linear")
    .x(function(d) { return x(d.period); })
    .y(function(d) { return y(d.amount); });

  var svg = d3.select(".linechart-yeartoyear").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//  data = summarizeByPeriod(filteredData);
  data = [
    {'name': '2015 - YEP', 'values':
      {'period': '1', 'amount': '120'},
      {'period': '2', 'amount': '130'},
      {'period': '3', 'amount': '140'},
      {'period': '4', 'amount': '110'}
    },
    {'name': '2015 - ACTUALS', 'values':
      {'period': '1', 'amount': '15'},
      {'period': '2', 'amount': '20'},
      {'period': '3', 'amount': '30'},
      {'period': '4', 'amount': '10'}
    }
  ];

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'period'; }));

  x.domain(d3.extent(data, function(d) { console.log(d); return d.period; }));
asdfads
  y.domain([
      0,
      d3.max(data, function(d) { return d.amount;})
    ]);

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
    .style("text-anchor", "end")
    .text("$, in thousands");

  var year = svg.selectAll(".year")
    .data(years)
    .enter().append("g")
    .attr("class", "year");

  year.append("path")
    .attr("class", "line")
    .attr("d", function(d) { return line(d.values); })
    .style("stroke", function(d) { return color(d.name); });

  year.append("text")
    .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
    .attr("transform", function(d) { return "translate(" + x(d.value.period) + "," + y(d.value.amount) + ")"; })
    .attr("x", 3)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });
  });
}

$(document).ready(function () {
  filterData();
  drawLineChart();
});

$(window).resize(function() {
  $('.linechart-yeartoyear').html('');
  drawLineChart();
});

function summarizeByPeriod(unsummarized) {
//  var summarized = unsummarized.map(
  return unsummarized;
}


/*
  alert('test');
d3.data(filteredData, function(error, data) {
//  if (error) throw error;
  alert('test');
console.log(data);
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
//    d.date = parseDate(d.date);
  });

  var years = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, amount: +d[name]};
      })
    };
  });
*/

//    d3.min(years, function(c) { return d3.min(c.values, function(v) { return v.amount; }); }),
//    d3.min(years, function(c) { return 0; }),
//    d3.max(years, function(c) { return d3.max(c.values, function(v) { return v.amt; }); })
