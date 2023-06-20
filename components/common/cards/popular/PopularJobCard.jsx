import { View, Text } from 'react-native';

import styles from './popularjobcard.style';

const PopularJobCard = ({ item }) => {
  return (
    <View>
      <Text>{item}.PopularJobCard</Text>
    </View>
  );
};

export default PopularJobCard;