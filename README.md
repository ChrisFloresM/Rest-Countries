# REST Countries application

Web application based on React to display countries information by consumir the REST countries API.

## Practice and reinforce:
The main purpose of this projects is to practice some advance topics of react:
* State management with Context API
* Conditional rendering
* Local storage interaction with useEffect hook
* CSS modules
* Routing and navigation with React Router
* Usage of cache memory (Simulated with a HashMap) to prevent redundant HTTP Requests

## Technologies:
1. HTML
2. CSS Modules
3. Vanilla JavaScript + React
4. React Router
5. Context API

## Main features:
1. Search countries by name or filter by region.
2. If a region is selected and a search is triggered by writing name, the search is performed under the selected region.
3. Error handling with user feedback.
4. Page navigation to display country information and navigate between border countries.
5. Theme toggle feature with local storage to keep setting among reloadings.

## How to use
1. Type a country name or select a region
2. If the country is found, the country will be displayed. If a region was selected, the whole countries from the region will be displayed.
3. Click on a country to display detailed information of the country
4. Click on the "back" button to go to the previous page, or click on a border country to navigate to the selected border country page.

## **Desktop preview:**
![demo-desktop](https://github.com/user-attachments/assets/6a40b2d8-6c5a-4f9f-8ab3-db61257070d4)

## **Mobile preview:**
![demo-mobile](https://github.com/user-attachments/assets/e45349bc-f2ce-4968-a4fd-579ec0eb8b43)

## Live site url:
https://cf-restcountries.netlify.app/
