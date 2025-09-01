import {useState, useEffect} from "react";
import styles from './ButtonTheme.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMoon} from "@fortawesome/free-solid-svg-icons";
import {faSun} from "@fortawesome/free-solid-svg-icons";

export default function ButtonTheme() {
	const [theme, setTheme] = useState(getFromLocalStorage);
	const oppositeTheme = theme === 'light' ? 'Dark' : 'Light';

	const icons = {
		'Dark': faMoon,
		'Light': faSun,
	}

	function handleThemeChange() {
		setTheme(theme => theme === 'light' ? 'dark' : 'light');
	}

	useEffect(function() {
		document.documentElement.dataset.theme = theme;
		setToLocalStorage("theme", theme);
	}, [theme]);

	return (
		<button type="buttom" role="Theme change button" className={`text-6 ${styles.themeChangeButton}`} onClick={handleThemeChange}>
			<span><FontAwesomeIcon icon={icons[oppositeTheme]} /> {`${oppositeTheme} Mode`}</span>
		</button>
	);
}

/* Local storage functions */
function setToLocalStorage(key, item) {
	try {
		localStorage.setItem(key, item);
	} catch(e) {
		console.log(`Error saving to local storage: ${e.message}`);
	}
}

function getFromLocalStorage() {
	return localStorage.getItem("theme") || "light";
}

