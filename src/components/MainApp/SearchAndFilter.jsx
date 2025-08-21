import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

export default function SearchAndFilter({ searchVal, onChangeSearch, region, onChangeRegion }) {
	return (
		<section className="mainApp__searchAndFilter">
			<SearchBar searchVal={searchVal} onChange={onChangeSearch} />
			<Filter region={region} onChange={onChangeRegion}/>
		</section>
	);
}

function SearchBar({ searchVal, onChange }) {
	return (
		<div className="mainApp__search-container">
			<FontAwesomeIcon icon={faMagnifyingGlass} className="mainApp__search-icon"/>
			<input type="text" aria-label="Search for a country" className="text-6 mainApp__search-bar" placeholder="Search for a country..." value={searchVal} onChange={onChange} />
		</div>
	)
}

function Filter({ region, onChange }) {
	return (
		<div className="mainApp__filter-container">
			<select className="mainApp__filter text-6" value={region} onChange={onChange}>
				<option value="">Filter by Region</option>
				<option value="america">America</option>
				<option value="asia">Asia</option>
				<option value="europe">Europe</option>
				<option value="oceania">Oceania</option>
			</select>
		</div>
	);
}