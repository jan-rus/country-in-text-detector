var countryDetector = require("./index.js");

// handles countries in text, result is array of matches (objects)
var result = countryDetector.detect("Hello, I come from Germany!");
/*
[
	{ iso3166: 'DE', name: 'Germany', type: 'country', matches: [ 'Germany' ] }
]
*/

// handles large cities in text
var cities = countryDetector.detect("I just moved from Austin, TX to NYC.");
/*
[
	{ iso3166: 'US-NY', name: 'New York City', countryName: 'New York',  type: 'city', matches: [ 'NYC' ] },
	{ iso3166: 'US-TX', name: 'Austin', countryName: 'Texas', type: 'city', matches: [ 'Austin, TX' ] }
]
*/

// handles local/international names
var local = countryDetector.detect("RU: Я родился в России. EN: I was born in Russia.");
/*
[
	{ iso3166: 'RU', name: 'Russia', type: 'country', matches: [ 'России', 'Russia' ] }
]
*/

// handles frequent language mutations
var mutations = countryDetector.detect("FR: J'ai vécu en Italie. EN: I lived in Italy.");
/*
[
	{ iso3166: 'IT', name: 'Italy', type: 'country', matches: [ 'Italie', 'Italy' ] }
]
*/

// handles special characters and emojis
var special = countryDetector.detect("Adoro❤️ o 🇧🇷Rio~de~Janeiro💃🏼 !");
/*
[
	{ iso3166: 'BR', name: 'Rio de Janeiro', countryName: 'Brazil', type: 'city', matches: [ 'Rio~de~Janeiro' ] }
]
*/