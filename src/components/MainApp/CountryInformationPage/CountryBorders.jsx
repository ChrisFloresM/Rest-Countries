import styles from './CountryBorders.module.css'
import useBorders from "../../../hooks/useBorders.jsx";
import BorderElement from "./BorderElement.jsx";

function CountryBorders({ borders }) {

	const [bordersData, isLoading, error] = useBorders(borders);

 return (
	 <>
		 <p className={styles.mainAppBordersTag}>Border countries:</p>
		 <ul className={styles.mainAppBordersList}>
			 { !isLoading && error && <li className={styles.mainAppBordersInfo}>{error}</li> }
			 { isLoading && !error && <li className={styles.mainAppBordersInfo}>{"Loading borders" +
				 " data..."}</li> }
			 { !isLoading && !error && bordersData.map(borderData =>
			 	<BorderElement borderData={borderData} key={borderData.cca3}/>
			 ) }
		 </ul>
	 </>
 );
}

export default CountryBorders;