import styles from './CountryList.module.css'
import Country from "./Country.jsx";

export default function CountryList({ currentData }) {

	return (
		<ul className={styles.countryList}>
			{
				currentData.map((country) => (
					<Country countryData={country} key={country.name} />
				))
			}
		</ul>
	)
}

