import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

import styles from './popularjobs.style';
import { useRouter } from 'expo-router';
import { isLoading } from 'expo-font';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';
import { useState } from 'react';

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });
  const [selectedJob, setSelectedJob] = useState();
  const handleCardPress = () => {

  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (<ActivityIndicator size="large" colors={COLORS.primary} />) : error ? (
          <Text>
            Something went wrong
          </Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
              />
            )}
            horizontal
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;