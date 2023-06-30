import { Stack, useRouter, useSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { COLORS, icons } from '../../constants';
import { ScreenHeaderBtn, JobSearch } from '../../components';
import { useState } from 'react';
import React from 'react';


const SearchResults = () => {
  const params = useSearchParams();
  const router = useRouter();

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