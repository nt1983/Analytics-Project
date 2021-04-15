var margin = {top: 50, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");


// Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
// var xBandScale = d3.scaleBand()
//   .domain(tvData.map(d => d.name))
//   .range([0, chartWidth])
//   .padding(0.1);

// Create a linear scale for the vertical axis.
// var yLinearScale = d3.scaleLinear()
// .domain([0, d3.max(tvData, d => d.hours)])
// .range([chartHeight, 0]);


//     var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom"); 

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     .tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Hits:</strong> <span style='color:red'>" + d.count + "</span>";
  })

var svg = d3.select("#product").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.csv("./static/data/dataSetBlackFriday.csv").then(function(data) {

  var x = d3.scaleBand()
    .domain(data.map(d => d.v2ProductCategory))
    .range([0, width]);

    console.log(data); 

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => parseInt(d.count))])
    .range([height, 0]);


  var bottomAxis = d3.axisBottom(x);
  var leftAxis = d3.axisLeft(y);

  // console.log(data); 

  // x.domain(data.map(function(d) { return d.v2ProductCategory; }));
  // y.domain([0, d3.max(data, function(d) { return d.count; })]);
  
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + 500 + ")")
      .call(bottomAxis)
    .append("text")
      .text("Products")
      .attr("x", 6);
      // .attr("dy", "2");

  svg.append("g")
      .attr("class", "y axis")
      .call(leftAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", function(d, i) { return i * 15 + 5 })
      // .attr("dy", "1")
      .style("text-anchor", "end")
      .text("Products' Searched");


      // .attr('y', function(d, i) { return i * 15 + 5 })


  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.v2ProductCategory); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(parseInt(d.count)); })
      .attr("height", function(d) { return height - y(parseInt(d.count)); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)



      
      


});

// function type(d) {
//   d.count = +d.count;
//   return d;
// }