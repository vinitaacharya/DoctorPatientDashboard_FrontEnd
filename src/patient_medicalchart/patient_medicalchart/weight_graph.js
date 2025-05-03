import React from 'react';
import Plot from 'react-plotly.js';
import { useSurveyData } from './Survey_context';

const WeightGraph = () => {
  const { weeklyInfo } = useSurveyData();

  if (!weeklyInfo || weeklyInfo.length === 0) return <div>Loading...</div>;

  const data = [{
    x: weeklyInfo.map(entry => entry.date),
    y: weeklyInfo?.map(entry => entry.weight_change),
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'orange' },
    name: 'weight'
  }];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Plot
        data={[{
          x: weeklyInfo.map(entry => new Date(entry.week_start).toISOString().split("T")[0]),
          y: weeklyInfo.map(entry => entry.weight_change),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'orange' },
          line: { color: 'orange' },
          name: 'weight'
        }]}

        layout={{
          title: {
            text: 'Weight Change',
            font: { size: 18 },
          },
          xaxis: {
            title: 'Date',
            tickformat: '%b %d<br>%Y',
            type: 'date',
            showgrid: false,
            tickangle: -45, // ✅ Tilt labels so they fit
            tickfont: { size: 10 }, // ✅ Smaller font if space is tight
          },
          yaxis: {
            title: 'Cups',
            showgrid: true,
          },
          margin: { l: 40, r: 20, t: 40, b: 60 }, // ✅ More space at bottom for x-axis labels
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
          autosize: true,
          height: 250 // ✅ Explicit height (try increasing to 300+ if needed)
        }}
        
        config={{
          responsive: true,
          displayModeBar: false,
        }}
        style={{ width: '100%', height: '100%' }}
      />

    </div>
  );
};

export default WeightGraph;
