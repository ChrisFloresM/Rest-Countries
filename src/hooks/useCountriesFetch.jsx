import {useEffect, useReducer, useRef} from "react";

import {checkFromCache, saveToCache} from "../cache/cacheManager.js";
import {processData} from "../helpers/helpers.js";

const errors = {
	404: "Country not Found",
}

const initialState = {
	rawData: [],
	isLoading: false,
	error: null
}

function reducer(state, action) {
	switch (action.type) {
		case 'RESET':
			return { ...state, rawData: [], isLoading: false, error: null };
		case 'FETCH_START':
			return { ...state, isLoading: true, error: null };
		case 'FETCH_SUCCESS':
			return { ...state, rawData: action.payload, isLoading: false };
		case 'FETCH_ERROR':
			return { ...state, rawData: [], error: action.payload, isLoading: false };
		case 'FILTER_RESULT':
			return { ...state, error: action.payload }
		default:
			throw new Error('Action not found');
	}
}

export default function useCountriesFetch(searchTerm, selectedRegion, isCca3) {
	const [{ rawData, isLoading, error }, dispatch] = useReducer(reducer, initialState);
	const previousRegion = useRef("");

  useEffect(() => {
    if (!isCca3 && !selectedRegion && searchTerm.length < 3) {
			dispatch({ type: 'RESET' });
			previousRegion.current = "";
      return;
    }

		if (!isCca3 && previousRegion.current === selectedRegion && searchTerm.length < 3) {
			return;
		}

		const cacheData = checkFromCache(searchTerm, selectedRegion, isCca3);
		if (cacheData) {
			dispatch({type: 'FETCH_SUCCESS', payload: cacheData});
			previousRegion.current = selectedRegion;
			return;
		}

		const controller = new AbortController();
		const signal = controller.signal;

    async function fetchData() {
      try {
				dispatch({ type: 'FETCH_START' })

        let url = selectedRegion ?
					`https://restcountries.com/v3.1/region/${selectedRegion}` :
					`https://restcountries.com/v3.1/${isCca3 ? "alpha" : "name"}/${searchTerm}`;

        const res = await fetch(url, { signal });

        if (!res.ok) {
          throw new Error(`Error occurred: ${errors[res.status]}`);
        }

        const currentData = await res.json();
				const processedData = processData(currentData);

				saveToCache(processedData, selectedRegion);

				dispatch({type: 'FETCH_SUCCESS', payload: processedData})
				previousRegion.current = selectedRegion;
      } catch(e) {
        if (e.name !== "AbortError") {
          dispatch({ type: 'FETCH_ERROR', payload: `Error fetching the data: ${e.message}`})
				}
      }
    }

    void fetchData();

    return () => {
      controller.abort();
    };
  }, [selectedRegion, searchTerm, isCca3]);

  return [rawData, error, isLoading];
}