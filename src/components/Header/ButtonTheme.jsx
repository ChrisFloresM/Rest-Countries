import {useState} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMoon} from "@fortawesome/free-solid-svg-icons";

export default function ButtonTheme() {
	const [theme, setTheme] = useState('light');
	const oppositeTheme = theme === 'light' ? 'Dark' : 'Light';

	return <button type="buttom" role="Theme change button" className="text-6 theme-change-button">
		<span><FontAwesomeIcon icon={faMoon} /> {`${oppositeTheme} Mode`}</span>
	</button>
}