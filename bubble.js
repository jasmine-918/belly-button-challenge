<script>
      
        const jsonURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

        
        function createBubbleChart(data) {
            const trace = {
                x: data.otu_ids,
                y: data.sample_values,
                text: data.otu_labels,
                mode: 'markers',
                marker: {
                    size: data.sample_values,
                    color: data.otu_ids,
                    colorscale: 'Earth',
                    opacity: 0.7
                }
            };

            const layout = {
                title: 'Bubble Chart',
                xaxis: {
                    title: 'OTU IDs'
                },
                yaxis: {
                    title: 'Sample Values'
                }
            };

            const dataToPlot = [trace];

            Plotly.newPlot('bubble-chart', dataToPlot, layout);
        }

       
        function displaySampleMetadata(metadata) {
            const metadataContainer = document.getElementById("sample-metadata");
            metadataContainer.innerHTML = ""; // Clear previous content

            for (const key in metadata) {
                if (metadata.hasOwnProperty(key)) {
                    metadataContainer.innerHTML += `<strong>${key}:</strong> ${metadata[key]}<br>`;
                }
            }
        }

        
        function updateDashboard(selectedValue, data) {
            const selectedData = data.samples.find(sample => sample.id === selectedValue);
            createBubbleChart(selectedData);
            const selectedMetadata = data.metadata.find(sample => sample.id === parseInt(selectedValue));
            displaySampleMetadata(selectedMetadata);
        }

        
        d3.json(jsonURL).then(data => {
            const dropdown = document.getElementById("sampleDropdown");

            data.names.forEach(name => {
                const option = document.createElement("option");
                option.value = name;
                option.text = name;
                dropdown.appendChild(option);
            });

            
            const initialSample = data.names[0];
            updateDashboard(initialSample, data);

           
            dropdown.addEventListener("change", function () {
                const selectedValue = this.value;
                updateDashboard(selectedValue, data);
            });
        }).catch(error => {
            console.error("Error loading data:", error);
        });
    </script>