import { useEffect, useState } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export function useFetch<T>(url: string, options?: RequestInit): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, error: null, isLoading: true });

    fetch(url, { ...options, signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data = (await response.json()) as T;
        setState({ data, error: null, isLoading: false });
      })
      .catch((error: Error) => {
        if (error.name === 'AbortError') return;
        setState({ data: null, error, isLoading: false });
      });

    return () => controller.abort();
  }, [url, options]);

  return state;
}
