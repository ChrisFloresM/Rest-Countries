import SearchAndFilter from "../components/MainApp/CountryListPage/SearchAndFilter.jsx";
import UserFeedback from "../components/MainApp/UserFeedback.jsx";
import CountryList from "../components/MainApp/CountryListPage/CountryList.jsx";

import styles from './CountriesListPage.module.css'
import {useSearchAndRegion} from "../context/SearchAndRegionContext.jsx";
import useCountries from "../hooks/useCountries.jsx";

export default function CountriesListPage() {
	const { searchTerm, selectedRegion } = useSearchAndRegion();
	const [countriesData, error, isLoading] = useCountries(searchTerm, selectedRegion);

	return (
		<section className={styles.mainAppCountriesListPage}>
			<SearchAndFilter />
			{!error && isLoading && <UserFeedback message="Searching for countries..."/>}
			{!isLoading && error && <UserFeedback message={error}/>}
			{!isLoading && !error &&
				(countriesData?.length > 0 ?
					<CountryList currentData={ countriesData }/> :
					<UserFeedback message="Search for a country or select a region to display countries"/>)
			}
		</section>
	)
}