  // (By Luan)A function that create / update the plot for a given variable:
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



/**
 * d3.tip
 * Copyright (c) 2013 Justin Palmer
 *
 * Tooltips for d3.js SVG visualizations
 */
// eslint-disable-next-line no-extra-semi
;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module with d3 as a dependency.
      define([
        'd3-collection',
        'd3-selection'
      ], factory)
    } else if (typeof module === 'object' && module.exports) {
      /* eslint-disable global-require */
      // CommonJS
      var d3Collection = require('d3-collection'),
          d3Selection = require('d3-selection')
      module.exports = factory(d3Collection, d3Selection)
      /* eslint-enable global-require */
    } else {
      // Browser global.
      var d3 = root.d3
      // eslint-disable-next-line no-param-reassign
      root.d3.tip = factory(d3, d3)
    }
  }(this, function(d3Collection, d3Selection) {
    // Public - contructs a new tooltip
    //
    // Returns a tip
    return function() {
      var direction = d3TipDirection,
          offset    = d3TipOffset,
          html      = d3TipHTML,
          node      = initNode(),
          svg       = null,
          point     = null,
          target    = null
  
      function tip(vis) {
        svg = getSVGNode(vis)
        if (!svg) return
        point = svg.createSVGPoint()
        document.body.appendChild(node)
      }
  
      // Public - show the tooltip on the screen
      //
      // Returns a tip
      tip.show = function() {
        var args = Array.prototype.slice.call(arguments)
        if (args[args.length - 1] instanceof SVGElement) target = args.pop()
  
        var content = html.apply(this, args),
            poffset = offset.apply(this, args),
            dir     = direction.apply(this, args),
            nodel   = getNodeEl(),
            i       = directions.length,
            coords,
            scrollTop  = document.documentElement.scrollTop ||
              document.body.scrollTop,
            scrollLeft = document.documentElement.scrollLeft ||
              document.body.scrollLeft
  
        nodel.html(content)
          .style('opacity', 1).style('pointer-events', 'all')
  
        while (i--) nodel.classed(directions[i], false)
        coords = directionCallbacks.get(dir).apply(this)
        nodel.classed(dir, true)
          .style('top', (coords.top + poffset[0]) + scrollTop + 'px')
          .style('left', (coords.left + poffset[1]) + scrollLeft + 'px')
  
        return tip
      }
  
      // Public - hide the tooltip
      //
      // Returns a tip
      tip.hide = function() {
        var nodel = getNodeEl()
        nodel.style('opacity', 0).style('pointer-events', 'none')
        return tip
      }
  
      // Public: Proxy attr calls to the d3 tip container.
      // Sets or gets attribute value.
      //
      // n - name of the attribute
      // v - value of the attribute
      //
      // Returns tip or attribute value
      // eslint-disable-next-line no-unused-vars
      tip.attr = function(n, v) {
        if (arguments.length < 2 && typeof n === 'string') {
          return getNodeEl().attr(n)
        }
  
        var args =  Array.prototype.slice.call(arguments)
        d3Selection.selection.prototype.attr.apply(getNodeEl(), args)
        return tip
      }
  
      // Public: Proxy style calls to the d3 tip container.
      // Sets or gets a style value.
      //
      // n - name of the property
      // v - value of the property
      //
      // Returns tip or style property value
      // eslint-disable-next-line no-unused-vars
      tip.style = function(n, v) {
        if (arguments.length < 2 && typeof n === 'string') {
          return getNodeEl().style(n)
        }
  
        var args = Array.prototype.slice.call(arguments)
        d3Selection.selection.prototype.style.apply(getNodeEl(), args)
        return tip
      }
  
      // Public: Set or get the direction of the tooltip
      //
      // v - One of n(north), s(south), e(east), or w(west), nw(northwest),
      //     sw(southwest), ne(northeast) or se(southeast)
      //
      // Returns tip or direction
      tip.direction = function(v) {
        if (!arguments.length) return direction
        direction = v == null ? v : functor(v)
  
        return tip
      }
  
      // Public: Sets or gets the offset of the tip
      //
      // v - Array of [x, y] offset
      //
      // Returns offset or
      tip.offset = function(v) {
        if (!arguments.length) return offset
        offset = v == null ? v : functor(v)
  
        return tip
      }
  
      // Public: sets or gets the html value of the tooltip
      //
      // v - String value of the tip
      //
      // Returns html value or tip
      tip.html = function(v) {
        if (!arguments.length) return html
        html = v == null ? v : functor(v)
  
        return tip
      }
  
      // Public: destroys the tooltip and removes it from the DOM
      //
      // Returns a tip
      tip.destroy = function() {
        if (node) {
          getNodeEl().remove()
          node = null
        }
        return tip
      }
  
      function d3TipDirection() { return 'n' }
      function d3TipOffset() { return [0, 0] }
      function d3TipHTML() { return ' ' }
  
      var directionCallbacks = d3Collection.map({
            n:  directionNorth,
            s:  directionSouth,
            e:  directionEast,
            w:  directionWest,
            nw: directionNorthWest,
            ne: directionNorthEast,
            sw: directionSouthWest,
            se: directionSouthEast
          }),
          directions = directionCallbacks.keys()
  
      function directionNorth() {
        var bbox = getScreenBBox()
        return {
          top:  bbox.n.y - node.offsetHeight,
          left: bbox.n.x - node.offsetWidth / 2
        }
      }
  
      function directionSouth() {
        var bbox = getScreenBBox()
        return {
          top:  bbox.s.y,
          left: bbox.s.x - node.offsetWidth / 2
        }
      }
  
      function directionEast() {
        var bbox = getScreenBBox()
        return {
          top:  bbox.e.y - node.offsetHeight / 2,
          left: bbox.e.x
        }
      }
  
      function directionWest() {
        var bbox = getScreenBBox()
        return {
          top:  bbox.w.y - node.offsetHeight / 2,
          left: bbox.w.x - node.offsetWidth
        }
      }
  
      function directionNorthWest() {
        var bbox = getScreenBBox()
        return {
          top:  bbox.nw.y - node.offsetHeight,
          left: bbox.nw.x - node.offsetWidth
        }
      }
  
      function directionNorthEast() {
        var bbox = getScreenBBox()
        return {
          top:  bbox.ne.y - node.offsetHeight,
          left: bbox.ne.x
        }
      }
  
      function directionSouthWest() {
        var bbox = getScreenBBox()
        return {
          top:  bbox.sw.y,
          left: bbox.sw.x - node.offsetWidth
        }
      }
  
      function directionSouthEast() {
        var bbox = getScreenBBox()
        return {
          top:  bbox.se.y,
          left: bbox.se.x
        }
      }
  
      function initNode() {
        var div = d3Selection.select(document.createElement('div'))
        div
          .style('position', 'absolute')
          .style('top', 0)
          .style('opacity', 0)
          .style('pointer-events', 'none')
          .style('box-sizing', 'border-box')
  
        return div.node()
      }
  
      function getSVGNode(element) {
        var svgNode = element.node()
        if (!svgNode) return null
        if (svgNode.tagName.toLowerCase() === 'svg') return svgNode
        return svgNode.ownerSVGElement
      }
  
      function getNodeEl() {
        if (node == null) {
          node = initNode()
          // re-add node to DOM
          document.body.appendChild(node)
        }
        return d3Selection.select(node)
      }
  
      // Private - gets the screen coordinates of a shape
      //
      // Given a shape on the screen, will return an SVGPoint for the directions
      // n(north), s(south), e(east), w(west), ne(northeast), se(southeast),
      // nw(northwest), sw(southwest).
      //
      //    +-+-+
      //    |   |
      //    +   +
      //    |   |
      //    +-+-+
      //
      // Returns an Object {n, s, e, w, nw, sw, ne, se}
      function getScreenBBox() {
        var targetel   = target || d3Selection.event.target
  
        while (targetel.getScreenCTM == null && targetel.parentNode == null) {
          targetel = targetel.parentNode
        }
  
        var bbox       = {},
            matrix     = targetel.getScreenCTM(),
            tbbox      = targetel.getBBox(),
            width      = tbbox.width,
            height     = tbbox.height,
            x          = tbbox.x,
            y          = tbbox.y
  
        point.x = x
        point.y = y
        bbox.nw = point.matrixTransform(matrix)
        point.x += width
        bbox.ne = point.matrixTransform(matrix)
        point.y += height
        bbox.se = point.matrixTransform(matrix)
        point.x -= width
        bbox.sw = point.matrixTransform(matrix)
        point.y -= height / 2
        bbox.w = point.matrixTransform(matrix)
        point.x += width
        bbox.e = point.matrixTransform(matrix)
        point.x -= width / 2
        point.y -= height / 2
        bbox.n = point.matrixTransform(matrix)
        point.y += height
        bbox.s = point.matrixTransform(matrix)
  
        return bbox
      }
  
      // Private - replace D3JS 3.X d3.functor() function
      function functor(v) {
        return typeof v === 'function' ? v : function() {
          return v
        }
      }
  
      return tip
    }
  // eslint-disable-next-line semi
  }));
  
  /////////////////////////////////////////////////////////////////
  function draw_map(Option, file) {
  const format = d3.format(',');
      
      // Set tooltips
      const tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(d => `<strong>Country: </strong><span class='details'>${d.properties.name}<br></span><strong>NovemberVisits: </strong><span class='details'>${format(d.population)}</span>`);
      
      const margin = {top: 0, right: 0, bottom: 0, left: 0};
      const width1 = 960 - margin.left - margin.right;
      const height1 = 500 - margin.top - margin.bottom;
      
      const color = d3.scaleThreshold()
        .domain([
          20,
          70,
          150,
          400,
          1000,
          6000,
          12000,
          16000,
          20000,
          30500
        ])
        .range([
          'rgb(0,191,255)',
          'rgb(30,144,255)', 
          'rgb(100,149,237)', 
          'rgb(70,130,180)',
          'rgb(106,90,205)',
          'rgb(65,105,225)',
          'rgb(0,0,255)',
          'rgb(0,0,205)',
          'rgb(0,0,128)',
          'rgb(25,25,112)'
        ]);
      
      const svg = d3.select('#map')
        .append('svg')
        .attr('width', width1)
        .attr('height', height1)
        .append('g');
      
      const projection = d3.geoRobinson()
        .scale(148)
        .rotate([352, 0, 0])
        .translate( [width1 / 2, height1 / 2]);
      
      const path = d3.geoPath().projection(projection);
      
      svg.call(tip);
      
      Promise.all([
        d3.json('./static/data/world_countries.json'),
        d3.tsv (file)
      ]).then(
        d => ready(null, d[0], d[1])
      );
      
      function ready(error, data, population) {
        const populationById = {};
      
        population.forEach(d => { populationById[d.id] = +d.population; });
        data.features.forEach(d => { d.population = populationById[d.id] });
      
        svg.append('g')
          .attr('class', 'countries')
          .selectAll('path')
          .data(data.features)
          .enter().append('path')
            .attr('d', path)
            .style('fill', d => color(populationById[d.id]))
            .style('stroke', 'white')
            .style('opacity', 0.8)
            .style('stroke-width', 0.3)
            // tooltips
            .on('mouseover',function(d){
              tip.show(d);
              d3.select(this)
                .style('opacity', 1)
                .style('stroke-width', 3);
            })
            .on('mouseout', function(d){
              tip.hide(d);
              d3.select(this)
                .style('opacity', 0.8)
                .style('stroke-width',0.3);
            });
  
      
        svg.append('path')
          .datum(topojson.mesh(data.features, (a, b) => a.id !== b.id))
          .attr('class', 'names')
          .attr('d', path);
      }
  
  }

////////////////////////////////////////////////////////////////////////

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
            return d.Visit_Count+50;
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
        
        //Black Friday Dot
        if (Option==="Black Friday") {
            var data=[{Visit_Date: 1480060800001, Visit_Count: 3702, eve:"Black Friday"},
                {Visit_Date: 1480320000001, Visit_Count: 4722, eve:"Cyber Monday"}];
            console.log(Option);
            console.log(data);
            var path1 = svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 5)
            .attr("cx", function (d) {
            return x(d.Visit_Date);
            })
            .attr("cy", function (d) {
                return y(d.Visit_Count);
            })
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("fill", "red")
            .attr("r", 10)
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                .duration('300')
                .attr("r", 10);
                div.transition()
                .duration('300')
                .style("opacity", 1);
                div.html(d.eve+ "<br/>"+ "Visitors: "+ d.Visit_Count)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px");
            });
        }
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
    //read data from csv
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
    const donut_ref_file1="./static/data/Nov_devices.csv";
    Device_Pie_Chart(FirstOption, donut_ref_file1);
    const bar_ref_file1="./static/data/Nov_Month_Visits.csv";
    visits_bar_chart(FirstOption, bar_ref_file1);
    const map_file1="./static/data/Nov_Month_Countries.tsv";
    draw_map(FirstOption, map_file1);
    //const browser_file1="./static/data/cleaned_data.csv";
  //   d3.csv("./static/data/cleaned_data.csv", function(error, data){
  //     console.log(data);
  //     d3.select("#my_data").selectAll("*").remove();
  //     update("Total_Visitors_wholemonth");
      
  // });

}

function optionChanged(Opt){
    d3.select("#donut").selectAll("*").remove();
    d3.select("#scatter").selectAll("*").remove();
    d3.selectAll("#map").selectAll("*").remove();
    //d3.select("#my_data").selectAll("*").remove();
    if (Opt=="Whole November") {
        const donut_ref_file2="./static/data/Nov_devices.csv";
        Device_Pie_Chart(Opt, donut_ref_file2);
        const bar_ref_file2="./static/data/Nov_Month_Visits.csv";
        visits_bar_chart(Opt, bar_ref_file2);
        const map_file2="./static/data/Nov_Month_Countries.tsv";
        draw_map(Opt, map_file2);
        //update("Total_Visitors_wholemonth");
    }
    else {
        const donut_ref_file2="./static/data/BlackFriday_devices.csv";
        Device_Pie_Chart(Opt, donut_ref_file2);
        const bar_ref_file2="./static/data/Nov_Month_Visits.csv";
        visits_bar_chart(Opt, bar_ref_file2);
        const map_file2="./static/data/bf_Countries.tsv";
        draw_map(Opt, map_file2);
        //update("Total_Visitors_on_BlackFriday");
    }

  }

init();