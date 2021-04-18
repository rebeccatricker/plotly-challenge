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
