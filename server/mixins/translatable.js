import config from '../config.json'

if (!config.availableLanguages) throw new Error('Missing required configuration "availableLanguages" from config.json');

function populateDefaultValue(properties) {
	const translations = config.availableLanguages.reduce((dict, key) => {
		dict[key] = {};
		return dict;
	}, {});

	if (properties && Array.isArray(properties)) {
		properties.forEach(translatableProperty => {
			config.availableLanguages.forEach(langKey => {
				translations[langKey][translatableProperty] = '';
			});
		});
	}

	return translations;
}

module.exports = (Model, options) => {
	Model.defineProperty('translations', {type: 'object', default: populateDefaultValue(options.properties)});
	// TODO: Before save validate object structure
};
