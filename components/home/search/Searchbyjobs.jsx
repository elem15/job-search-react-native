import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./Searchbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";
import useMyFetch from "../../../hook/useMyFetch";
import useJsonJobs from "../../../hook/useJsonJobs";

const Searchbyjobs = ({ searchTerm }) => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useMyFetch("search", {
    query: searchTerm,
    num_pages: "1",
  });
  useEffect(() => {
    searchTerm && refetch();
  }, [searchTerm]);

  if (!searchTerm) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Found jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading && Array.isArray(data) ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (data?.length) ?
          (
            data?.map((job) => (
              <NearbyJobCard
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              />
            ))) : (<Text>Nothing found</Text>)
        }
      </View>
    </View>
  );
};

export default Searchbyjobs;