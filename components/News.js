import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';

const News = ({ data, handleNewsPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.newsItem} onPress={() => handleNewsPress(item.url)}>
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={styles.newsTextContainer}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDescription}>{item.text}</Text>
        <Text style={styles.newsDate}>{new Date(item.publishedDate).toLocaleString()}</Text>
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
    padding: 20,
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 20,
  },
  newsImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  newsTextContainer: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  newsDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
  },
  newsDate: {
    fontSize: 12,
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
