/* Third party libraries  */
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

/* Module styles */
import styles from './MainApp.module.css'

/* Local components */
import {SearchAndRegionProvider} from "../../context/SearchAndRegionContext.jsx";
import CountriesListPage from "../../Pages/CountriesListPage.jsx";
import CountryInformationPage from "../../Pages/CountryInformationPage.jsx";

export default function MainApp() {
	return (
		<SearchAndRegionProvider>
			<main className={styles.mainApp}>
				<BrowserRouter>
					<Routes>
						<Route index element={<CountriesListPage/>}/>
						<Route path="/country/:cca3" element={<CountryInformationPage/>}/>
					</Routes>
				</BrowserRouter>
			</main>
		</SearchAndRegionProvider>
	)
}










