/* helper function to process data */
function processData(data) {
	return data.map(country => {
		return {
			nativeName: getNativeName(country.name?.nativeName),
			name: country.name?.common ?? "Unknown",
			population: (country.population ?? 0).toLocaleString(),
			region: country.region ?? "N/A",
			subregion: country.subregion ?? "N/A",
			capital: country.capital?.[0] ?? "N/A",
			flag: country.flags?.png ?? "https://cdn-icons-png.flaticon.com/512/13434/13434972.png",
			alt: country.flags?.alt ?? "No description avaiable",
			currencies: Object.values(country.currencies)?.map(currency => currency.name) || "N/A",
			topLevelDomain: country.tld?.[0] ?? "N/A",
			languages: Object.values(country.languages) ?? "Unknown",
			cca3: country.cca3 ?? "MX",
			borders: country.borders ?? [],
		}
	});
}

/* Helper and locally used functon to get native name from the format from the API */
function getNativeName(nativeNames) {
	if (!nativeNames) return "Unknown";

	const values = Object.values(nativeNames);
	const lastValue = values[values.length - 1];

	return lastValue?.common || "unknown";
}

export { processData };