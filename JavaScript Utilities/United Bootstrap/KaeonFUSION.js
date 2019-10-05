var philosophersStone = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/Philosophers-Stone/master/Philosopher's%20Stone/API/JavaScript/PhilosophersStone.js");
var fusion = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/FUSION.js");

function Use() {

	philosophersStone.abide(this, new fusion.FUSIONUnit());

	this.tags.push("Use");

	this.fusion = null;

	var reference = this;

	this.verify = function(element) {

		if(reference.fusion == null) {

			reference.fusion =
				philosophersStone.retrieve(
					philosophersStone.traverse(reference),
					function(item) {
						return philosophersStone.isTagged(item, "FUSION");
					}
				)[0];
		}

		return element.content.toLowerCase() == "use";
	}

	this.process = function(element, processed) {

		for(var i = 0; i < element.children.length; i++) {

			try {

				require(element.children[i].content)(reference.fusion);

				reference.fusion.update();
			}

			catch(error) {
				
			}
		}

		return null;
	}
}

function KaeonFUSION() {

	philosophersStone.abide(this, new fusion.FUSION());

	this.tags.push("Kaeon FUSION");

	philosophersStone.connect(this, new Use(), [], true);
}

module.exports = {

	Use,
	KaeonFUSION
};