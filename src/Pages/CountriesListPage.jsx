import SearchAndFilter from "../components/MainApp/SearchAndFilter.jsx";
import UserFeedback from "../components/MainApp/UserFeedback.jsx";
import CountryList from "../components/MainApp/CountryList.jsx";

import styles from './CountriesListPage.module.css'

export default function CountriesListPage({ searchTerm, selectedRegion, handleSearch, handleSelectRegion, error, isLoading, countriesData }) {
	return (
		<section className={styles.mainAppCountriesListPage}>
			<SearchAndFilter searchVal={searchTerm} region={selectedRegion} onChangeSearch={handleSearch} onChangeRegion={handleSelectRegion} />
			{!error && isLoading && <UserFeedback message="Searching for countries..."/>}
			{!isLoading && error && <UserFeedback message={error}/>}
			{!isLoading && !error &&
				(countriesData?.length > 0 ?
					<CountryList currentData={countriesData}/> :
					<UserFeedback message="Search for a country or select a region to display countries"/>)
			}
		</section>
	)
}