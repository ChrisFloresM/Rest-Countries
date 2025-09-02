import styles from './Country.module.css'
import {Link} from "react-router-dom";

export default function Country({ countryData }) {
	const {name, population, region, capital, flag, alt} = countryData;
	return (
		<li className={styles.countryListCountry}>
			<Link to={`/country/${name}`}>
				<img className={styles.countryListFlag} src={flag} alt={alt}/>
				<div className={styles.countryListCountryInfo}>
					<h2 className={`text-3 ${styles.countryListCountryName}`}>{name}</h2>
					<p className={`text-5 ${styles.countryListCountryData}`}>Population: <span
						className="text-5-light"
					>{population}</span></p>
					<p className={`text-5 ${styles.countryListCountryData}`}>Region: <span
						className="text-5-light"
					>{region}</span></p>
					<p className={`text-5 ${styles.countryListCountryData}`}>Capital: <span
						className="text-5-light"
					>{capital}</span></p>
				</div>
			</Link>
		</li>
	)
}