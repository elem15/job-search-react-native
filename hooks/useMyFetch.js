import axios from 'axios';
import { useEffect, useState } from 'react';

const url = 'https://job-search-cc3e.onrender.com';
// const url = 'http://localhost:3000';

const useMyFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request({
        method: 'GET',
        url: `${url}/${endpoint}`,
        params: {
          ...query
        },
      });
      if (Array.isArray(response.data)) setData(response.data);
      else setData([response.data]);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert('There is an error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query.query || query.job_id) {
      fetchData();
    }
  }, [query.query, query.job_id]);

  const refetch = () => {
    fetchData();
  };
  return { data, isLoading, error, refetch };
};

export default useMyFetch;
