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

module.exports.getURLArguments = function(url) {

	let vars = {};

	url.replace(
		/[?&]+([^=&]+)=([^&]*)/gi,
		function(m, key, value) {
			vars[decodeURIComponent(key)] = decodeURIComponent(value);
		}
	);

	return vars;
}

module.exports.toHTTP = function(json) {

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

module.exports.toJSON = function(http) {

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

if(getPlatform() == "node") {

	var unirest = require("unirest");

	var getResponse = function(res) {

		if(res.caseless != null)
			Object.assign(res.headers, res.caseless.dict);

		let responseBody = res.raw_body;

		if(typeof responseBody == "object")
			responseBody = JSON.stringify(responseBody);

		return {
			response: {
				version: "",
				status: res.status
			},
			headers: res.headers,
			body: responseBody
		}
	}

	module.exports.sendRequest = async function(request, callback) {

		if(callback == null) {

			var response = { };

			await unirest(request.request.method, request.request.uri).
				headers(request.headers != null ? request.headers : { }).
				strictSSL(false).send(request.body != null ? request.body : "").
				then((res) => {
					response = getResponse(res);
				});

			return response;
		}

		unirest(request.request.method, request.request.uri).
			headers(request.headers != null ? request.headers : { }).
			strictSSL(false).send(request.body != null ? request.body : "").
			then((res) => {
				callback(getResponse(res));
			});

		return null;
	}
}

else {

	var getResponse = async function(res) {

		return {
			response: {
				version: "",
				status: res.status
			},
			headers: res.headers,
			body: await res.text()
		};
	}

	module.exports.sendRequest = async function(request, callback) {

		if(callback == null) {

			var response = { };

			await fetch(
				request.request.uri,
				{
					method: request.request.method,
					headers: request.headers,
					body: request.body
				}
			).then((res) => {
				return getResponse(res);
			}).then((res) => {
				response = res;
			});

			return response;
		}

		fetch(
			request.request.uri,
			{
				method: request.request.method,
				headers: request.headers,
				body: request.body
			}
		).then((res) => {
			return getResponse(res);
		}).then((res) => {
			callback(res);
		});

		return null;
	}
}