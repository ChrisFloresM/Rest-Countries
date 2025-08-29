import {useState} from "react";
import styles from './ButtonTheme.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMoon} from "@fortawesome/free-solid-svg-icons";

export default function ButtonTheme() {
	const [theme, setTheme] = useState('light');
	const oppositeTheme = theme === 'light' ? 'Dark' : 'Light';

	return (
		<button type="buttom" role="Theme change button" className={`text-6 ${styles.themeChangeButton}`}>
			<span><FontAwesomeIcon icon={faMoon} /> {`${oppositeTheme} Mode`}</span>
		</button>
	);
}