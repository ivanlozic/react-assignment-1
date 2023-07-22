import { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axios';

interface FetchData<T> {
  data: T | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

const useFetch = <T,>(url: string): FetchData<T> => {
  const [data, setData] = useState<T | null>(null);

  const fetchData = (): void => {
    axiosInstance
      .get(url)
      .then((res) => {
        const response = res.data;
        setData(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, setData };
};

export default useFetch;
