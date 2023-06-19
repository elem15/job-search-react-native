import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { useState } from 'react';
import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';
import { useRouter } from 'expo-router';

const Welcome = () => {
  const router = useRouter();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>
          Hello, Elem
        </Text>
        <Text style={styles.welcomeMessage}>
          Find you perfect job
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
        />
        </View>
      </View>
    </View>
  )
}

export default Welcome