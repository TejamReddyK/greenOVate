import React from "react";
import Piechart1 from "./Piechart1"
import Piechart2 from "./Piechart2"
import useFetchData from "./useFetchData";

const Summary = () => {

  const apiEndpoint =`${process.env.REACT_APP_API_URL}/api/production/countrywise`;
const {data, loading, error} = useFetchData(apiEndpoint);
if(loading) return <div>Loading...</div>
if(error) return <div>Error fetching data</div>
  return (
    <div>
      <h1>Summary</h1>
      <div className="charts">
        <div className="chart-align">
          <h3>Hydrogen Production Capacity Country-wise</h3>
          {data && <Piechart1 Data={data} />}
          <p>
          The above chart visualizes the hydrogen production capacity across various European countries. Notably, Germany leads with a substantial production capacity of 1,982,896.35 tons, followed by France with 916,760.62 tons, indicating their dominant role in Europe's hydrogen infrastructure. Countries like the Netherlands (1,479,788.02 tons) and Poland (1,181,524.95 tons) also contribute significantly to the region's capacity, suggesting a growing commitment to renewable energy in these nations. On the other hand, smaller nations such as Estonia (26.82 tons) and Slovenia (2.76 tons) have comparatively minimal capacities, reflecting their limited hydrogen production capabilities. This disparity highlights how larger European nations are making strides toward clean energy, while smaller countries face challenges in scaling up their hydrogen production infrastructure. A large gap exists between the production capacity of top producers like Germany and others in Eastern Europe, which could impact the overall hydrogen market in Europe.</p>
        </div>
        <div className="chart-align">
          <h3>Actual Hydrogen Production Output</h3>
          {data && <Piechart2 Data={data} />}
          <p>This chart represents the hydrogen output of different European countries. Germany again outshines with the highest output of 1,395,063.96 tons, which aligns with its significant production capacity. France and the Netherlands also demonstrate robust outputs of 549,199.34 tons and 1,158,329.81 tons, respectively, reinforcing their roles as key players in hydrogen production. Countries like Finland (182,514.06 tons) and Belgium (428,733.38 tons) showcase strong output figures, highlighting their investment in hydrogen technology and commitment to meeting clean energy targets. However, countries like Slovenia (1,819.10 tons) and Estonia (18.24 tons) show much lower outputs, consistent with their smaller production capacities. This suggests that while some nations are advancing quickly in both production and output, others are still in the early stages of developing their hydrogen infrastructure, potentially limiting their ability to meet future energy demands effectively.</p>
        </div>
      </div>
    </div>

  );
};

export default Summary;
