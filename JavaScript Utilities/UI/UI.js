function loadStyle(path) {
	
	let link = document.createElement("link");

	link.setAttribute("rel", "stylesheet");
	link.setAttribute("type", "text/css");
	link.setAttribute("href", path);

	document.head.appendChild(link);
}

function create(tag, className, id) {

	let element = document.createElement(tag);

	if(className != null)
		element.className = className;

	if(id != null)
		element.id = id;

	require("./style.js").style(element);

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

function specify(element, attribute) {

	if(Array.isArray(attribute)) {

		for(let i = 0; i < attribute.length; i++)
			element.setAttribute(attribute[i][0], attribute[i][1]);
	}

	else
		element.setAttribute(attribute[0], attribute[1]);

	return element;
}

module.exports = {

	loadStyle,
	create,
	fill,
	extend,
	specify
};