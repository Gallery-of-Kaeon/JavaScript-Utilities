var CORSProxy = "https://cors-anywhere.herokuapp.com/";

function getPlatform() {

	if(typeof process === 'object') {

		if(typeof process.versions === 'object') {

			if(typeof process.versions.node !== 'undefined') {
				return "node";
			}
		}
	}

	return "browser";
}

function getURLArguments(url) {

	let vars = {};

	url.replace(
		/[?&]+([^=&]+)=([^&]*)/gi,
		function(m, key, value) {
			vars[decodeURIComponent(key)] = decodeURIComponent(value);
		}
	);

	return vars;
}

function toHTTP(json) {

	let http = "";

	if(json.request != null) {

		http += json.request.method + " ";
		http += json.request.uri;

		if(json.request.version != null)
			http += " " + json.request.version;
	}

	else {

		if(json.response.version != null)
			http += " " + json.response.version;

		if(json.response.status != null)
			http += " " + json.response.status;

		if(json.response.reason != null)
			http += " " + json.response.reason;
	}

	if(json.headers != null) {

		let keys = Object.keys(json.headers);

		for(let i = 0; i < keys.length; i++)
			http += "\n" + keys[i] + ": " + json.headers[keys[i]];
	}

	if(json.body != null)
		http += "\n\n" + json.body;

	return http;
}

function toJSON(http) {

	let json = { };

	let lines = http.split("\n");
	let definition = lines[0].split(" ");

	if(!definition[0].includes("/")) {

		json.request = {
			method: definition[0],
			uri: definition[1]
		};

		if(definition.length >= 3)
			json.request.version = definition[2];
	}

	else {

		json.response = {
			version: definition[0],
			status: definition[1]
		};

		if(definition.length >= 3) {

			json.response.reason = lines[0].substring(
				definition[0].length + definition[1].length + 2
			);
		}
	}

	for(let i = 1; i < lines.length; i++) {

		if(lines[i].trim() != "") {

			if(json.headers == null)
				json.headers = { };

			let alias = lines[i].substring(0, lines[i].indexOf(":")).trim();
			let value = lines[i].substring(lines[i].indexOf(":") + 1).trim();

			json.headers[alias] = value;
		}

		else {

			json.body = lines.slice(i + 1).join("\n");

			break;
		}
	}

	return json;
}

function sendRequest(request, callback) {

	let call = null;

	if(getPlatform() == "node")
		call = new (require("xmlhttprequest").XMLHttpRequest)();
		
	else {

		call = new XMLHttpRequest();

		if(CORSProxy != null)
			request.request.uri = CORSProxy + request.request.uri;
	}

	call.open(request.request.method, request.request.uri, callback != null);

	if(request.headers != null) {
		
		let keys = Object.keys(request.headers);

		for(let i = 0; i < keys.length; i++)
			call.setRequestHeader(keys[i], request.headers[keys[i]]);
	}
	
	var response = {
		response: { version: "", status: "" },
		headers: { },
		body: ""
	};
	
	call.onreadystatechange = function() {
	
		if(call.readyState === 4) {

			response.response.status = call.status;

			let headers = call.getAllResponseHeaders().trim();

			if(headers != null) {

				headers = headers.split("\r\n");

				for(let i = 0; i < headers.length; i++) {

					let header = headers[i].split(":");

					response.headers[header[0].trim()] = header[1].trim();
				}
			}
	
			response.body = call.responseText;

			if(callback != null)
				callback(response);
		}
	}
	
	call.send(request.body);
	
	if(callback == null)
		return response;
}

module.exports = {
	CORSProxy,
	getURLArguments,
	toHTTP,
	toJSON,
	sendRequest
};