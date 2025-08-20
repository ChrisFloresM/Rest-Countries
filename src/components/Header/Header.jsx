import ButtonTheme from "./ButtonTheme.jsx";

export default function Header() {
	return (
		<header className="app-header">
			<div className="app-header__title-container">
				<h1 className="text-2 app-header__title">Where in the world?</h1>
				<ButtonTheme />
			</div>
		</header>
	);
}