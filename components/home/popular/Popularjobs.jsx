import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

import styles from './popularjobs.style';
import { useRouter } from 'expo-router';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useMyFetch from "../../../hooks/useMyFetch";
import useJsonJobs from '../../../hooks/useJsonJobs';
import { useState } from 'react';

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useMyFetch('search', {
    query: 'React developer',
  });
  const [selectedJob, setSelectedJob] = useState();
  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
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
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
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