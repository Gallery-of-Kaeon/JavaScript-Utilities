var io = require("./io.js");

function staticLoad(path) {

    var script = document.createElement("script");

    script.text = io.open(path);
    document.head.appendChild(script).parentNode.removeChild(script);
}

module.exports = {
	staticLoad
};