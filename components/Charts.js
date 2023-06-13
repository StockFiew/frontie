import React, { useState, useEffect, useMemo } from 'react';
import { View, ActivityIndicator, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import alpha from '../services/alpha';

const Charts = ({ route }) => {
  const { symbol } = route.params;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const interval = '15min';

  useEffect(() => {
    alpha.time_series(symbol, interval)
      .then(response => {
        setData(response);
      })
      .catch(error => {
        console.log(error);
      });
    setIsLoading(false);
  }, [symbol]);

  const chartData = useMemo(() => {
    if (!data) {
      return null;
    }

    const timeSeries = data[`Time Series (${interval})`];
    const labels = Object.keys(timeSeries).reverse();
    const dataPoints = labels.map(label => parseFloat(timeSeries[label]['4. close']));
    console.log(dataPoints);

    return {
      labels,
      datasets: [
        {
          data: dataPoints,
        },
      ],
    };
  }, [data]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!data) {
    return <Text>Error: Could not fetch data. Please try again later.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 220 }}>
        <LineChart
          style={{ flex: 1 }}
          data={chartData.datasets[0].data}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text>Test</Text>
      </View>
    </View>
  );
};

export default Charts;
