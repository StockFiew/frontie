import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import fmp from '../services/fmp';

const StockScreen = ({ route }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fmp.price_target(route.params.symbol).then((result) => {
      console.log(result);
      setData(result);
    });
  }, []);

  const priceTargetData = data.map((item) => ({
    date: new Date(item.publishedDate).toLocaleDateString(),
    value: item.priceTarget,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: priceTargetData.map((item) => item.date),
            datasets: [
              {
                data: priceTargetData.map((item) => item.value),
              },
            ],
          }}
          width={350}
          height={200}
          yAxisSuffix="$"
          chartConfig={{
            backgroundColor: '#000',
            backgroundGradientFrom: '#000',
            backgroundGradientTo: '#000',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Price Targets</Text>
        {data.map((item, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>{item.analystCompany || 'Analyst'}:</Text>
            <Text style={styles.value}>${item.priceTarget.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#fff',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default StockScreen;
