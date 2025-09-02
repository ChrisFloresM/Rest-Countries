import {data, Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import styles from './CountryInformationPage.module.css'
import BackButton from "../components/MainApp/BackButton.jsx";
import useCountries from "../hooks/useCountries.jsx";
import UserFeedback from "../components/MainApp/UserFeedback.jsx";
import CountryList from "../components/MainApp/CountryList.jsx";

export default function CountryInformationPage() {
	const { name } = useParams();
	const [countryData, error, isLoading] = useCountries(name, null);

	return (
		<section className={styles.mainAppCountryInfo}>
			<BackButton />
			<article>
				{!error && isLoading && <UserFeedback message="Searching for country data..."/>}
				{!isLoading && error && <UserFeedback message={error}/>}
				{!isLoading && !error && (
					countryData?.length > 0 ? <p>{countryData[0].name}, {countryData[0].region}</p> : <></>
				)}
			</article>
		</section>
	)
}