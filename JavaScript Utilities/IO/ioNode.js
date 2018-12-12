var fs = require('fs');
var readline = require('readline-sync');

function getInput() {
	return readline.question("");
}

function open(file) {
	return fs.readFileSync(file, 'utf8');
}

module.exports = {

	getInput,
	open
};