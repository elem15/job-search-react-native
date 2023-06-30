import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "../../../styles/search";
import { COLORS, SIZES, icons } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";
import useMyFetch from "../../../hook/useMyFetch";
import useJsonJobs from "../../../hook/useJsonJobs";
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import axios from 'axios';

const JobSearch = ({ searchTerm }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useMyFetch('search', { query: searchTerm, page: page });

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage((page) => (page - 1));
    } else if (direction === 'right' && data.length > 4) {
      setPage((page) => (page + 1));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{searchTerm}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : error && (
                <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            {!isLoading && <>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination('left')}
              >
                <Image
                  source={icons.chevronLeft}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>{page}</Text>
              </View>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination('right')}
              >
                <Image
                  source={icons.chevronRight}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity></>}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default JobSearch;