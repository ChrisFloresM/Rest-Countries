import {Link} from "react-router-dom";

import styles from './CountryInformationPage.module.css'
import BackButton from "../components/MainApp/BackButton.jsx";

export default function CountryInformationPage() {
	return (
		<section className={styles.mainAppCountryInfo}>
			<BackButton />
			<article></article>
		</section>
	)
}