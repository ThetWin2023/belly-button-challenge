/*
Data Analytics and Visualization Bootcamp - University of Toronto
Name: Thet Win
Data: August 14, 2024
Module 14 Challenge - Belly Button Bio diversity

This project uses D3.js and Plotly.js libraries to create an interactive dashboard and explore the Belly Button Biodiversity database.
*/


// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metaData = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let resultArr = metaData.filter(sampleObj => sampleObj.id == sample);
    let res = resultArr[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    let entries = Object.entries(result);
    for (let entry of entries) {
      let key = entry[0];
      let value = entry[1];
      panel.append("p").text(`${key.toUpperCase()}: ${value}`)
    }
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sampleData = data.samples;

    // Filter the samples for the object with the desired sample number
    let resultArr = sampleData.filter(sampleObj => sampleObj.id == sample);
    let res = resultArr[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = res.otu_ids;
    let otu_labels = res.otu_labels;
    let sample_values = res.sample_values;

    // Build a Bubble Chart
    let bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
      }
    }];

    let bubbleLayout = {
      title: 'Bacteria Cultures Sample',
      xaxis: {title:'OTU'},
      yaxis: {title:'Number of Bacteria'},
    };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    // Build a Bar Chart using Plotly
    let barData = [{
      y: yticks,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    }];

    let barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: {title: 'Number of Bacteria'},
    };

    // Render the Bar Chart
    Plotly.newPlot('bar', barData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Get the first sample from the list
    let firstSample = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();