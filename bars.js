

d3.csv("dateProductCount.csv").then(function(product) {
    d3.csv("visitsPerDay.csv").then(function(day) {
        
        console.log(product); 

        let productCountCurrentDay = product.filter(product => product.date === "2016-11-01"); 
        console.log(productCountCurrentDay); 
        
        // ref the button
        var button = d3.select("#filter-btn"); 
        // ref input field
        var userInput = d3.select(".form-control")

        // click - event listener
        function handleClick() {
            d3.event.preventDefault(); 

            var date = d3.select("#datetime").property("value"); 
            let filteredData = data; 

            if (date) {
                filteredData = filteredData.filter(row => row.date === date); 
            }; 
            
        }

        d3.select("#filter-btn").on("click", handleClick); 





        
        //     day = ["2016-11-01", "2016-11-02", "2016-11-03", "2016-11-04", "2016-11-05", "2016-11-06", "2016-11-07", "2016-11-08", 
        // "2016-11-09", "2016-11-10", "2016-11-11", "2016-11-12", "2016-11-13", "2016-11-14", "2016-11-15", "2016-11-16", 
        // "2016-11-17", "2016-11-18", "2016-11-19", "2016-11-20", "2016-11-21", "2016-11-22", "2016-11-23", "2016-11-24", 
        // "2016-11-25", "2016-11-26", "2016-11-27", "2016-11-28", "2016-11-29" , "2016-11-30"]; 

        var trace = {
            x: productCountCurrentDay.map(row => row.count),
            y: productCountCurrentDay.map(row => row.v2ProductCategory),
            text: day.map(row => row.count), 
            name: "Products", 
            type: "bar", 
            color: "#FFA500",
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
        
        Plotly.newPlot("charts", chartData, layout); 
        
    });
}); 