import { useState, useEffect, useCallback } from 'react';

type ApiState<T> = {
    data: T | null;
    error: string | null;
    loading: boolean;
};

const useApi = <T,>(url: string) => {
    const [currentUrl, setCurrentUrl] = useState<string>(url);
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        error: null,
        loading: false,
    });

    useEffect(() => {
      //NOTE: keep the effect callback NOT async to avoid nto triggering cleanup
      const fetchData = async (url: string)=>{
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
      }
       fetchData(url);
    }, [url]);

    const updateUrl = (newUrl: string) => setCurrentUrl(newUrl);

    return { ...state, updateUrl };
};

export default useApi;
