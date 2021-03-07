var ui = require("https://raw.githubusercontent.com/Library-of-Kaeon/Library-of-Kaeon/master/Library%20of%20Kaeon/3%20-%20Collection/1%20-%20Original/1%20-%20Computation/1%20-%20APIs/4%20-%20Utilities/3%20-%20UI/1%20-%20Visual/1%20-%20General/1%20-%20UI/1%20-%20JavaScript/1%20-%20Source/ui.js");

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