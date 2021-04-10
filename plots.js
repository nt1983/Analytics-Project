d3.csv("../countryPerDateVisits.csv").then(function(data){
  var visits = data.map(row => row.fullVisitorId).count;
  //var hits = visits.slice(0,5).reverse();
  //var hits = data.sort(function(a,b) {
  //  return +a.visits - +b.visits});

  var country = data.map(row => row.country);
// Create the Trace
var trace = {
  x: visits,
  y: country,
  type: "bar",
  orientation: "h"
};

// Create the data array for the plot
var data = [trace];

// Define the plot layout
var layout = {
  title: "Web Hits per Country",
  xaxis: { title: "Visits" },
  yaxis: { title: "countries" }
};

// Plot the chart to a div tag with id "bar-plot"
Plotly.newPlot("bar-plot", data, layout);


});
