//https://restcountries.eu
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




const app = new Vue({
    el: '#app',
    data: {
        countries: [],
        selectedRegion: 'all',
        countryToSearch: ''
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
        searchCountryByName: function() {
            if (this.countryToSearch.trim() != '') {
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
        }
    }
})

app.getAllCountries();




