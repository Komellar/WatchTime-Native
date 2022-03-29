import { useState, useEffect } from 'react';

export const useFetch = (requestFunction, requestData = undefined) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        try {
          const responseData = await requestFunction(requestData);
          setData(responseData);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [requestFunction]);
  return { loading, data, error };
};
