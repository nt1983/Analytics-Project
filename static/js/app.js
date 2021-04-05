function Demographic(Option){
    var pie = d3.pie()
     .value(function (d) {
          return d.value;
     }).sort(null)(data);
     var width = 360;
     var height = 360;
     var radius = Math.min(width, height) / 2;
     var donutWidth = 75;
     path = d3.select("#donut")
          .selectAll("path")
          .data(pie); // Compute the new angles
     var arc = d3.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);
     path.transition().duration(500).attr("d", arc); // redrawing the path with a smooth transition
}

function Device_Pie_Chart(Option) {
    ///// Data
    //var totals=[];
    var data=[];
    d3.csv("./data/Nov_devices.csv", function(info) {
        data.push(info.Device_Percentage); 
        
    //console.log(data);
    });

/////////////////////////////////////////////////////////////////////////////////
    console.log(typeof data);
    var width = 300;
    var height = 300;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75; //This is the size of the hole in the middle
    //Only choose one! This one for a d3 color scheme:
    var color = d3.scaleOrdinal().range(["#5A39AC", "#DD98D6", "#E7C820"]);
    var svg = d3.select('#donut')
     .append('svg')
     .attr('width', width)
     .attr('height', height)
     .append('g')
     .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc()
     .innerRadius(radius - donutWidth)
     .outerRadius(radius);
    
     var pie = d3.pie().value(function (d) {
         console.log(d);
          return d;
     });//.sort(null); 


    
    //});

}

function init() {
    var dropdown=d3.select("#selDataset");
    var SampleName=["Whole November", "Black Friday"];
        SampleName.forEach((item) => {
          dropdown.append("option").text(item).property("value", item);
        });
    const FirstOption=SampleName[0];
    Device_Pie_Chart(FirstOption);
}

function optionChanged(Opt){
    Device_Pie_Chart(Opt);
    Demographic(Opt);
  }

init();