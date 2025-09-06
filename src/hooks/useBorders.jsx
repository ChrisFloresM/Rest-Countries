import {useEffect, useReducer} from "react";
import {getBordersFromCache} from "../cache/cacheManager.js";
import {processData} from "../helpers/helpers.js";

const initialState = {
	bordersData: [],
	isLoading: false,
	error: null
}

function reducer(state, action) {
	switch (action.type) {
		case 'RESTART':
			return {...initialState};
		case 'FETCH_START':
			return {...state, isLoading: true, error: null};
		case 'FETCH_SUCCESS':
			return {...state, isLoading: false, bordersData: action.payload, error: null};
		case 'FETCH_ERROR':
			return {...state, isLoading: false, error: action.payload};
		default:
			throw new Error('Action not found');
	}
}

function useBorders(borders) {
	const [{bordersData, isLoading, error}, dispatch] = useReducer(reducer, initialState);

 	useEffect(function() {
	  if (borders.length === 0) {
			dispatch({ type: "FETCH_ERROR", payload: "No border countries information avaiable for this country"});
			return;
		}

	 	const cachedBorders = getBordersFromCache(borders);
	  if (cachedBorders.length === borders.length) {
			dispatch({ type: "FETCH_SUCCESS", payload: cachedBorders});
			return;
		}

		async function fetchBorders() {
			try {
				dispatch({ type: "FETCH_START" });
				const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borders.join(",")}`);

				if (!res.ok) {
					throw new Error("No border countries information avaiable for this country");
				}

				const data = await res.json();
				const processedData = processData(data);
				dispatch({ type: "FETCH_SUCCESS", payload: processedData });
			} catch(e) {
				dispatch({ type: "FETCH_ERROR", payload: e.message});
			}
		}

		void fetchBorders();
	}, [borders, dispatch]);

	 const bordersDataArray = bordersData.map(country => {
		 return { name: country.name, cca3: country.cca3 }
	 });

	 return [bordersDataArray, isLoading, error];
}

export default useBorders;