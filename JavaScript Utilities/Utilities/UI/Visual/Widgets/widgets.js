var ui = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/UI.js");

function createStartScreen(element, text, callback) {

	let button = ui.create(
		{
			tag: "button",
			style: {
				position: "absolute",
				left: "40%",
				top: "45%",
				width: "20%",
				height: "10%",
				background: "white",
				color: "black",
				"border-radius": "25px",
				font: "bold 100% arial"
			},
			content: [
				text
			]
		}
	);

	button.onclick = function() {

		element.innerHTML = "";

		callback(element);
	}
	
	ui.extend(
		element,
		ui.create(
			{
				tag: "div",
				style: {
					position: "absolute",
					left: "0%",
					top: "0%",
					width: "100%",
					height: "100%",
					background: "black"
				},
				content: [
					button
				]
			}
		)
	);
}

function getTextbox(options) {

	options = options != null ? options : { };

	let data = { tag: "textarea", attributes: { }, style: { } };

	if(!options.spellCheck)
		data.attributes["spellcheck"] = "false";

	if(!options.resize)
		data.style["resize"] = "none";

	if(!options.wrap)
		data.style["white-space"] = "pre";

	let text = ui.create(data);

	if(options.readOnly)
		text.readOnly = true;

	else {

		text.addEventListener(
			"keydown",
			function(event) {
	
				let scrollY = text.scrollTop;
					
				let start = this.selectionStart;
				let end = this.selectionEnd;
	
				if(event.keyCode == 9 || event.which == 9) {
	
					event.preventDefault();
	
					if(start != end) {
	
						let value = text.value.substring(start, end).indexOf("\n");
	
						if(value == -1) {
	
							document.execCommand("insertText", false, "\t");
	
							return;
						}
	
						let startValue = start;
	
						while(start > 0) {
							
							if(text.value.charAt(start) == "\n")
								break;
	
							start--;
						}
	
						this.selectionStart = start;
	
						let insert = text.value.substring(start, end);
	
						if(start == 0) {
	
							if(!event.shiftKey)
								insert = "\t" + insert;
							
							else if(
								insert.charAt(0) == "\t" ||
								insert.charAt(0) == "\n") {
	
								insert = insert.substring(1);
							}
						}
	
						if(event.shiftKey)
							insert = insert.split("\n\t").join("\n");
	
						else
							insert = insert.split("\n").join("\n\t");
	
						let shifted =
							insert !=
							text.value.substring(
								this.selectionStart, this.selectionEnd);
	
						document.execCommand("insertText", false, insert);
	
						this.selectionStart =
							startValue +
							(shifted ?
								(event.shiftKey ? -1 : 1) : 0);
	
						this.selectionEnd = start + insert.length;
					}
					
					else
						document.execCommand("insertText", false, "\t");
				}
	
				if(start != end)
					text.scrollTop = scrollY;
			},
			false
		);
	}

	return text;
}

module.exports = {
	createStartScreen,
	getTextbox
};