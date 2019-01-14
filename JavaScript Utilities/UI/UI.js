var styles = [];

function load() {
	
	for(let i = 0; i < arguments.length; i++) {

		if(!Array.isArray(arguments[i]))
			arguments[i] = [arguments[i]];

		for(let j = 0; j < arguments[i].length; j++) {

			if(arguments[i][j].endsWith(".js"))
				loadScript(arguments[i][j]);

			if(arguments[i][j].endsWith(".css"))
				loadStyle(arguments[i][j]);
		}
	}
}

function loadStyle(path) {
	
	let link = document.createElement("link");

	link.setAttribute("rel", "stylesheet");
	link.setAttribute("type", "text/css");
	link.setAttribute("href", path);

	document.head.appendChild(link);
}

function loadScript(path) {

	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", path, false);

	var allText = "";

	rawFile.onreadystatechange = function() {

		if(rawFile.readyState === 4) {

			if(rawFile.status === 200 || rawFile.status == 0) {
				allText = rawFile.responseText;
			}
		}
	}

	rawFile.send(null);
	
	let script = document.createElement("script");
	script.text = allText;
	
	document.head.appendChild(script).parentNode.removeChild(script);
}

function create(tag, className, id) {

	let element = document.createElement(tag);

	if(className != null)
		element.className = className;

	if(id != null)
		element.id = id;

	for(let i = 0; i < styles.length; i++)
		styles[i](element);

	return element;
}

function fill(element, content) {

	element.innerHTML = content;

	return element;
}

function extend(element, child) {

	if(Array.isArray(child)) {

		for(let i = 0; i < child.length; i++)
			element.appendChild(child[i]);
	}

	else
		element.appendChild(child);

	return element;
}

function specify(element, attribute, extend) {

	if(Array.isArray(attribute[0])) {

		for(let i = 0; i < attribute.length; i++) {
		
			element.setAttribute(
				attribute[i][0],
				extend ?
					element.getAttribute(attribute[i][0]) + attribute[i][1] :
					attribute[i][1]);
		}
	}

	else {
	
		element.setAttribute(
			attribute[0],
			extend ?
				element.getAttribute(attribute[0]) + attribute[1] :
				attribute[1]);
	}

	return element;
}

module.exports = {

	styles,
	load,
	loadStyle,
	loadScript,
	create,
	fill,
	extend,
	specify
};