function buildMetadata(sample) {
  var MetaData = `/metadata/$(sample)`;
  d3.json(MetaData).then(function(response){

  var panelData = d3.select("#sample-metadata");
  panelData.html("");

  var data = Object.entries(response);
  data.for(function(item)){
    panelData.append("div").text(item);
  });
  })
}



function buildCharts(sample) {
  var sampleData = `/samples/${sample}`;

  d3.json(sampleData).then(function(response){
    var topTenSampleValues = response.sample_values.slice(0,10);
    var topOtuLables = response.otu_labels.slice(0,10);
    var topTenOtuIds = response.otu_ids.slice(0,10);

    var data = [{
      "values": topTenSampleValues,
      "labels": topTenOtuIds,
      "hovertext": topOtuLables,
      "type": pie
    }];

    Plotly.newPlot("pie",data);

    23

  })


}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
