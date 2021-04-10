var dataSet = d3.csv("dataSet.csv"); 
const tableData = dataSet;


function buildPlot(dataSet){
    d3.csv("dataSet.csv").then(function(product){
        
        let productCountCurrentDay = product.filter(product => product.date === "2016-11-25");
        
            var counts = productCountCurrentDay.map(row => row.count); 
            var products = productCountCurrentDay.map(row => row.v2ProductCategory); 
            // var dates = product.map(row => row.date);
            
            // Sort products in descending order 
            var sorted = counts.sort(function(a, b){return a - b}).reverse();
            // var productsSorted = sorted.products; 

            // Slice the top 10 products 
            var sliced = sorted.slice(0, 8);
            // console.log(sliced);
            
            var trace1 = {
                name: "Nov 25, 2016",
                type: "bar", 
                x: products, 
                y: sliced, 
                color: 'rgb(100,64.7,0)'
            }; 
            //*****************************************************************************************
            // d3.csv("dataSetBlackFriday.csv").then(function(productBF){

            //     var countsBF = productBF.map(row => row.count); 
            //     var productsBF = productBF.map(row => row.v2ProductCategory);
            //     var sortedBF = countsBF.sort(function(a, b){return a - b}).reverse();
            //     var slicedBF = sortedBF.slice(0, 10);

            var trace2 = {
                    name: "Nov 25, 2016 - Black Friday",
                    title: "GGG", 
                    type: "bar", 
                    x: products.productCountCurrentDay, 
                    y: sliced, 
                    color: 'rgb(148,0,211)'
            }; 
            // }); 
            // *****************************************************************************************
            var data = [trace1]; 

            var layout = {
                title: "Products' Sites Visited During November 25, 2016 - Black Friday", 
                margin: {
                l: 100, 
                r: 100,
                t: 100, 
                b: 100, 
                yaxis: { title: "No. of Product Visits" }, 
                xaxis: { title: "Product Category" }
                }
            }; 
            Plotly.newPlot("charts", data, layout); 

        
    }); 
}
buildPlot(dataSet); 

// click - event listener
function handleClick() {
    d3.event.preventDefault(); 

    var dates = d3.select("#datetime").property("value"); 
    let filteredData = tableData; 
    console.log(clicked); 

    if (dates) {
        filteredData = Object.values(filteredData).filter(row => row.datetime === dates); 
    }
    buildPlot(filteredData);
}

d3.select("#filter-btn").on("click", handleClick); 

// Use D3 to create an event handler
// d3.select("body").on("change", buildPlot);