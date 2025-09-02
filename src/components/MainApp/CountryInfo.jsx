// noinspection JSUnresolvedReference

import styles from './CountryInfo.module.css'

function CountryInfo({ countryData }) {
	const {
		name,
		nativeName,
		population,
		region,
		subRegion,
		capital,
		flag,
		alt,
		currencies,
		topLevelDomain,
		languages,
	} = countryData;

 return (
	 <article className={styles.mainAppCountry}>
		 <img className={styles.mainAppCountryFlag} src={flag} alt={alt}/>
		 <div className={styles.mainAppCountryData}>
			 <h2 className={`text-2 ${styles.mainAppCountryName}`}>{name}</h2>
			 <div className={styles.mainAppCountryDataElements}>
				 <div className={styles.mainAppCountryDataBox}>
					 <p><span>Native Name:</span> {nativeName}</p>
					 <p><span>Population:</span> {population}</p>
					 <p><span>Region:</span> {region}</p>
					 <p><span>Sub Region:</span> {subRegion}</p>
					 <p><span>Capital:</span> {capital}</p>
				 </div>
				 <div className={`${styles.mainAppCountryDataBox}`}>
					 <p><span>Top Level Domain:</span> {topLevelDomain}</p>
					 <p><span>Currencies:</span> {currencies.join(", ")}</p>
					 <p><span>Languages:</span> {languages.join(", ")}</p>
				 </div>
				 <div>
					 <p><span>Boundries:</span>{topLevelDomain}</p>
				 </div>
			 </div>
		 </div>
	 </article>
 );
}

export default CountryInfo;