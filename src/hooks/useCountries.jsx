import {useEffect, useMemo, useRef, useState} from "react";

const errors = {
	404: "Country not Found",
}

export default function useCountries(searchTerm, selectedRegion) {
  const [rawData, setRawData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
	const previousRegion = useRef("");

  useEffect(() => {
    if (!selectedRegion && searchTerm.length < 3) {
      setRawData([]);
      setError(null);
      return;
    }

		if (previousRegion.current === selectedRegion && searchTerm.length < 3) {
			return;
		}

		const controller = new AbortController();
		const signal = controller.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        let url = selectedRegion ?
					`https://restcountries.com/v3.1/region/${selectedRegion}` :
					`https://restcountries.com/v3.1/name/${searchTerm}`;

        const res = await fetch(url, { signal });

        if (!res.ok) {
          throw new Error(`Error occurred: ${errors[res.status]}`);
        }

        const currentData = await res.json();

				setRawData(processData(currentData));
				previousRegion.current = selectedRegion;
      } catch(e) {
        if (e.name !== "AbortError") {
          setRawData([]);
          setError(e.message)
				}
      } finally {
				setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [selectedRegion, searchTerm]);

  const filteredData = useMemo(() => {
		if (!selectedRegion) {
			return rawData;
		}

    if (searchTerm.length < 3) {
      return rawData;
    }

    return rawData.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [rawData, selectedRegion, searchTerm]);

	useEffect(function() {
			if(searchTerm.length >= 3 && selectedRegion && filteredData.length === 0) {
				setError("Country not found in selected Area");
			} else {
				setError(null);
			}
	}, [filteredData, searchTerm, selectedRegion]);

  return [filteredData, error, isLoading];
}

function processData(data) {
		return data.map(country => {
			return {
				name: country.name?.common ?? "Unknown",
				population: country.population ?? 0,
				region: country.region ?? "N/A",
				capital: country.capital?.[0] ?? "N/A",
				flag: country.flags?.png ?? "https://cdn-icons-png.flaticon.com/512/13434/13434972.png",
				alt: country.flags?.alt ?? "No description avaiable",
			}
		});
}