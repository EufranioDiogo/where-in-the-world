import { getActiveTheme, switchTheme, wearTheme } from './theme.js';

const BASE_API_URL = 'https://restcountries.eu';
const API_VERSION_AND_TYPE = '/rest/v2';
const API_END_POINT_ALL_COUNTRIES = '/all';
const API_END_POINT_SEARCH_BY_NAME = '/name'
const API_END_POINT_SEARCH_BY_REGION = '/region';
const FIELD_TO_ASK_IN_REQUEST = 'fields=name;capital;population;flag;region'
/* 
Response object of country
    alpha2Code: "AF"
    alpha3Code: "AFG"
    altSpellings: Array(2)
    area: 652230
    borders: Array(6)
    callingCodes: Array(1)
    capital: "Kabul"
    cioc: "AFG"
    currencies: Array(1)
    demonym: "Afghan"
    flag: "https://restcountries.eu/data/afg.svg"
    gini: 27.8
    languages: Array(3)
    latlng: Array(2)
    name: "Afghanistan"
    nativeName: "افغانستان"
    numericCode: "004"
    population: 27657145
    region: "Asia"
    regionalBlocs: Array(1)
    subregion: "Southern Asia"
    timezones: Array(1)
    topLevelDomain: Array(1)
    translations: Object
        br: "Afeganistão"
        de: "Afghanistan"
        es: "Afganistán"
        fa: "افغانستان"
        fr: "Afghanistan"
        hr: "Afganistan"
        it: "Afghanistan"
        ja: "アフガニスタン"
        nl: "Afghanistan"
        pt: "Afeganistão
*/

const countryComponent = {
    props: ['country'],
    template: `
    <div @click="clickOnCountry" class="country-element-container">
        <img :src="country.flag" :alt="country.name + 'flag'" class="country-flag-image">

        <div class="country-info-container">
            <h3 class="u-heading-3 country-name">{{ country.name }}</h3>

            <ul class="country-small-info-list">
                <li class="country-small-info-list--item">
                    <span class="country-small-info-list--item-property">Population:</span>
                    {{ convertNumberToReadbleFormat(country.population) }}
                </li>

                <li class="country-small-info-list--item">
                    <span class="country-small-info-list--item-property">Region:</span>
                    {{ country.region }}
                </li>

                <li class="country-small-info-list--item">
                    <span class="country-small-info-list--item-property">Capital:</span>
                    {{ country.capital }}
                </li>
            </ul>
        </div>
    </div>
   `,
    data: function () {
        return {
        }
    },
    methods: {
        convertNumberToReadbleFormat: function (number) {
            return number.toLocaleString('pt-br', { minimumFractionDigits: 2 })
        },
        clickOnCountry: function () {
            window.location.assign('HTML/more-about.html?countryname=' + this.country.name);
        }
    }
}

const app = new Vue({
    el: '#app',
    data: {
        countries: [],
        selectedRegion: 'all',
        countryToSearch: '',
        isDark: getActiveTheme()
    },
    methods: {
        convertNumberToReadbleFormat: function (number) {
            return number.toLocaleString('pt-br', { minimumFractionDigits: 2 })
        },
        getAllCountries: function () {
            fetch(BASE_API_URL + API_VERSION_AND_TYPE + API_END_POINT_ALL_COUNTRIES + "?" + FIELD_TO_ASK_IN_REQUEST)
                .then((res) => res.json())
                .then((data) => {
                    this.countries = data;
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        searchCountryByName: function () {
            if (this.countryToSearch != '') {
                fetch(BASE_API_URL + API_VERSION_AND_TYPE + API_END_POINT_SEARCH_BY_NAME + '/' + this.countryToSearch)
                    .then((res) => res.json())
                    .then((data) => {
                        this.countries = data;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                this.getAllCountries();
            }
        },
        searchCountryByRegion: function () {
            if (this.selectedRegion.toLowerCase() != 'all') {
                fetch(BASE_API_URL + API_VERSION_AND_TYPE + API_END_POINT_SEARCH_BY_REGION + '/' + this.selectedRegion + "?" + FIELD_TO_ASK_IN_REQUEST)
                    .then((res) => res.json())
                    .then((data) => {
                        this.countries = data;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                this.getAllCountries();
            }
        },
        themeChange: function () {
            this.isDark = !this.isDark;
            switchTheme(this.isDark);
            wearTheme('../')
        }
    },
    components: {
        'country-container': countryComponent
    }
})

app.getAllCountries();
wearTheme('./');