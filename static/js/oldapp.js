function Demographic(Option){
  DemoInfo=d3.select("#sample-metadata");
  d3.json("./data/samples.json").then((data) =>{
    var meta=data.metadata;
    var filterdata=meta.filter(item => item.id== Option)[0];
    console.log(filterdata);
    DemoInfo.html("");
    Object.entries(filterdata).forEach(([key,value])=> {
      DemoInfo.append("option").text(`${key}: ${value}`);
    });
    console.log(filterdata.wfreq);

    //Bonus: Gaug Chart
    var data3 = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: filterdata.wfreq,
        title: { text: "Belly Button Weekly Washing Frequencyeed" },
        type: "indicator",
        mode: "gauge+number",
        gauge: { 
          bar: { color: "purple" },
          borderwidth:0,
          visible:true,
          axis: { range: [null,9], visible:true},
          steps:[
            {range:[0,1], color:"F7FFDC"},
            {range:[1,2], color:"D9FFBF"},
            {range:[2,3], color:"BDFFA4"},
            {range:[3,4], color:"A0E989"},
            {range:[4,5], color:"85CC6F"},
            {range:[5,6], color:"6AB155"},
            {range:[6,7], color:"4F963C"},
            {range:[7,8], color:"337B24"},
            {range:[8,9], color:"136207"}
          ],
          threshold:{
            line: {color:"red", width: 5},
            thickness: 1,
            value:filterdata.wfreq
          }
          
        }
      }
    ];
    
    var layout = { width: 500, height: 400, margin: { t: 3, b: 3 } };
    Plotly.newPlot('gauge', data3, layout);



  });

}

function DrawPlot(Option) {
  d3.json("./data/samples.json").then((data) =>{
    var samples=data.samples;
    var filterdata = samples.filter(item => item.id.toString() === Option)[0];
    console.log(filterdata);
    var sample_values=filterdata.sample_values;
    var otu_ids=filterdata.otu_ids;
    var otu_labels=filterdata.otu_labels;

    //Bar Chart
    var trace1={
      x: sample_values.slice(0,10).reverse(),
      y: otu_ids.slice(0.10).map(id => `OTU ${id}`).reverse(),
      text: otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    };
    var data=[trace1];
    var layout={title: "Top 10 OTU for Test Subject ID: "+ Option};
    Plotly.newPlot("bar", data, layout);

    //Bubble Chart
    var trace2={
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        colorscale: "Viridis",
        size: sample_values
      }
    };
    var layout2={
      title: "Bacteria size per sample",
      xaxis: { title: "OTU ID" + Option },
      showlegend: false,
    };
    var data=[trace2];
    Plotly.newPlot("bubble", data, layout2);


  });
}


function init() {
    var dropdown=d3.select("#selDataset");
    d3.json("./data/samples.json").then(function(data) {
        var SampleName=data.names;
        SampleName.forEach((item) => {
          dropdown.append("option").text(item).property("value", item);
        });
        const FirstOption=SampleName[0];
        DrawPlot(FirstOption);
        Demographic(FirstOption);

    });    
}
        
function optionChanged(Opt){
  DrawPlot(Opt);
  Demographic(Opt);
}

init();
  

