import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const StockChart = ({ data }) => {
  // Data processing
  const chartData = Object.keys(data).map((date) => ({
    date,
    value: parseFloat(data[date]['5. adjusted close']),
  }));

  return (
    <View>
      <LineChart
        data={{
          datasets: [
            {
              data: chartData,
            },
          ],
        }}
        width={Dimensions.get('window').width}
        height={220}
        yAxisLabel='$'
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />
    </View>
  );
};

export default StockChart;
