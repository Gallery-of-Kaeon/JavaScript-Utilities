var one = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/APIs/ONE/JavaScript/ONE.js");
var onePlus = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/ONEPlus.js");

var kaeonFUSION = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/KaeonFUSION.js");

var universalPreprocessor = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/UniversalPreprocessor.js");

function parse(string) {

	return one.toList(
		onePlus.readONEPlus(
			preprocess(
				string.split("\r").join("")
			)
		)
	);
}

function preprocess(string) {
	return universalPreprocessor.preprocess(string);
}

function process(code, fusion) {

	code =
		Array.isArray(code) ?
			one.toElement(code) :
			one.toElement(parse("" + code));

	if(fusion == null) {

		start = true;

		fusion = { fusion: new kaeonFUSION.KaeonFUSION() };
	}

	else if(fusion.fusion == null) {

		start = true;

		fusion.fusion = new kaeonFUSION.KaeonFUSION();
	}

	fusion.fusion.internalProcess(code);

	return fusion.fusion.returnValue;
}

function write(element) {
	return one.writeONE(one.toElement(element));
}

module.exports = {
	parse,
	preprocess,
	process,
	write
}