import SearchAndFilter from "./SearchAndFilter.jsx";
import CountryList from "./CountryList.jsx";
import {useState} from "react";
import useCountries from "../../hooks/useCountries.jsx";
import UserFeedback from "./UserFeedback.jsx";
import styles from './MainApp.module.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import CountriesListPage from "../../Pages/CountriesListPage.jsx";
import CountryInformationPage from "../../Pages/CountryInformationPage.jsx";

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
			<BrowserRouter>
				<Routes>
					<Route index element={
						<CountriesListPage
							searchTerm={searchTerm}
							selectedRegion={selectedRegion}
							handleSearch={handleSearch}
							handleSelectRegion={handleSelectRegion}
							error={error}
							isLoading={isLoading}
							countriesData={countriesData}
						/>
					}/>
					<Route path="/country/:cca2" element={<CountryInformationPage />} />
				</Routes>
			</BrowserRouter>

		</main>
	)
}

/* 2 diferent page views to show based on routing:
* 	1. CountriesListPage
* 	2. CountryInformationPage
* */










