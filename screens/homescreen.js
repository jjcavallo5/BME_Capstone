import React from 'react';

import {Text, View, StyleSheet, SafeAreaView} from 'react-native';

const HomeScreen = () => {
  const user = 'Jeremy';
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {user}</Text>
        <Text style={styles.subHeaderText}>
          Get started with some basic commands:
        </Text>
      </View>
      <View></View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    height: 150,
    display: 'flex',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 36,
    textAlign: 'left',
  },
  subHeaderText: {
    marginTop: 25,
  },
});
