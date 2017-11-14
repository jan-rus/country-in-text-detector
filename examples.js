var countryDetector = require("./index.js");

// result is always array of matches (objects)
var result = []

// handles countries in text
result = countryDetector.detect("Hello, I come from Germany!"); // DE

// handles large cities in text
var cities = countryDetector.detect("I just moved from Austin, TX to NYC."); // US-NY, US-TX

// handles local/international names
var local = countryDetector.detect("RU: Я родился в России. EN: I was born in Russia."); // RU

// handles frequent language mutations
var mutations = countryDetector.detect("FR: J'ai vécu en Italie. EN: I lived in Italy."); // IT

// handles special characters and emojis
var special = countryDetector.detect("Adoro❤️ o 🇧🇷Rio~de~Janeiro💃🏼 !"); // BR