import SearchAndFilter from "./SearchAndFilter.jsx";
import CountryList from "./CountryList.jsx";
import {useState} from "react";
import useCountries from "../../hooks/useCountries.jsx";
import UserFeedback from "./UserFeedback.jsx";
import styles from './MainApp.module.css'

export default function MainApp() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedRegion, setSelectedRegion] = useState("");

	function handleSearch(e) {
		setSearchTerm(e.target.value);
	}

	function handleSelectRegion(e) {
		setSelectedRegion(e.target.value);
	}

	const [countriesData, error, isLoading] = useCountries(searchTerm, selectedRegion);

	return (
		<main className={styles.mainApp}>
			<SearchAndFilter searchVal={searchTerm} region={selectedRegion} onChangeSearch={handleSearch} onChangeRegion={handleSelectRegion}/>
			{ !error && isLoading && <UserFeedback message="Searching for countries..."/>}
			{ !isLoading && error && <UserFeedback message={error}/> }
			{ !isLoading && !error &&
				( countriesData?.length > 0 ?
					<CountryList currentData={countriesData}/> :
					<UserFeedback message="Search for a country or select a region to display countries" /> )
			}
		</main>
	)
}

/* 2 diferent page views to show based on routing:
* 	1. CountriesList view
* 	2. CountryInformation view
* */








