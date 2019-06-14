import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  ActivityIndicator
} from 'react-native';

const Loader = props => {
  const {
    loading,
    loadingText,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => { console.log('close modal'); }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} size="large" color="#0000ff" />
          <Text style={styles.loadingText}>
              {loadingText}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000099'
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 250,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  loadingText: {
      color: '#ffffff',
      textAlign: 'center'
  }
});

export default Loader;
