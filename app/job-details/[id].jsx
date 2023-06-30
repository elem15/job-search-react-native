import { Stack, useRouter, useSearchParams } from 'expo-router';
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import useFetch from '../../hooks/useFetch';
import useMyFetch from '../../hooks/useMyFetch';
import useJsonOneJob from '../../hooks/useJsonOneJob';
import { COLORS, SIZES, icons } from '../../constants';
import { Company, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { useCallback, useEffect, useState } from 'react';

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useMyFetch('job-details', { job_id: params.id });
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[1]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

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
      <>
        <ScrollView
          showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading || !data[0] ? (
            <ActivityIndicator size="large" colors={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }} >
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <Specifics
                title={activeTab}
                points={data[0].job_highlights?.[activeTab] ?? ['N/A']}
              />
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}
        />
      </>
    </SafeAreaView>
  );
};
export default JobDetails;