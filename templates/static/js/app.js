function visits_bar_chart(Option, file){
    d3.csv(file).then(function (dataframe){
        console.log(dataframe);
        data=dataframe;
        console.log(data);

        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        }
        var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
        default_width = 700 - margin.left - margin.right;
        default_height = 500 - margin.top - margin.bottom;
        default_ratio = default_width / default_height;

        //set size
        current_width = window.innerWidth;
        current_height = window.innerHeight;
        current_ratio = current_width / current_height;
        if (current_ratio > default_ratio) {
            h = default_height;
            w = default_width;
            // mobile
        } else {
            margin.left = 40
            w = current_width - 40;
            h = w / default_ratio;
        };
        width = w - 50 - margin.right;
        height = h - margin.top - margin.bottom;


        data.forEach(function (d){
            ParseDate=d3.timeParse("%Y-%m-%d");
            d.Visit_Date=ParseDate(d.Visit_Date);
            d.Visit_Count= +d.Visit_Count;
        });

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        x.domain(d3.extent(data, function (d) {
            return d.Visit_Date++;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.Visit_Count++;
        })]);
        //define line
        var valueline = d3.line()
        .x(function (d) {
            return x(d.Visit_Date);
        })
        .y(function (d) {
            return y(d.Visit_Count);
        });

        // append svg to body
        var svg = d3.select("#scatter").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
        
        //trendline
        svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline)
        .attr("stroke", "#5A39AC")
        .attr("stroke-width", 2)
        .attr("fill", "#FFFFFF");

        // Add the points
        var path = svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function (d) {
            return x(d.Visit_Date);
        })
        .attr("cy", function (d) {
            return y(d.Visit_Count);
        })
        .attr("stroke", "#5A39AC")
        .attr("stroke-width", 1.5)
        .attr("fill", "#FFFFFF")
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
            .duration('100')
            .attr("r", 7);
            div.transition()
            .duration('100')
            .style("opacity", 1);
            div.html(d.Visit_Count)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
            .duration('200')
            .attr("r", 5);
            div.transition()
            .duration('200')
            .style("opacity", 0);
        });
        if (width < 500) {
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(5));
        } else {
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));
        }
        
        svg.append("g")
            .call(d3.axisLeft(y).tickFormat(function (d) {
                return (d)
        }));




        });
    
}

function Device_Pie_Chart(Option,file) {  
    //read data from json
    d3.csv(file).then(function (data){
        console.log(data);
        dataset=data;
    //});
    
    var width = 300;
    var height = 300;
    var margin = 5;
    var radius = Math.min(width, height) / 2-margin;
    var donutWidth = 75; //This is the size of the hole in the middle
    
    var donutTip = d3.select("body").append("div")
    .attr("class", "donut-tip")
    .style("background", "lightgray")
    .style("opacity", 0);
    var color = d3.scaleOrdinal().range(["#5A39AC", "#DD98D6", "#08B2B2"]);

    var svg = d3.select('#donut')
     .append('svg')
     .attr('width', width)
     .attr('height', height)
     .append('g')
     .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc().innerRadius(radius - donutWidth).outerRadius(radius);
    
    var pie = d3.pie().value(function (d) {
        return d.Device_Percentage;
    }).sort(null);
    //var data_ready = pie(d3.entries(info))

    var path = svg.selectAll('path')
     .data(pie(dataset))
     .enter()
     .append('path')
     .attr('d', arc)
     .attr('fill', function (d, i) {
          return color(d.data.Device_Name);
     })
          .attr('transform', 'translate(0, 0)')
          .on('mouseover', function (d, i) {
              d3.select(this).transition()
                  .duration('50')
                  .attr('opacity', '.85');
              donutTip.transition()
                  .duration(50)
                  .style("opacity", 1);
              let num = (d.data.Device_Percentage) + '%';
              donutTip.html(num)
                  .style("left", (d3.event.pageX + 10) + "px")
                  .style("top", (d3.event.pageY - 15) + "px");                  
      
          })
          .on('mouseout', function (d, i) {
              d3.select(this).transition()
                  .duration('50')
                  .attr('opacity', '1');
              donutTip.transition()
                  .duration('50')
                  .style("opacity", 0);
          });

    var legendRectSize = 13;
    var legendSpacing = 7;

    var legend = svg.selectAll('.legend') //the legend and placement
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'circle-legend')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = height * color.domain().length / 2;
        var horz = -2 * legendRectSize - 13;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

    legend.append('circle') //keys
    .style('fill', color)
    .style('stroke', color)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', '.5rem');

    legend.append('text') //labels
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) {
     return d;
});
});
}

function init() {
    var dropdown=d3.select("#selDataset");
    var SampleName=["Whole November", "Black Friday"];
        SampleName.forEach((item) => {
          dropdown.append("option").text(item).property("value", item);
        });
    const FirstOption=SampleName[0];
    const donut_ref_file1="/templates/static/data/Nov_devices.csv";
    Device_Pie_Chart(FirstOption, donut_ref_file1);

    const bar_ref_file1="/templates/static/data/Nov_Month_Visits.csv";
    visits_bar_chart(FirstOption, bar_ref_file1);

}

function optionChanged(Opt){
    d3.select("#donut").selectAll("*").remove();
    if (Opt=="Whole November") {
        const donut_ref_file2="/templates/static/data/Nov_devices.csv";
        
        Device_Pie_Chart(Opt, donut_ref_file2);
    }
    else {
        const donut_ref_file2="/templates/static/data/BlackFriday_devices.csv";
        Device_Pie_Chart(Opt, donut_ref_file2);
    }
    //Device_Pie_Chart(Opt, donut_ref_file2);
    //Demographic(Opt);
  }

init();