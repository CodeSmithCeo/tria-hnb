import { useState, useEffect } from 'react';

const BASE_URL = 'https://api.hnb.hr/tecajn-eur/v3';

type ApiState<T> = {
    data: T | null;
    error: string | null;
    loading: boolean;
};

const useApi = <T,>() => {
    const [url, setUrl] = useState<string | null>(null);
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        error: null,
        loading: false,
    });

    useEffect(() => {
      if (!url) return; // Don't fetch if URL is not set

      const fetchData = async (url: string) => {
        setState({ data: null, error: null, loading: true });
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setState({ data, error: null, loading: false });
        } catch (error: any) {
            setState({ data: null, error: error.message, loading: false });
        }
      };

      fetchData(url);
    }, [url]);

    const fetchApiData = (endpoint: string) => {
        setUrl(BASE_URL + endpoint);
    };

    return { ...state, fetchApiData };
};

export default useApi;
