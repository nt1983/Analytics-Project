  // A function that create / update the plot for a given variable:
  function update(selectedVar) {
  var margin = {top: 30, right: 30, bottom: 70, left: 100},
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#my_data")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Initialize the X axis
    var x = d3.scaleBand()
      .range([ 0, width ])
      .padding(1);
    var xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")

    // Initialize the Y axis
    var y = d3.scaleLinear()
      .range([ height, 0]);
    var yAxis = svg.append("g")
      .attr("class", "myYaxis")


    var chartGroup = svg;

    // Parse the Data
    d3.csv("./static/data/cleaned_data.csv").then(function(browserdata) {

      // X axis
      x.domain(browserdata.map(function(d) { return d.Browser_Name; }))
      xAxis.transition().duration(1000).call(d3.axisBottom(x))

      // Add Y axis
      y.domain([0, d3.max(browserdata, function(d) { return +d[selectedVar] }) ]);
      yAxis.transition().duration(1000).call(d3.axisLeft(y));

      // variable u: map data to existing circle
      var j = svg.selectAll(".myLine")
        .data(browserdata)
      // update lines
      j
        .enter()
        .append("line")
        .attr("class", "myLine")
        .merge(j)
        .transition()
        .duration(1000)
          .attr("x1", function(d) { console.log(x(d.Browser_Name)) ; return x(d.Browser_Name); })
          .attr("x2", function(d) { return x(d.Browser_Name); })
          .attr("y1", y(0))
          .attr("y2", function(d) { return y(d[selectedVar]); })
          .attr("stroke", "grey")


      // variable u: map data to existing circle
      var u = svg.selectAll("circle")
        .data(browserdata)
      // update bars
      u
        .enter()
        .append("circle")
        .merge(u)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return x(d.Browser_Name); })
          .attr("cy", function(d) { return y(d[selectedVar]); })
          .attr("r", 8)
          .attr("fill", "#69b3a2");
      var toolTip = d3.tip()
          .attr("class", "tooltip")
          .offset([80, -60])
          .html(function(d) {
            return (`<br>Number of Visitors: ${d.selectedVar}<br>`);
          });
    
        // Create tooltip in the chart
        // ==============================
      chartGroup.call(toolTip);
    
        // Create event listeners to display and hide the tooltip
        // ==============================
        u.on("click", function(data) {
          toolTip.show(data, this);
        })
            // onmouseout event
          .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });
    
        // Create axes labels
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 30)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Number of Visitors");
    
      chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .attr("class", "axisText")
        .text("Browser Name");
    }).catch(function(error) {
        console.log(error);
    });

  

  }
  update("Total_Visitors_wholemonth");

function init() {
  var dropdown=d3.select("#selDataset");
  var SampleName=["Whole November", "Black Friday"];
      SampleName.forEach((item) => {
        dropdown.append("option").text(item).property("value", item);
      });
  const FirstOption=SampleName[0];
  d3.csv("New_data_csv/cleaned_data.csv", function(error, data){
      console.log(data);
      if (FirstOption == "Whole November") {
        update("Total_Visitors_wholemonth");
      }
  });


}

function optionChanged(Opt){
  d3.select("#my_data").selectAll("*").remove();

    if (Opt=="Whole November") {
        
      update("Total_Visitors_wholemonth");
    }
    else {
        
      update("Total_Visitors_on_BlackFriday");
    }

}

init();
