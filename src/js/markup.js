export function onCountryListMarkup(countries){
     return countries.map(({name,flags,}) =>
     `<li class='country-list'>
          <img src='${flags.svg}' alt='${name.official}' width = '80' height: '100'>
          <p>${name.official}</p>
        </li>`
     ).join('');
}

export function onCountryCardMarkup(countries){
    return countries.map(({name, capital, population, languages, flags })=>
    `<h1 class='country-title'>
        <img class = 'country-flag' width = '100' height: '120' src='${flags.svg}' 
        alt='${name.official}'>
        <p>${name.official}</p> 
      </h1> 
      <ul> 
        <li class='country-item'>Capital: ${capital}</li> 
        <li class='country-item'>Population: ${population}</li> 
        <li class='country-item'>Languages: ${Object.values(languages)}</li> 
      </ul>`).join('')
    }
