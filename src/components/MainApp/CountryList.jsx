export default function CountryList({ currentData }) {
	return (
		<ul className="countryList">
			{
				currentData.map((country) => (
					<Country countryData={country} key={country.name} />
				))
			}
		</ul>
	)
}

function Country({ countryData }) {
	const {name, population, region, capital, flag, alt} = countryData;
	return (
		<li className="countryList__country">
			<img className="countryList__flag" src={flag} alt={alt}/>
			<div className="countryList__country-info">
				<h2 className="countryList__country-name text-3">{name}</h2>
				<p className="countryList__country-data text-5">Population: <span className="text-5-light">{population}</span></p>
				<p className="countryList__country-data text-5">Region: <span className="text-5-light">{region}</span></p>
				<p className="countryList__country-data text-5">Capital: <span className="text-5-light">{capital}</span></p>
			</div>
		</li>
	)
}