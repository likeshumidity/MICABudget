// Set global variables
var units = "k USD";
var width = 0;
var height = 0;

function updateContent() {
  filterData();
  $('.sankey-flow').html('');

  margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = $('#mainContent').width() - margin.left - margin.right,
  height = $('body').height() - margin.top - margin.bottom;

  if (height > 1000) {
    height = 1000;
  }

  var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scale.category20();

// append the svg canvas to the page
var svg = d3.select(".sankey-flow").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([width, height]);

var path = sankey.link();

// change to d3.data(jsonvariable, function...
// load the data (using the timelyportfolio csv method)
d3.csv("data/sankey.csv", function(error, data) {

  data = [];
  data = loadSankeyData();
  //set up graph in same style as original example but empty
  graph = {"nodes" : [], "links" : []};
    data.forEach(function (d) {
      graph.nodes.push({ "name": d.source });
      graph.nodes.push({ "name": d.target });
      graph.links.push({ "source": d.source,
                         "target": d.target,
                         "value": +d.value });
     });

     // return only the distinct / unique nodes
     graph.nodes = d3.keys(d3.nest()
       .key(function (d) { return d.name; })
       .map(graph.nodes));

     // loop through each link replacing the text with its index from node
     graph.links.forEach(function (d, i) {
       graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
       graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
     });

     //now loop through each nodes to make nodes an array of objects
     // rather than an array of strings
     graph.nodes.forEach(function (d, i) {
       graph.nodes[i] = { "name": d };
     });

  sankey
    .nodes(graph.nodes)
    .links(graph.links)
    .layout(32);

// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
  link.append("title")
        .text(function(d) {
    		return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });

// add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
		  return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { 
		  this.parentNode.appendChild(this); })
      .on("drag", dragmove));

// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { 
		  return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { 
		  return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) { 
		  return d.name + "\n" + format(d.value); });

// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

// the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr("transform", 
        "translate(" + d.x + "," + (
                d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
            ) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
});
}

var sankeyData = [];
updateContent();

$(window).resize(function() {
  $('.sankey-flow').html('');
  updateContent();
});

function loadSankeyData() {
  var fundList = [];
  var deptList = [];
  var acctList = [];

  sankeyData = [];

  for (i = 0; i < filteredData.length; i++) {
    if ($.inArray(filteredData[i].acct, acctList) < 0) {
      acctList.push(filteredData[i].acct);
    }
    if ($.inArray(filteredData[i].dept, deptList) < 0) {
      deptList.push(filteredData[i].dept);
    }
    if ($.inArray(filteredData[i].fund, fundList) < 0) {
      fundList.push(filteredData[i].fund);
    }
  }

  for (i = 0; i < fundList.length; i++) {
    for (j = 0; j < deptList.length; j++) {
      var subTotal = 0;

      for (k = 0; k < filteredData.length; k++) {
        if (filteredData[k].fund == fundList[i]
            && filteredData[k].dept == deptList[j]) {
          subTotal += parseFloat(filteredData[k].amount);
        }
      }

      if (subTotal > 0) {
        var objHolder = {
          'source': fundList[i],
          'target': deptList[j],
          'value': String(subTotal)
        };

        sankeyData.push(objHolder);
      }
    }
  }

  for (i = 0; i < acctList.length; i++) {
    for (j = 0; j < deptList.length; j++) {
      var subTotal = 0;

      for (k = 0; k < filteredData.length; k++) {
        if (filteredData[k].acct == acctList[i]
            && filteredData[k].dept == deptList[j]) {
          subTotal += parseFloat(filteredData[k].amount);
        }
      }

      if (subTotal > 0) {
        var objHolder = {
          'source': deptList[j],
          'target': acctList[i],
          'value': String(subTotal)
        };

        sankeyData.push(objHolder);
      }
    }
  }

  return sankeyData;
}

