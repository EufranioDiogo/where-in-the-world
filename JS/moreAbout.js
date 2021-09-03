import { getActiveTheme, switchTheme, wearTheme }  from './theme.js';

const BASE_API_URL = 'https://restcountries.eu';
const API_VERSION_AND_TYPE = '/rest/v2';
const API_END_POINT_SEARCH_BY_NAME = '/name';

const app = new Vue({
    el: '#app',
    data: {
        country: [],
        isDark: getActiveTheme()
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
                    })
                    .catch((err) => {
                        console.log(err);
                        alert(err)
                    })
            } else {
                alert("error not valid country name");
            }
        },
        themeChange: function () {
            this.isDark = !this.isDark;
            switchTheme(this.isDark);
            wearTheme('../')
        },
        goBack: function () {
            window.location.assign('/index.html');
        }
    }
})

const countryName = decodeURI(window.location.href.split('?')[1].split('=')[1])

app.searchCountryByName(countryName);


wearTheme('../');
