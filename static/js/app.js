


function init() {
    var dropdown=d3.select("#selDataset");
    d3.csv("clean_main_data.csv").then(function(data) {
        for (i=0;i<data.length;i++){
        console.log(data[i].visitId);
        }
    });
}

init();