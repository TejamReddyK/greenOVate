import React, { useEffect, useRef } from "react";
import * as d3 from "d3";


const Linechart = ({Data}) => {
  const chartRef = useRef(null);

  // const Data = [
  //   {
  //     country: "France",
  //     year_22: 460641.54246,
  //     year_23: 465605.68473000004,
  //   },
  //   {
  //     country: "Italy",
  //     year_22: 578611.877188,
  //     year_23: 507778.508341,
  //   },
  //   {
  //     country: "Netherlands",
  //     year_22: 594736.04859,
  //     year_23: 835157.87366,
  //   },
  //   {
  //     country: "Norway",
  //     year_22: 145481.13364199997,
  //     year_23: 164331.690149,
  //   },
  //   {
  //     country: "Poland",
  //     year_22: 569009.3693,
  //     year_23: 517940.16254999995,
  //   },
  //   {
  //     country: "Spain",
  //     year_22: 479666.02756579994,
  //     year_23: 475332.859525,
  //   },
  // ];

  useEffect(() => {
    // Dimensions and margins
    const width = 500;
    const height = 400;
    const margin = { top: 30, right: 80, bottom: 100, left: 80 };

    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    // SVG container
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(Data.map((d) => d.country))
      .range([0, width - margin.left - margin.right])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(Data, (d) => Math.max(d.year_22, d.year_23))])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    // Line generator for year_22
    const line22 = d3
      .line()
      .x((d) => xScale(d.country) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.year_22));

    // Line generator for year_23
    const line23 = d3
      .line()
      .x((d) => xScale(d.country) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.year_23));

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-25)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(yScale));

    // Add grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-width + margin.left + margin.right)
          .tickFormat("")
      )
      .selectAll(".tick line")
      .attr("stroke-opacity", 0.1);

    // Add year_22 line
    svg
      .append("path")
      .datum(Data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line22);

    // Add year_23 line
    svg
      .append("path")
      .datum(Data)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("d", line23);

    // Add legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - margin.right - 150}, 10)`);

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "steelblue");

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text("Year 2022")
      .attr("font-size", "12px")
      .attr("alignment-baseline", "middle");

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 20)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "orange");

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 32)
      .text("Year 2023")
      .attr("font-size", "12px")
      .attr("alignment-baseline", "middle");
  }, [Data]);

  return <div ref={chartRef}></div>;
};

export default Linechart;
