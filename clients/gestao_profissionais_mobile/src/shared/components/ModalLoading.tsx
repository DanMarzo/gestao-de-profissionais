import React from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {Modal, View} from 'react-native';

interface Props {
  carregando: boolean;
}

const ModalLoading = ({carregando}: Props) => {
  return (
    <Modal visible={carregando} transparent animationType="fade">
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export {ModalLoading};
