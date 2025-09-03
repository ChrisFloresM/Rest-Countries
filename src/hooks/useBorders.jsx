import {useEffect, useReducer} from "react";


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
		async function fetchBorders() {
			try {
				dispatch({ type: "FETCH_START" });
				const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borders.join(",")}`);

				if(!res.ok) {
					throw new Error("No border countries information avaiable for this country");
				}

				const data = await res.json();
				dispatch({ type: "FETCH_SUCCESS", payload: data });
			} catch(e) {
				dispatch({ type: "FETCH_ERROR", payload: e.message});
			}
		}

		void fetchBorders();
	}, [borders, dispatch]);

	 const bordersDataArray = bordersData.map(country => {
		 return { name: country.name?.common ?? "Unknown", cca2: country.cca2 ?? "MX" }
	 });

	 return [bordersDataArray, isLoading, error];
}

export default useBorders;