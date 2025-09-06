import styles from './Filter.module.css'
import {useSearchAndRegion} from "../../../context/SearchAndRegionContext.jsx";

export default function Filter() {
	const {selectedRegion: region, handleSelectRegion: onChange} = useSearchAndRegion();

	return (
		<div className={styles.mainAppFilterContainer}>
			<select className={`text-6 ${styles.mainAppFilter}`} value={region} onChange={onChange}>
				<option value="">Filter by Region</option>
				<option value="americas">America</option>
				<option value="asia">Asia</option>
				<option value="europe">Europe</option>
				<option value="oceania">Oceania</option>
			</select>
		</div>
	);
}