import {createContext, useContext, useState} from "react";

const SearchAndRegionContext = createContext(null);

function SearchAndRegionProvider({ children }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedRegion, setSelectedRegion] = useState("");

	function handleSearch(e) {
		setSearchTerm(e.target.value);
	}

	function handleSelectRegion(e) {
		setSelectedRegion(e.target.value);
	}

	return (
		<SearchAndRegionContext.Provider value={
			{ searchTerm, handleSearch, selectedRegion, handleSelectRegion }
		}>
			{ children }
		</SearchAndRegionContext.Provider>
	)
}

function useSearchAndRegion() {
	const context = useContext(SearchAndRegionContext);

	if (context === undefined) {
		throw new Error('useSearchAndRegion must be used within SearchAndRegionProvider');
	}

	return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { SearchAndRegionProvider, useSearchAndRegion }