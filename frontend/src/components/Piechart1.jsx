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
      .value((d) => d.productionCapacity);

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
          `${d.data.typeWise}: ${d.data.productionCapacity}`
      );

    // Create the legend group
    const legend = svg
      .append("g")
      .attr("transform", `translate(-${width / 2 - 150}, -${height / 2 + 50})`);

    // Calculate total productionCapacity for percentage calculation
    const totalProductionCapacity = d3.sum(Data, (d) => d.productionCapacity);

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
        const percentage = ((d.productionCapacity / totalProductionCapacity) * 100).toFixed(4);
        return `${d.typeWise}: ${percentage}%`;
      })
      .attr("font-size", "10px")
      .attr("alignment-baseline", "bottom");
  }, [Data]);

  return <div ref={chartRef}></div>;
};

export default Piechart1;
