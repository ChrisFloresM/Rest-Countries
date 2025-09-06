const countriesCache = new Map();
const completedRegions = new Map();

/* Interface to cache */
function checkFromCache(searchTerm, selectedRegion, isCca3) {
	if (selectedRegion) {
		const isRegionComplete = completedRegions.get(selectedRegion);

		if (isRegionComplete) {
			const cachedCountries = Array.from(countriesCache.values());
			return cachedCountries.filter(country => {
				return country.region.toLowerCase() === selectedRegion
			});
		}

		return null;
	} else {
		const cachedCountries = Array.from(countriesCache.values());
		const matches =
			isCca3 ?
				cachedCountries.filter(country => country.cca3 === searchTerm) :
				cachedCountries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase())) ;

		if (matches.length > 0 && (isCca3 || searchTerm.length >= 3)) {
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

function getBordersFromCache(borders) {
	return borders.map(code => countriesCache.get(code)).filter(Boolean);
}

export { checkFromCache, saveToCache, getBordersFromCache };