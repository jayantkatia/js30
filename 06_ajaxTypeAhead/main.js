const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const places=[];
const searchInput =document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

fetch(endpoint).then(blob=>blob.json()).then(data=>places.push(...data));

function findMatches(wordToMatch,places){
    const regEx = new RegExp(wordToMatch,'gi');
    return places.filter(({city,state})=>{
        return city.match(regEx) || state.match(regEx);
    });
}
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');


function displayMatches(){
    const arrayMatches = findMatches(this.value,places);

    const regEx = new RegExp(this.value,'gi');
    
    const html = arrayMatches.map(place=>{
        const cityName = place.city.replace(regEx,`<span class="hl">${this.value}</span>`);
        const stateName = place.city.replace(regEx,`<span class="hl">${this.value}</span>`);
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join('');

    suggestions.innerHTML=html;
}



searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup',displayMatches);