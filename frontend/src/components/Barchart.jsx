import React, { useEffect, useRef } from "react";
import * as d3 from "d3";


const Barchart = ({Data}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Chart dimensions and margins
    const width = 500;
    const height =400;
    const margin = { top: 30, right: 80, bottom: 100, left: 80 };

    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define the subcategories (grouped bars)
    const subcategories = ["productionCapacity", "output"];

    // Define scales
    const x0 = d3
      .scaleBand()
      .domain(Data.map((d) => d.typeWise)) // Main categories
      .range([0, width - margin.left - margin.right])
      .padding(0.2);

    const x1 = d3
      .scaleBand()
      .domain(subcategories) // Subcategories
      .range([0, x0.bandwidth()])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(Data, (d) => Math.max(d.productionCapacity, d.output)),
      ])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    // Define color scale
    const color = d3
      .scaleOrdinal()
      .domain(subcategories)
      .range(["#4e79a7", "#f28e2b"]);

    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x0))
      .selectAll("text")
      .attr("transform", "rotate(-25)")
      .style("text-anchor", "end");

    // Add y-axis
    svg.append("g").call(d3.axisLeft(y));

    // Add grouped bars
    svg
      .selectAll("g.group")
      .data(Data)
      .join("g")
      .attr("class", "group")
      .attr("transform", (d) => `translate(${x0(d.typeWise)},0)`)
      .selectAll("rect")
      .data((d) =>
        subcategories.map((key) => ({
          key,
          value: d[key],
        }))
      )
      .join("rect")
      .attr("x", (d) => x1(d.key))
      .attr("y", (d) => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => y(0) - y(d.value))
      .attr("fill", (d) => color(d.key));

    // Add legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - margin.right - 150}, 0)`);

    legend
      .selectAll("rect")
      .data(subcategories)
      .join("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * 20)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", (d) => color(d));

    legend
      .selectAll("text")
      .data(subcategories)
      .join("text")
      .attr("x", 20)
      .attr("y", (d, i) => i * 20 + 12)
      .text((d) => d)
      .attr("font-size", "12px")
      .attr("alignment-baseline", "middle");
  }, [Data]);

  return <div ref={chartRef}></div>;
};

export default Barchart;
