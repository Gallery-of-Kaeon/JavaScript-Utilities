var fs = require('fs');
var readline = require('readline-sync');

function getInput(query) {
	return readline.question(query != null ? query : "");
}

function open(file) {
	return fs.readFileSync(file, 'utf8');
}

function save(content, file) {
	fs.writeFileSync(file, content);
}

module.exports = {

	getInput,
	open,
	save
};