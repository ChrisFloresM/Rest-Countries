import styles from './Filter.module.css'

export default function Filter({ region, onChange }) {
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