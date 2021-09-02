const BASE_API_URL = 'https://restcountries.eu';
const API_VERSION_AND_TYPE = '/rest/v2';
const API_END_POINT_SEARCH_BY_NAME = '/name';

const app = new Vue({
    el: '#app',
    data: {
        country: [],
    },
    methods: {
        convertNumberToReadbleFormat: function (number) {
            return number.toLocaleString('pt-br', { minimumFractionDigits: 2 })
        },
        searchCountryByName: function (name) {
            if (name != '') {
                fetch(BASE_API_URL + API_VERSION_AND_TYPE + API_END_POINT_SEARCH_BY_NAME + '/' + name)
                    .then((res) => res.json())
                    .then((data) => {
                        this.country = data[0];
                        console.log(this.country)
                    })
                    .catch((err) => {
                        console.log(err);
                        alert(err)
                    })
            } else {
                alert("error not valid country name");
            }
        }
    }
})

const countryName = decodeURI(window.location.href.split('?')[1].split('=')[1])

app.searchCountryByName(countryName);





let darkModeOn = false;

document.querySelector('.dark-ligth-mode-button').onclick = () => {
    document.querySelectorAll('link')[0].href = !darkModeOn ? '../CSS/dark-variables.css' : '../CSS/ligth-variables.css';
    darkModeOn = !darkModeOn;
    document.querySelector('.dark-ligth-mode-button').innerText = !darkModeOn ? 'Dark Mode' : 'Light Mode';

    document.querySelector('.dark-ligth-mode-icon').src = !darkModeOn ? '../IMAGES/moon-black.svg' : '../IMAGES/sun-white.svg';

    document.querySelector('.search-icon').src = !darkModeOn ? '../IMAGES/search-black.svg' : '../IMAGES/search-white.svg';
}
