import styles from './BackButton.module.css'
import {Link} from "react-router-dom";

function BackButton() {
 return (
	 <Link to={'/'}>
		 <button className={`text-5 ${styles.backBtn}`}>&larr; Back</button>
	 </Link>
 );
}

export default BackButton;