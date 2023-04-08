import './css/styles.css';
import Notiflix from 'notiflix';
import {onCountryListMarkup} from './js/markup'
import {onCountryCardMarkup} from './js/markup'
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const refs = { 
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryCard: document.querySelector('.country-info'),}


refs.inputField.addEventListener('input', debounce(onSearchCountry, 300))

function onSearchCountry(el){
  el.preventDefault();
  const countryInput = el.target.value.trim();
  if (!countryInput) {
    resetList();
    return;
  }

  fetchCountries(countryInput)
    .then(data => {
      console.log(data)
      if (data.length > 10) {
        resetList()
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 1) {
        resetList()
        const markupCountryList = onCountryListMarkup(data);
        refs.countryList.innerHTML = markupCountryList;
      } else {
        resetList()
        const markupCountryInfo = onCountryCardMarkup(data);
        refs.countryCard.innerHTML = markupCountryInfo;
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return;
    });
};

function resetList() {
  refs.countryList.innerHTML = '';
  refs.countryCard.innerHTML = '';
}


