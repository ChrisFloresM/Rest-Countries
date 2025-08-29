import SearchBar from "./SearchBar.jsx";
import Filter from "./Filter.jsx";
import styles from './SearchAndFilter.module.css'

export default function SearchAndFilter({ searchVal, onChangeSearch, region, onChangeRegion }) {
	return (
		<section className={styles.mainAppSearchAndFilter}>
			<SearchBar searchVal={searchVal} onChange={onChangeSearch} />
			<Filter region={region} onChange={onChangeRegion}/>
		</section>
	);
}

