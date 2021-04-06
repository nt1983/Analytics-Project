
d3.csv("dateProductCount.csv").then(function(data) {
    

        console.log(data); 
        
        var trace = {
            y: data.map(row => row.v2ProductCategory),
            x: data.map(row => row.date),
            text: data.map(row => row.count), 
            name: "Products", 
            type: "bar", 
            color: "#89CFF0",
            orientation: "h"
        }; 
        
        var chartData = [trace]; 
        
        var layout = {
            title: "Products Sold During November 2016", 
            margin: {
                l: 100, 
                r: 100,
                t: 100, 
                b: 100
            }
        }

        Plotly.newPlot("productsBar", chartData, layout); 
  
}); 

// // filter the days according to entered date value
// var button = d3.select('#filter-btn');

// // reference the input field 
// var userInput = d3.select('.form-control');

// // click function 
// function handleClick() {
    
//     // prevent the page from refreshing 
//     d3.event.preventDefault();

//     var date = d3.select('#datetime').property('value'); 
//     let filteredData = data; 

//     if (date) {
//         filteredData = filteredData.filter(row => row.date === date);
//         };
//     buildTable(filteredData);
// }

// d3.selectAll('#filter-btn').on('click', handleClick);
// buildTable(data);
