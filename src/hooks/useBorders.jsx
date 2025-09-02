import {useEffect, useState} from "react";

function useBorders(borders) {
	const [bordersData, setBordersData] = useState([]);

 	useEffect(function() {
		async function fetchBorders() {
			try {
				const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borders.join(",")}`);
				const data = await res.json();
				setBordersData(data);
			} catch(e) {
				console.log(`Error fetching borders: ${e.message}`)
			}
		}

		void fetchBorders();
	}, [borders, setBordersData]);

	 return bordersData.map(country => {
		 return { name: country.name?.common ?? "Unknown", cca2: country.cca2 ?? "MX" }
	 });
}

export default useBorders;