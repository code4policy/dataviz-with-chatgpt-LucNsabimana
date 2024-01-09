document.addEventListener('DOMContentLoaded', function() {
    // Sample data for the top 10 reasons, replace with your actual data
    const topTenData = [
        { reason: "Enforcement & Abandoned Vehicles", count: 61541 },
        { reason: "Sanitation", count: 59389 },
        { reason: "Street Cleaning", count: 45659 },
        { reason: "Highway Maintenance", count: 25096 },
        { reason: "Code Enforcement", count: 31812 },
        { reason: "Recycling", count: 9955 },
        { reason: "Trees", count: 10390 },
        { reason: "Signs & Signals", count: 11209 },
        { reason: "Park Maintenance & Safety", count: 7932 },
        { reason: "Needle Program", count: 7413 }
        // ... add additional data if necessary
    ];

    // Set dimensions and margins for the graph
    const margin = { top: 50, right: 20, bottom: 60, left: 250 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Append SVG object to the body of the page
    const svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3.scaleLinear()
                .domain([0, d3.max(topTenData, d => d.count)])
                .range([0, width]);

    svg.append("g")
       .attr("transform", `translate(0,${height})`)
       .call(d3.axisBottom(x));

    // Y axis
    const y = d3.scaleBand()
                .range([height, 0])
                .domain(topTenData.map(d => d.reason))
                .padding(0.1);

    svg.append("g")
       .call(d3.axisLeft(y));

    // Bars
    svg.selectAll(".bar")
       .data(topTenData)
       .enter()
       .append("rect")
       .attr("class", "bar")
       .attr("x", 0)
       .attr("y", d => y(d.reason))
       .attr("width", d => x(d.count))
       .attr("height", y.bandwidth())
       .attr("fill", "#8e44ad"); // Purple bars

    // Headline
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", -20)
       .attr("text-anchor", "middle")
       .style("font-size", "20px")
       .style("font-weight", "bold")
       .text("Boston's 311 Service Requests: Top 10 Issues");

    // Sub-headline
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", 0)
       .attr("text-anchor", "middle")
       .style("font-size", "16px")
       .text("Highlighting the most reported civic concerns in 2023");

    // Attribution at the bottom
    svg.append("text")
       .attr("class", "attribution")
       .attr("x", width)
       .attr("y", height + 40) // Positioned below the x-axis
       .style("text-anchor", "end")
       .style("font-size", "12px")
       .text("The coolest J-Term Class");
});
