import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

export default function SearchAndFilter() {
	return (
		<section className="mainApp__searchAndFilter">
			<SearchBar />
			<Filter />
		</section>
	);
}

function SearchBar() {
	return (
		<div className="mainApp__search-container">
			<FontAwesomeIcon icon={faMagnifyingGlass} className="mainApp__search-icon"/>
			<input type="text" aria-label="Search for a country" className="text-6 mainApp__search-bar" placeholder="Search for a country..."/>
		</div>
	)
}

function Filter() {
	return (
		<select className="mainApp__filter text-6" >
			<option>Filter by Region</option>
			<option>América</option>
			<option>Asia</option>
			<option>Europe</option>
			<option>Oceania</option>
		</select>
	);
}