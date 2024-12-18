import React, { useState } from 'react';
import {
  Modal,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AboutScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMenuPress = () => {
    setIsModalVisible(true); 
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); 
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.cardButton} onPress={handleMenuPress}>
        <Text style={styles.cardButtonText}>Voir le menu complet</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal} // Gestion de la fermeture sur Android
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>

          <Image
            source={require('@/assets/images/menu-food.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2C9E0',
  },
  cardButton: {
    backgroundColor: '#F2784B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cardButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Fond semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 20,
  },
  image: {
    width: '90%',
    height: '80%',
  },
});
