import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { scaleSize } from '../constants/Layout';

const News = ({ data, handleNewsPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => handleNewsPress(item.url)}
    >
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={styles.newsTextContainer}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDescription}>{item.text}</Text>
        <Text style={styles.newsDate}>
          {new Date(item.publishedDate).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (item, index) => index.toString();

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: scaleSize(20),
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleSize(20),
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#ccc',
    paddingBottom: scaleSize(20),
  },
  newsImage: {
    width: scaleSize(100),
    height: scaleSize(100),
    marginRight: scaleSize(20),
  },
  newsTextContainer: {
    flex: 1,
  },
  newsTitle: {
    fontSize: scaleSize(18),
    fontWeight: 'bold',
    marginBottom: scaleSize(10),
    color: '#fff',
  },
  newsDescription: {
    fontSize: scaleSize(14),
    color: '#ccc',
    marginBottom: scaleSize(10),
  },
  newsDate: {
    fontSize: scaleSize(12),
    color: '#ccc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default News;
