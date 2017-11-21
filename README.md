# Country in Text Detector

![npm](https://img.shields.io/npm/v/country-in-text-detector.svg) ![license](https://img.shields.io/npm/l/country-in-text-detector.svg) ![github-issues](https://img.shields.io/github/issues/jan-rus/country-in-text-detector.svg) ![NPM Downloads](https://img.shields.io/npm/dt/country-in-text-detector.svg)

This module detects countries that appear/are mentioned in given text. It uses
names of countries and almost 500 large cities and returns *ISO 3166-1 code*
of country, its *name* and *list of matches* found in the text. Module can
recognise international and local names, some of them in more language mutations,
such as EN, ES, FR, DE, CZ.

Handles special characters, flags and emojis, so you can analyse any text
without need of preprocessing.


## Installation (NPM)

	npm install --save country-in-text-detector


## Examples

You can also find these examples in *examples.js* file.

```javascript
var countryDetector = require("country-in-text-detector");

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
```