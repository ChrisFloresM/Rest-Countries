// noinspection JSCheckFunctionSignatures

import {useEffect, useMemo, useRef, useReducer} from "react";

const countriesCache = new Map();
const completedRegions = new Map();

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

export default function useCountries(searchTerm, selectedRegion, isCca2=false) {
	const [{ rawData, isLoading, error }, dispatch] = useReducer(reducer, initialState);
	const previousRegion = useRef("");

  useEffect(() => {
    if (!isCca2 && !selectedRegion && searchTerm.length < 3) {
			dispatch({ type: 'RESET' });
			previousRegion.current = "";
      return;
    }

		if (!isCca2 && previousRegion.current === selectedRegion && searchTerm.length < 3) {
			return;
		}

		const cacheData = checkFromCache(searchTerm, selectedRegion, isCca2);
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
					`https://restcountries.com/v3.1/${isCca2 ? "alpha" : "name"}/${searchTerm}`;

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
  }, [selectedRegion, searchTerm, isCca2]);

  const filteredData = useMemo(() => {
		if (!selectedRegion || searchTerm.length < 3) {
			return rawData;
		}

    return rawData.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [rawData, selectedRegion, searchTerm]);

	useEffect(function() {
			if (searchTerm.length >= 3 && selectedRegion && filteredData.length === 0) {
				dispatch({ type: 'FILTER_RESULT', payload: "Country not found in the selected area" });
			} else {
				dispatch({ type: 'FILTER_RESULT', payload: null });
			}
	}, [filteredData, searchTerm, selectedRegion]);

  return [filteredData, error, isLoading];
}

function checkFromCache(searchTerm, selectedRegion, isCca2) {
	if (selectedRegion) {
		const isRegionComplete = completedRegions.get(selectedRegion);

		if (isRegionComplete) {
			const cachedCountries = Array.from(countriesCache.values());
			return cachedCountries.filter(country => {
				console.log(`Searching for ${country.region.toLowerCase()} for ${selectedRegion}`);
				return country.region.toLowerCase() === selectedRegion
			});
		}

		return null;
	} else {
		const cachedCountries = Array.from(countriesCache.values());
		const matches =
			isCca2 ?
				cachedCountries.filter(country => country.cca2 === searchTerm) :
				cachedCountries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase())) ;

		if (matches.length > 0 && (isCca2 || searchTerm.length >= 3)) {
			return matches;
		}

		return null;
	}
}

function saveToCache(countriesData, selectedRegion) {
	countriesData.forEach((country) => {
		countriesCache.set(country.name, country);
	});

	if (selectedRegion) {
		completedRegions.set(selectedRegion, true);
	}
}

function processData(data) {
	return data.map(country => {
		return {
			nativeName: getNativeName(country.name?.nativeName),
			name: country.name?.common ?? "Unknown",
			population: country.population ?? 0,
			region: country.region ?? "N/A",
			subregion: country.subregion ?? "N/A",
			capital: country.capital?.[0] ?? "N/A",
			flag: country.flags?.png ?? "https://cdn-icons-png.flaticon.com/512/13434/13434972.png",
			alt: country.flags?.alt ?? "No description avaiable",
			currencies: Object.values(country.currencies)?.map(currency => currency.name) || "N/A",
			topLevelDomain: country.tld?.[0] ?? "N/A",
			languages: Object.values(country.languages) ?? "Unknown",
			cca2: country.cca2 ?? "MX",
			borders: country.borders ?? [],
		}
	});
}

function getNativeName(nativeNames) {
	if (!nativeNames) return "Unknown";

	const values = Object.values(nativeNames);
	const lastValue = values[values.length - 1];

	return lastValue?.common || "unknown";
}
