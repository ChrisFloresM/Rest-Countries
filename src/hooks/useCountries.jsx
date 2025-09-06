import { useMemo } from "react";

import useCountriesFetch from "./useCountriesFetch.jsx";

export default function useCountries(searchTerm, selectedRegion, isCca3=false) {
	/* Hook 1: useEffect to fetch data */
	const [rawData, error, isLoading] = useCountriesFetch(searchTerm, selectedRegion, isCca3);

	/* Hook 2: useMemo to filter data */
  const filteredData = useMemo(() => {
		if (!selectedRegion || searchTerm.length < 3) {
			return rawData;
		}

    return rawData.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [rawData, selectedRegion, searchTerm]);

	/* Filter the data according to country name and region */
	const filterError = (searchTerm.length >= 3 && selectedRegion && filteredData.length === 0) ?
		"Country not found in the selected area" :
		null;

  return [filteredData, filterError ?? error, isLoading];
}





