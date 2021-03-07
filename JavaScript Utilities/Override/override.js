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

			this.XMLHttpRequest = new defaultXMLHttpRequest();

			this.readyState = 0;
			this.status = 0;

			this.responseText = "";
		}

		open(method, uri, sync) {

			this.request.request.method = method;
			this.request.request.uri = uri;

			this.XMLHttpRequest.open(method, uri, sync);
		}

		setRequestHeader(name, value) {

			this.request.headers[name] = value;

			this.XMLHttpRequest.setRequestHeader(name, value);
		}

		send(body) {

			this.request.body = body;

			let response = callback(this.request)

			if(response != null) {

				this.readyState = 4;
				this.status = 200;

				this.responseText = "" + response;

				if(this.onreadystatechange != null)
					this.onreadystatechange();

				return;
			}

			this.XMLHttpRequest.onreadystatechange = () => {

				this.readyState = this.XMLHttpRequest.readyState;
				this.status = this.XMLHttpRequest.status;

				this.responseText = this.XMLHttpRequest.responseText;

				this.onreadystatechange();
			}

			this.XMLHttpRequest.send(body);
		}

		onreadystatechange() {
				
		}

		addEventListener(type, listener) {
			this.XMLHttpRequest.addEventListener(type, listener);
		}

		removeEventListener(type, listener) {
			this.XMLHttpRequest.removeEventListener(type, listener);
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