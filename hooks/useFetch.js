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

// export const useFetch = (url, ref, initialValue) => {
//   const [data, setData] = useState(initialValue);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (ref.current) {
//       (async () => {
//         try {
//           const res = await fetch(url);
//           const resJson = await res.json();
//           setData(resJson);
//         } catch (err) {
//           setError(err);
//         } finally {
//           setLoading(false);
//         }
//       })();
//     }
//     return () => {
//       ref.current = false;
//     };
//   }, [url, ref]);
//   return { loading, data, error };
// };

// const initialState = {
//   status: 'idle',
//   error: null,
//   data: [],
// };

// const [state, dispatch] = useReducer((state, action) => {
//   switch (action.type) {
//     case 'FETCHING':
//       return { ...initialState, status: 'fetching' };
//     case 'FETCHED':
//       return { ...initialState, status: 'fetched', data: action.payload };
//     case 'FETCH_ERROR':
//       return { ...initialState, status: 'error', error: action.payload };
//     default:
//       return state;
//   }
// }, initialState);

// const useFetch = (url) => {
//   const cache = useRef({});
//   const [status, setStatus] = useState('idle');
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     let cancelRequest = false;
//     if (!url) return;

//     const fetchData = async () => {
//       dispatch({ type: 'FETCHING' });
//       if (cache.current[url]) {
//         const data = cache.current[url];
//         dispatch({ type: 'FETCHED', payload: data });
//       } else {
//         try {
//           const response = await fetch(url);
//           const data = await response.json();
//           cache.current[url] = data;
//           if (cancelRequest) return;
//           dispatch({ type: 'FETCHED', payload: data });
//         } catch (error) {
//           if (cancelRequest) return;
//           dispatch({ type: 'FETCH_ERROR', payload: error.message });
//         }
//       }
//     };

//     fetchData();

//     return function cleanup() {
//       cancelRequest = true;
//     };
//   }, [url]);

//   return { status, data };
// };
