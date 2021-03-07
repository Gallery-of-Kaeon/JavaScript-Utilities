var defaultXMLHttpRequest = window.XMLHttpRequest;
var defaultFetch = window.fetch;

function onLog(callback) {
	console.log = callback;
}

function onSend(callback) {

	window.XMLHttpRequest = class {

		constructor() {

			this.request = {
				request: {
					method: "",
					uri: ""
				},
				headers: {

				},
				body: null
			};

			Object.assign(this.XMLHttpRequest, Object.create(new defaultXMLHttpRequest()));
		}

		open(method, uri, sync) {

			this.request.request.method = method;
			this.request.request.uri = uri;

			this.open(method, uri, sync);
		}

		setRequestHeader(name, value) {

			this.request.headers[name] = value;

			this.setRequestHeader(name, value);
		}

		send(body) {

			this.request.body = body;

			let response = callback(this.request);

			if(response != null)
				return response;
				
			this.send(body);
		}
	}

	window.fetch = (uri, options) => {

		options = options != null ? options : { };

		let request = {
			request: { method: options.method != null ? options.method : "GET", uri: uri },
			headers: options.headers,
			body: options.body
		}

		let response = callback(request);

		return callback == null ?
			defaultFetch(url) :
			new Promise(
				(resolve) => {
					resolve({ text: () => { return response; } });
				}
			);
	}
}

module.exports = {
	onLog,
	onSend
};