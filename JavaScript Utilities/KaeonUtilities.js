let reference = {
	js: {
		kaeonACE: {
			kaeonACE: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-ACE/master/Kaeon%20ACE/Source/API/Babylon/KaeonACE.js",
			kaeonACEModules: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-ACE/master/Kaeon%20ACE/Source/API/Babylon/KaeonACEModules.js"
		},
		philosophersStone: {
			philosophersStone: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Philosophers-Stone/master/Philosopher's%20Stone/API/PhilosophersStone.js",
			soul: "https://raw.githubusercontent.com/Gallery-of-Kaeon/SOUL/master/SOUL/API/SOUL.js"
		},
		one: {
			fusion: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/FUSION.js",
			kaeonFUSION: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/KaeonFUSION.js",
			one: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/ONE.js",
			onePlus: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/ONEPlus.js",
			oneSuite: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/ONESuite.js",
			universalPreprocessor: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/universalPreprocessor.js"
		},
		uc: {
			csb: "https://raw.githubusercontent.com/Gallery-of-Kaeon/United-C/main/United%20C/Source/CSB.js",
			uc: "https://raw.githubusercontent.com/Gallery-of-Kaeon/United-C/main/United%20C/Source/UC.js",
			ucc: "https://raw.githubusercontent.com/Gallery-of-Kaeon/United-C/main/United%20C/Source/UCC.js"
		},
		utilities: {
			data: {
				io: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/IO/io.js",
				tokenizer: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Tokenizer/tokenizer.js",
				httpUtils: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/HTTP%20Utils/httpUtils.js"
			},
			application: {
				management: {
					platform: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Platform/platform.js",
					override: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Override/override.js"
				},
				virtualSystem: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Virtual%20System/virtualSystem.js"
			},
			ui: {
				visual: {
					general: {
						ui: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/UI.js",
						input: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/input.js",
						dimensions: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/dimensions.js"
					},
					widgets: {
						widgets: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/widgets.js",
						search: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/search.js"
					}
				},
				audio: {
					speech: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Speech/speech.js",
					playYoutubeAudio: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/YouTube%20Audio/PlayYoutubeAudio.js"
				}
			}
		}
	},
	one: {
		interfaces: {
			standard: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Modules/Interfaces/Standard.js"
		},
		syntaxes: {
			oneLISP: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Modules/Syntaxes/ONELisp.js"
		}
	}
}

function assignLibraries(object, libraries) {

	Object.keys(libraries).forEach((key) => {

		object[key] = (typeof libraries[key] == "string") ?
			() => {
				return require(libraries[key]);
			} :
			assignLibraries({ }, libraries[key]);

	});

	return object;
}

module.exports = (item) => {

	Object.values(reference.one.interfaces).forEach((value) => {
		require(value)(item);
	});
}

module.exports.reference = reference;

assignLibraries(module.exports, reference.js)