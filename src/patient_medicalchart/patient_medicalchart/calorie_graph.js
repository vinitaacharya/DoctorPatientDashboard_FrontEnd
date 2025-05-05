import React from 'react';
import Plot from 'react-plotly.js';
import { useSurveyData } from '../patient_medicalchart/Survey_context';

const CalorieGraph = () => {
  const { dailyInfo } = useSurveyData();

  if (!dailyInfo || dailyInfo.length === 0) return <div>Loading...</div>;

  const data = [{
    x: dailyInfo.map(entry => entry.date),
    y: dailyInfo.map(entry => entry.calories_consumed),
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'orange' },
    name: 'Calories'
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
          x: dailyInfo.map(entry => new Date(entry.date).toISOString().split("T")[0]),
          y: dailyInfo.map(entry => entry.calories_consumed),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'orange' },
          line: { color: 'orange' },
          name: 'Calories'
        }]}

        layout={{
          title: {
            text: 'Calories Consumed',
            font: { size: 18 },
          },
          xaxis: {
            tickformat: '%b %d<br>%Y',  // clean format like Jun 13<br>2024
            type: 'date',               // ensures proper interpretation
            showgrid: false,
          },
          yaxis: {
            title: '',
            showgrid: true,
          },
          margin: { l: 40, r: 20, t: 40, b: 40 },
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
          autosize: true,
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

export default CalorieGraph;
