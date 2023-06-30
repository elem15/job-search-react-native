import { Stack, useRouter, useSearchParams } from 'expo-router';
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import useFetch from '../../hook/useFetch';
import useMyFetch from '../../hook/useMyFetch';
import useJsonOneJob from '../../hook/useJsonOneJob';
import { COLORS, SIZES, icons } from '../../constants';
import { Company, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { useEffect, useState } from 'react';
import JobSearch from '../../components/home/search/JobSearch';
import React from 'react';


const SearchResults = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => { };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
            />
          ),
          headerTitle: ''
        }}
      >
      </Stack.Screen>

      <JobSearch searchTerm={params.id} />

    </SafeAreaView>
  );
};
export default SearchResults;