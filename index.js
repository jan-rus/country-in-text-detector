var io = require("./lib/io.js");
var COUNTRIES = io.loadCoutries();
var CITIES = io.loadCities();

function deletePrePostfixes(arr1, arr2){
	var lastJ = 0;
	for(var i = 0; i < arr1.length; i++){
		for(var j = lastJ; j < arr2.length; j++){
			if(arr1[i].length > arr2[j].length && (arr1[i].startsWith(arr2[j]) || arr1[i].endsWith(arr2[j]))){
				arr2.splice(j, 1);
				lastJ = j;
				i++;
				break;
			}
			if(arr1[i].length < arr2[j].length && (arr2[j].startsWith(arr1[i]) || arr2[j].endsWith(arr1[i]))){
				arr1.splice(i, 1);
				lastJ = j;
				i++;
				break;
			}
		}
	}
}

function detect(str) {
	var clean = " " + io.cleanFromSpecials(str);
	var result = [];
	for(var i = 0; i < COUNTRIES.length; i++){
		if(typeof COUNTRIES[i].string_match === "undefined" || COUNTRIES[i].string_match === null){continue;}
		var matches = clean.match(COUNTRIES[i].string_match);
		if(!(typeof matches === "undefined" || matches === null)) {
			matches = matches.map(function(m){return m.substring(1);});
			result.push({
				iso3166: COUNTRIES[i]["country_iso_3166-1_alpha-2"],
				name: COUNTRIES[i].country_name,
				type: "country",
				matches: matches
			});
		}
	}

	for(var i = 0; i < CITIES.length; i++){
		var matches = clean.match(CITIES[i].string_match);
		if(!(typeof matches === "undefined" || matches === null)) {
			matches = matches.map(function(m){return m.substring(1);});
			result.push({
				iso3166: CITIES[i]["country_iso_3166-1_alpha-2"],
				name: CITIES[i].city_name,
				countryName: CITIES[i].country_name,
				type: "city",
				matches: matches
			});
		}
	}

	// fallback for prefixes / postfixes
	// if two results A and B have same name and same type
	// and one of them (A) has match that is prefix of match of the other one (B)
	// remove the shorter match (prefix)
	for(var i = 0; i < result.length;i++){
		for(var j = i+1; j < result.length;j++){
			if(result[i].name == result[j].name && result[i].type == result[j].type){
				deletePrePostfixes(result[i].matches, result[j].matches);
			}
		}
	}

	result = result.filter(function(r){return r.matches.length;});

	return result;
}

module.exports.detect = detect;