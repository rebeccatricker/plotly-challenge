console.log("app.js loaded")

// Create a function for the metadata of a given sample
function createMetadata(id) {

    // Read in the json data
    d3.json("./samples.json").then((data) => {

        console.log(data);

        // Filter the data to get the sample's metadata
        var sampleMetadata = data.metadata;
        console.log(sampleMetadata);

        var sample = sampleMetadata.filter(item => item.id == id);
        console.log(sample[0]);

        // Specify the location of the metadata and update it
        var metadata = d3.select("#sample-metadata").html("");

        Object.entries(sample[0]).forEach(([key, value]) => {
            metadata.append("p").text(`${key}: ${value}`);
        });

        console.log(metadata);
    });
}

// Create a function that will create charts for given sample
function createCharts(id) {

    // Read in the json data
    d3.json("./samples.json").then((data) => {

        // Filter the data to get the sample's OTU data
        var sampleMetadata = data.samples;
        console.log(sampleMetadata);

        var sampleDict = sampleMetadata.filter(item => item.id == id)[0];
        console.log(sampleDict);

        var sampleValues = sampleDict.sample_values; 
        var barChartValues = sampleValues.slice(0, 10).reverse();
        console.log(barChartValues);

        var idValues = sampleDict.otu_ids;
        var barChartLabels = idValues.slice(0, 10).reverse();
        console.log(barChartLabels);

        var reformattedLabels = [];
        barChartLabels.forEach((label) => {
            reformattedLabels.push("OTU " + label);
        });

        console.log(reformattedLabels);

        var labels = sampleDict.otu_labels.slice(0,10);

        // Create bargraph

        var barChartTrace = {
            type: "bar",
            y: reformattedLabels,
            x: barChartValues,
            text: labels,
            orientation: 'h'
        };

        var barChartData = [barChartTrace];

        Plotly.newPlot("bar", barChartData);

        // Create bubble chart in correct location

        var bubbleChartTrace = {
            x: idValues,
            y: sampleValues,
            text: labels,
            mode: "markers",
            marker: {
                color: idValues,
                size: sampleValues
            }
        };

        var bubbleChartData = [bubbleChartTrace];

        var layout = {
            height: 600,
            width: 1000,
            xaxis: {
                title: "OTU ID"
            }
        };

        Plotly.newPlot("bubble", bubbleChartData, layout);
    });
}

// Create function for the change event
function optionChanged(newSelection) {
    // Update metadata
    createMetadata(newSelection); 
    // Update charts
    createCharts(newSelection);
}

// Define function that will run on page load
function init() {

    // Populate the dropdown 
    var selector = d3.select("#selDataset");

    // Read json data
    d3.json("./samples.json").then((data) => {

        // Filter data to get sample names
        var sampleNames = data.names;

        sampleNames.forEach((sampleId) => {
            selector.append("option").property("value", sampleId).text(sampleId);
        });

        // Use first sample to build metadata and initial plots
        createMetadata(sampleNames[0]);
        createCharts(sampleNames[0]);

    });
}

init();