import { Text, View, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import ImageViewer from "@/components/ImageViewer";

const PlaceholderImage = require('@/assets/images/Ecusson + Stickers.png');

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C9E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  imageContainer: {
    flex: 1,
  },
});
