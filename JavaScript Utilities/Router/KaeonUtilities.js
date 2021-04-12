var moduleDependencies = {
	modules: {
		js: {
			kaeonACE: {
				kaeonACE: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-ACE/master/Kaeon%20ACE/Source/API/Babylon/Core/KaeonACE.js",
				modules: {
					standardKaeonACE: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-ACE/master/Kaeon%20ACE/Source/API/Babylon/Modules/Router/standardKaeonACE.js",
					units: {
						cameraModules: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-ACE/master/Kaeon%20ACE/Source/API/Babylon/Modules/Units/cameraModules.js",
						geometryModules: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-ACE/master/Kaeon%20ACE/Source/API/Babylon/Modules/Units/geometryModules.js",
						standardModules: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-ACE/master/Kaeon%20ACE/Source/API/Babylon/Modules/Units/standardModules.js"
					},
					utilities: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-ACE/master/Kaeon%20ACE/Source/API/Babylon/Modules/Utilities/moduleUtilities.js"
				}
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
				application: {
					management: {
						override: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/Application/Management/override.js",
						platform: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/Application/Management/platform.js",
						server: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/Application/Management/server.js",
					},
					virtualSystem: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/Application/Virtual%20System/virtualSystem.js"
				},
				data: {
					httpUtils: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/Data/httpUtils.js",
					io: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/Data/io.js",
					tokenizer: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/Data/tokenizer.js"
				},
				ui: {
					visual: {
						general: {
							ui: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/UI/Visual/General/ui.js",
							input: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/UI/Visual/General/input.js",
							dimensions: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/UI/Visual/General/dimensions.js"
						},
						widgets: {
							widgets: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/UI/Visual/Widgets/widgets.js",
							search: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/UI/Visual/Widgets/search.js"
						}
					},
					audio: {
						speech: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/UI/Audio/speech.js",
						playYoutubeAudio: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/UI/Audio/playYoutubeAudio.js"
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

function assignLibraries(object, all, libraries) {

	Object.keys(libraries).forEach((key) => {

		if(typeof libraries[key] == "string") {

			all[key] = () => {
				return require(libraries[key]);
			};
		}

		object[key] = (typeof libraries[key] == "string") ?
			() => {
				return require(libraries[key]);
			} :
			assignLibraries({ }, all, libraries[key]);

	});

	return object;
}

module.exports = (item) => {

	Object.values(moduleDependencies.modules.one.interfaces).forEach((value) => {
		require(value)(item);
	});
}

module.exports.moduleDependencies = moduleDependencies;
module.exports.modules = { };

assignLibraries(module.exports, module.exports.modules, moduleDependencies.modules.js);