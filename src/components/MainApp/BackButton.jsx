import styles from './BackButton.module.css'
import {Link, useNavigate} from "react-router-dom";

function BackButton() {
	const navigate = useNavigate();

	function handleClick() {
		navigate(-1);
	}

 return (
	 <button onClick={handleClick} className={`text-5 ${styles.backBtn}`}>&larr; Back</button>
 );
}

export default BackButton;