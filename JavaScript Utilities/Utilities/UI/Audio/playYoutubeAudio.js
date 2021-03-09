var moduleDependencies = {
	ui: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/UI/Visual/General/ui.js"
};

var ui = require(moduleDependencies.ui);

function playYoutubeAudio(id, list, loop) {

	playYoutubeAudio.index =
		playYoutubeAudio.index != null ?
			playYoutubeAudio.index : -1;

	playYoutubeAudio.state =
		playYoutubeAudio.state != null ?
			playYoutubeAudio.state : { };

	playYoutubeAudio.index++;

	let player = ui.create({
		tag: "iframe",
		style: { display: "none" },
		attributes: {
			src: "https://www.youtube.com/embed/" +
				id +
				"?autoplay=1" +
				(loop ?
					"&playlist=" +
						(list != null ? list : id) +
						"&loop=1" :
					""
				),
			allow: "autoplay"
		}
	});

	playYoutubeAudio.state["" + playYoutubeAudio.index] = player;

	ui.extend(player);

	return "" + playYoutubeAudio.index;
}

function stopYoutubeAudio(index) {

	ui.remove(playYoutubeAudio.state[index]);

	delete playYoutubeAudio.state[index];
}

module.exports = {
	playYoutubeAudio,
	stopYoutubeAudio
}