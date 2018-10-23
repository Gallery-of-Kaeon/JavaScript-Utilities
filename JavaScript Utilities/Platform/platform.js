function getPlatform() {

	if(typeof process === 'object') {

		if(typeof process.versions === 'object') {

			if(typeof process.versions.node !== 'undefined') {
				platform = "Node";
			}
		}
	}

	return "Browser";
}

module.exports = {
	getPlatform
};