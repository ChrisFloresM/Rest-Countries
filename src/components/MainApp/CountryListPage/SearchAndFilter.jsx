import SearchBar from "./SearchBar.jsx";
import Filter from "./Filter.jsx";
import styles from './SearchAndFilter.module.css'

export default function SearchAndFilter() {
	return (
		<section className={styles.mainAppSearchAndFilter}>
			<SearchBar />
			<Filter />
		</section>
	);
}

