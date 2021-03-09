let moduleDependencies = {
	modules: {
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
					io: "",
					tokenizer: "",
					httpUtils: ""
				},
				application: {
					management: {
						platform: "",
						override: "",
						server: "",
					},
					virtualSystem: ""
				},
				ui: {
					visual: {
						general: {
							ui: "",
							input: "",
							dimensions: ""
						},
						widgets: {
							widgets: "",
							search: ""
						}
					},
					audio: {
						speech: "",
						playYoutubeAudio: ""
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
	},
	kaeonUnited: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-United/master/Kaeon%20United/Source/KaeonUnited.js"
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

	Object.values(moduleDependencies.modules.one.interfaces).forEach((value) => {
		require(value)(item);
	});
}

module.exports.moduleDependencies = moduleDependencies;

assignLibraries(module.exports, moduleDependencies.modules.js)