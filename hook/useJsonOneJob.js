import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { RAPID_API_KEY } from '../.env';

const rapidApiKey = RAPID_API_KEY;

const useJsonOneJob = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const optionsReact = {
    method: 'GET',
    url: `http://localhost:3000/React_developer/${query.job_id}`,
  };
  const optionsReactNative = {
    method: 'GET',
    url: `http://localhost:3000/React_Native_developer/${query.job_id}`,
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(optionsReact);
      setData([response.data]);
      setIsLoading(false);
    } catch (error) {
      try {
        const response = await axios.request(optionsReactNative);
        setData([response.data]);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        alert('There is an error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query.job_id) fetchData();
  }, [query.job_id]);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };
  return { data, isLoading, error, refetch };
};

export default useJsonOneJob;
