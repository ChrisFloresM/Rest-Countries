import styles from './Header.module.css'

import ButtonTheme from "./ButtonTheme.jsx";

export default function Header() {
	return (
		<header className={styles.appHeader}>
			<div className={styles.appHeaderTitleContainer}>
				<h1 className={`text-2 ${styles.appHeaderTitle}`}>Where in the world?</h1>
				<ButtonTheme />
			</div>
		</header>
	);
}