import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import alpha from '../services/alpha';

const Chart = ({ route }) => {
  const { symbol } = route.params;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    alpha.time_series(symbol).then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, [symbol]);

  const chartOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: `${symbol} Candlestick Chart`,
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy HH:mm:ss',
      },
    },
    series: [
      {
        data: data
          ? Object.entries(data['Time Series (5min)'])
            .map(([date, values]) => ({
              x: new Date(date).getTime(),
              y: [parseFloat(values['1. open']), parseFloat(values['2. high']), parseFloat(values['3. low']), parseFloat(values['4. close'])],
            }))
            .reverse()
          : [],
      },
    ],
  };


  const chartHtml = `
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.41.0/dist/apexcharts.min.js"></script>
      </head>
      <body>
        <div id="chart"></div>
        <script>
          var chart = new ApexCharts(document.querySelector("#chart"), ${JSON.stringify(chartOptions)});
          chart.render();
        </script>
      </body>
    </html>
  `;

  console.log("I'm Here");

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <WebView source={{ html: chartHtml }} style={{ height: 350 }} />
      )}
    </View>
  );
};

export default Chart;
