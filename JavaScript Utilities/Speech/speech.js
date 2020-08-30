window.speechSynthesis.getVoices();

var recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.listening = false;

function speak(text, settings) {

	setTimeout(
		function() {
	
			if(text.trim() == "")
				return;
		
			settings = settings != null ? settings : { };
		
			let voices = window.speechSynthesis.getVoices();
			let utterance = new SpeechSynthesisUtterance(text);
		
			for(let i = 0; i < voices.length && settings.voice != null; i++) {
		
				if(voices[i].voiceURI.toLowerCase() == settings.voice.trim().toLowerCase()) {
		
					utterance.voice = voices[i];
		
					break;
				}
			}
		
			utterance.pitch = settings.pitch != null ? settings.pitch : 1;
			utterance.rate = settings.rate != null ? settings.rate : 1;
		
			window.speechSynthesis.speak(utterance);
		},
		1
	);
}

function isSpeaking() {
	return window.speechSynthesis.speaking;
}

function stopSpeaking() {
	window.speechSynthesis.canel();
}

function listen(callback) {

	callback = Array.isArray(callback) ? callback : [callback];

	if(recognition.listening)
		recognition.abort();

	recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	
	recognition.onresult = function(event) {

		for(let i = 0; i < callback.length; i++) {

			callback[i](
				event.results[event.results.length - 1][0].transcript.trim()
			);
		}
	}
	
	recognition.start();

	recognition.listening = true;
}

function stopListening() {

	if(recognition.listening)
		recognition.abort();

	recognition.listening = false;
}

function getVoices() {

	let voices = window.speechSynthesis.getVoices();
	let voiceList = [];

	for(let i = 0; i < voices.length; i++)
		voiceList.push(voices[i].voiceURI);

	voiceList.sort();

	return voiceList;
}

module.exports = {
	speak,
	isSpeaking,
	stopSpeaking,
	listen,
	stopListening,
	getVoices
};