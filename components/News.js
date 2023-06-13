import React, { useState, useEffect } from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import fmp from "../services/fmp";
import * as WebBrowser from "expo-web-browser";

const News = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fmp.news(route.params.symbol).then((data) => {
      setData(data)
    });
    setIsLoading(false);
  }, [route.params.symbol]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.newsItem}
                onPress={() => WebBrowser.openBrowserAsync(item.url)}
              >
                <Image source={{ uri: item.image }} style={styles.newsImage}></Image>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsSource}>{item.source}</Text>
                <Text style={styles.newsDate}>{item.publishedDate}</Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  newsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  newsItem: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsSource: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  newsDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default News;
