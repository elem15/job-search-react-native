import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { useEffect, useState } from 'react';
import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';
import { useRouter } from 'expo-router';

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ setSearchTerm }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [activeJobType, setActiveJobType] = useState("Full-time");
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>
          Hello,
        </Text>
        <Text style={styles.welcomeMessage}>
          find you perfect job
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchValue}
            onChangeText={(text) => { setSearchValue(text); }}
            placeholder='What are you looking for'
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => { setSearchTerm(searchValue); }}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, idx) => item + idx}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;