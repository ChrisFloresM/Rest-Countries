// noinspection JSUnresolvedReference

import {data, Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import styles from './CountryInformationPage.module.css'
import BackButton from "../components/MainApp/BackButton.jsx";
import useCountries from "../hooks/useCountries.jsx";
import UserFeedback from "../components/MainApp/UserFeedback.jsx";
import CountryList from "../components/MainApp/CountryList.jsx";
import CountryInfo from "../components/MainApp/CountryInfo.jsx";

export default function CountryInformationPage() {
	const { cca2 } = useParams();
	const [countryData, error, isLoading] = useCountries(cca2, null, true);

	return (
		<section className={styles.mainAppCountryInfo}>
			<BackButton />
			<article className={styles.mainAppCountryContainer}>
				{!error && isLoading && <UserFeedback message="Searching for country data..."/>}
				{!isLoading && error && <UserFeedback message={error}/>}
				{!isLoading && !error && (
					countryData?.length > 0 ? <CountryInfo countryData={countryData[0]}/> : <></>
				)}
			</article>
		</section>
	)
}
