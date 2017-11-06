var io = require("./lib/io.js");
var COUNTRIES = io.loadCoutries();

function detect(str) {
	var result = [];
	for(var i = 0; i < COUNTRIES.length; i++){
		var matches = str.match(COUNTRIES[i].string_match);
		if(!(typeof matches === "undefined" || matches === null)) {
			matches = matches.map(function(m){return io.trim(m);});
			result.push({
				iso3166: COUNTRIES[i]["country_iso_3166-1_alpha-2"],
				name: COUNTRIES[i].country_name,
				matches: matches
			});
		}
	}

	return result;
}

module.exports.detect = detect;