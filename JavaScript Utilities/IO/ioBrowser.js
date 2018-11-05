function getInput() {
	return readline();
}

function open(file) {

	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);

	var allText = "";

	rawFile.onreadystatechange = function() {

		if(rawFile.readyState === 4) {

			if(rawFile.status === 200 || rawFile.status == 0) {
				allText = rawFile.responseText;
			}
		}
	}

	rawFile.send(null);

	return allText;
}

function staticLoad(path) {

    var script = document.createElement("script");

    script.text = open(path);
    document.head.appendChild(script).parentNode.removeChild(script);
}

module.exports = {

	getInput,
	open,
	staticLoad
};