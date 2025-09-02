import {useNavigate} from "react-router-dom";
import styles from './BorderElement.module.css'

function BorderElement({ borderData }) {
	const { name, cca2 } = borderData;
	const navigate = useNavigate();

	function handleClick() {
		navigate(`/country/${cca2}`);
	}

 return (
  <li>
		<button className={styles.borderButton} onClick={handleClick}>{name}</button>
	</li>
 );
}

export default BorderElement;