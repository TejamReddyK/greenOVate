import React from "react";
import Barchart from "./Barchart";
import Linechart from "./Linechart";  // Assuming you create a Linechart component
import useFetchData from "./useFetchData";

const Results = () => {
  const apiEndPointBar = `${process.env.REACT_APP_API_URL}/api/production/typewise`;
  const apiEndPointLine = `${process.env.REACT_APP_API_URL}/api/demand/`;  // New endpoint for line data
  
  const { data: barData, loading: barLoading, error: barError } = useFetchData(apiEndPointBar);
  const { data: lineData, loading: lineLoading, error: lineError } = useFetchData(apiEndPointLine);

  if (barLoading || lineLoading) return <div>Loading...</div>;
  if (barError || lineError) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Results</h1>
      <div className="charts">
        <div className="chart-align">
          <h3>Hydrogen Production From Different Processes</h3>
          {barData && <Barchart Data={barData} />}
          <p>
          The double grouped bar chart visualizes hydrogen production based on different production processes. The Reforming process, which includes traditional steam methane reforming (SMR), dominates both production capacity (10,091,881.52 tons) and output (7,232,040.09 tons), reflecting its widespread use in the hydrogen industry despite its carbon emissions. By-product hydrogen production, with a capacity of 1,034,701.76 tons and output of 629,074.85 tons, represents hydrogen generated as a by-product in industrial processes, typically from refineries. Water electrolysis, a cleaner and more sustainable method, shows a much smaller capacity (46,193.16 tons) and output (31,411.35 tons), but it's growing as countries transition to green hydrogen. The Reforming (carbon capture) process, with a relatively modest capacity (56,147.67 tons) and output (42,531.61 tons), represents an emerging technology aimed at reducing the carbon footprint of hydrogen production. This data underscores the ongoing shift toward cleaner hydrogen production methods, although conventional methods like reforming still dominate.</p>
        </div>
        <div className="chart-align">
          <h3>Hydrogen Demand By Top Countries</h3>
          {lineData && <Linechart Data={lineData} />}
          <p>
          The double line chart illustrates the hydrogen production trends in several European countries from 2022 to 2023. France demonstrates a stable but slight increase in production, rising from 460,641.54 tons in 2022 to 465,605.68 tons in 2023, suggesting consistent growth. Italy saw a decrease in production, from 578,611.88 tons in 2022 to 507,778.51 tons in 2023, which may reflect shifts in market conditions or production capacity constraints. In contrast, the Netherlands experienced a significant boost in production, jumping from 594,736.05 tons in 2022 to 835,157.87 tons in 2023, indicating a strong expansion in hydrogen production, possibly due to increased investments in green technologies. Norway had a steady increase in production from 145,481.13 tons to 164,331.69 tons, reflecting its commitment to boosting hydrogen output. Meanwhile, Poland and Spain showed slight declines, with Poland's production dropping from 569,009.37 tons to 517,940.16 tons and Spain's from 479,666.03 tons to 475,332.86 tons, pointing to a more stable but slightly diminishing production output in these countries. This chart highlights the dynamic nature of hydrogen production across Europe, with some countries experiencing growth and others facing challenges.</p>
        </div>
      </div>
    </div>
  );
};

export default Results;
