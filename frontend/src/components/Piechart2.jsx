// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// const Piechart2 = ({ Data }) => {
//   const chartRef = useRef();

//   useEffect(() => {
//     const width = 300;
//     const height = 300;
//     const radius = Math.min(width, height) / 2;

//     // Clear previous chart
//     d3.select(chartRef.current).selectAll("*").remove();

//     // Create SVG container
//     const svg = d3
//       .select(chartRef.current)
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height)
//       .append("g")
//       .attr("transform", `translate(${width / 2},${height / 2})`);

//     // Create color scale
//     const color = d3
//       .scaleOrdinal()
//       .domain(Data.map((d) => d.typeWise))
//       .range(d3.schemeCategory10);

//     // Pie and arc generators
//     const pie = d3
//       .pie()
//       .sort(null)
//       .value((d) => d.output); // Use 'output' for the pie value

//     const arc = d3
//       .arc()
//       .innerRadius(radius * 0.5) // Donut hole size
//       .outerRadius(radius - 10);

//     const arcLabel = d3
//       .arc()
//       .innerRadius(radius * 0.6)
//       .outerRadius(radius * 0.6);

//     // Add arcs
//     svg
//       .selectAll("path")
//       .data(pie(Data))
//       .join("path")
//       .attr("fill", (d) => color(d.data.typeWise))
//       .attr("d", arc)
//       .append("title")
//       .text(
//         (d) =>
//           `${d.data.typeWise}: ${d.data.output.toLocaleString()}`
//       );

//     // Add percentage labels on the pie chart
//     svg
//       .selectAll("text")
//       .data(pie(Data))
//       .join("text")
//       .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
//       .attr("text-anchor", "middle")
//       .attr("font-size", 10)
//       .text((d) => {
//         const percent = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100;
//         return `${percent.toFixed(1)}%`; // Display percentage
//       });

//     // Add legend at the bottom horizontally
//     const legend = svg
//       .append("g")
//       .attr("transform", `translate(-${width / 2}, ${height / 2 + 30})`);

//     legend
//       .selectAll("rect")
//       .data(Data)
//       .join("rect")
//       .attr("x", (d, i) => i * 70)  // Spacing out horizontally
//       .attr("y", 0)
//       .attr("width", 15)
//       .attr("height", 15)
//       .attr("fill", (d) => color(d.typeWise));

//     legend
//       .selectAll("text")
//       .data(Data)
//       .join("text")
//       .attr("x", (d, i) => i * 70 + 20) // Align text horizontally next to the color block
//       .attr("y", 12)
//       .text((d) => d.typeWise)
//       .attr("font-size", "12px")
//       .attr("alignment-baseline", "middle");
//   }, [Data]);

//   return <div ref={chartRef}></div>;
// };

// export default Piechart2;

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Piechart1 = ({ Data }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Dimensions
    const width = 600;
    const height = 400;
    const radius = Math.min(width - 250, height - 100) / 2;

    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create color scale
    const color = d3
      .scaleOrdinal()
      .domain(Data.map((d) => d.typeWise))
      .range(d3.schemeCategory10);

    // Pie and arc generators
    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.output);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.5) // Donut hole size
      .outerRadius(radius - 10);

    // Add arcs (pie slices)
    svg
      .selectAll("path")
      .data(pie(Data))
      .join("path")
      .attr("fill", (d) => color(d.data.typeWise))
      .attr("d", arc)
      .append("title")
      .text(
        (d) =>
          `${d.data.typeWise}: ${d.data.output}`
      );

    // Create the legend group
    const legend = svg
      .append("g")
      .attr("transform", `translate(-${width / 2 - 150}, -${height / 2 + 50})`);

    // Calculate total productionCapacity for percentage calculation
    const totalOutput = d3.sum(Data, (d) => d.output);

    legend
      .selectAll("rect")
      .data(Data)
      .join("rect")
      .attr("x", +325)
      .attr("y", (d, i) => i * 12 + 100) // Adjusted spacing for legend
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", (d) => color(d.typeWise));

    legend
      .selectAll("text")
      .data(Data)
      .join("text")
      .attr("x", 340)
      .attr("y", (d, i) => i * 12 + 108)
      .text((d) => {
        // Calculate percentage for each typeWise
        const percentage = ((d.output / totalOutput) * 100).toFixed(4);
        return `${d.typeWise}: ${percentage}%`;
      })
      .attr("font-size", "10px")
      .attr("alignment-baseline", "bottom");
  }, [Data]);

  return <div ref={chartRef}></div>;
};

export default Piechart1;
