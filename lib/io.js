var fs = require("fs");

var SEPARATORS = "[\\s,\\.\\+\\*\\?\\[\\]\\^\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:\\-\\d\\/@#~&_;'\"%❤®ⓥ•｜\\\\]|[\\u2000-\\uffff]|[\\u1000-\\uffff]{2,}";
var TRIM = RegExp("^(" + SEPARATORS + ")+|(" + SEPARATORS + ")+$", "ig");

function strToReg(str) {
	str = str.replace(/\[&\]/gi, " (&|and|und) ");
	str = str.replace(/City/gi, "(City)?");
	str = str.replace(/[\s-']+/gi, "(" + SEPARATORS + ")?");
	str = str.replace(/\[[aáâãäåàāă]\]/gi, "[aáâãäåàāă]");
	str = str.replace(/\[[eéêëěèēĕėę]\]/gi, "[eéêëěèēĕėę]");
	str = str.replace(/\[[iíîïìĩīĭįıįİ]\]/gi, "[iíîïìĩīĭįıįİ]");
	str = str.replace(/\[[yýÿŷ]\]/gi, "[yýÿŷ]");
	str = str.replace(/\[[oóôõöòōŏő]\]/gi, "[oóôõöòōŏő]");
	str = str.replace(/\[[uúûüùũūŭůű]\]/gi, "[uúûüùũūŭůű]");
	str = str.replace(/\[[cćĉċč]\]/gi, "[cćĉċč]");
	str = str.replace(/\[[dďđ]\]/gi, "[dďđ]");
	str = str.replace(/\[[gĝğġģ]\]/gi, "[gĝğġģ]");
	str = str.replace(/\[[lĺłŀľ]\]/gi, "[lĺłŀľ]");
	str = str.replace(/\[[rŕř]\]/gi, "[rŕř]");
	str = str.replace(/\[[sśŝşš]\]/gi, "[sśŝşš]");
	str = str.replace(/\[[tţťŧ]\]/gi, "[tţťŧ]");
	str = str.replace(/\[[zźżž]\]/gi, "[zźżž]");
	str = str.replace(/\[[nñňńņŉ]\]/gi, "[nñňńņŉ]");

	return str;
}

function loadCSV(path, separator) {
	var file = fs.readFileSync(path, "utf8");
	var lines = file.split("\n");

	// first line contains name of colls, extract
	// them as keys and skip the line
	var keys = lines[0].split(separator);
	keys = keys.map(function(key){ return key.trim();});
	lines[0] = "";

	// parse all not empty lines
	var result = [];
	for(var l = 0; l < lines.length; l++){
		if(lines[l].length > 0){
			var entries = lines[l].split(separator);
			if(typeof entries !== 'undefined' && entries !== null && entries.length > 0) {
				var entry = {};
				for(var i = 0; i < entries.length; i++){
					if(typeof entries[i] !== 'undefined' && entries[i] !== null && entries[i].length > 0) {
						entry[keys[i]] = entries[i].trim();
					}
				}
				result.push(entry);
			}
		}
	}

	return result;
}

function processCSV(rows) {
	rows = rows.map(function(c){
		var options = c.string_match.split(",");
		options = options.map(function(option){return strToReg(option.trim());});
		c.string_match = RegExp("(?:^|" + SEPARATORS + ")(" + options.join('|') + ")(?=" + SEPARATORS + "|$)", "ig");
		
		return c;
	});
	
	return rows;
}

function loadCoutries(){
	var countries = loadCSV(__dirname + "/../data/countries.csv", ";");
	return processCSV(countries);
}

function loadCities(){
	var cities = loadCSV(__dirname + "/../data/cities.csv", ";");
	return processCSV(cities);
}

function trim(str) {
	str = str.replace(TRIM, " ");
	str = str.trim();
	return str;
}

module.exports.loadCoutries = loadCoutries
module.exports.loadCities = loadCities
module.exports.trim = trim