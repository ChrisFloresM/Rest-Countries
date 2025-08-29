import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

import styles from './SearchBar.module.css'

export default function SearchBar({ searchVal, onChange }) {
	return (
		<div className={styles.mainAppSearchContainer}>
			<FontAwesomeIcon icon={faMagnifyingGlass} className={styles.mainAppSearchIcon}/>
			<input type="text" aria-label="Search for a country" className={`text-6 ${styles.mainAppSearchBar}`} placeholder="Search for a country..." value={searchVal} onChange={onChange} />
		</div>
	)
}