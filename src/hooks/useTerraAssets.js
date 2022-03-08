import axios from 'axios';
import { useEffect, useState } from 'react';

const config = { baseURL: 'https://assets.terra.money' };

export const useTerraAssets = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(path, config);
        setData(data);
      } catch (error) {
        setError(error);
      }
    };
    fetch();
  }, [path]);

  return { data, error };
};
