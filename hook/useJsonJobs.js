import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { RAPID_API_KEY } from '../.env';

const rapidApiKey = RAPID_API_KEY;

const useJsonJobs = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const correctQuery = useMemo(() => ((query.query).replaceAll(" ", "_")), [query.query]);
  const options = {
    method: 'GET',
    url: `http://localhost:3000/${correctQuery}`,
    params: {
      ...query
    },
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    }
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert('There is an error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };
  return { data, isLoading, error, refetch };
};

export default useJsonJobs;
