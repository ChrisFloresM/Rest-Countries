import styles from './CountryBorders.module.css'
import useBorders from "../../hooks/useBorders.jsx";
import BorderElement from "./BorderElement.jsx";

function CountryBorders({ borders }) {

	const bordersData = useBorders(borders);

 return (
	 <>
		 <p className={styles.mainAppBordersTag}>Border countries:</p>
		 <ul className={styles.mainAppBordersList}>
			 { bordersData.map(borderData =>
			 	<BorderElement borderData={borderData} key={borderData.cca2}/>
			 )}
		 </ul>
	 </>
 );
}

export default CountryBorders;