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

function validateLanguageKeys(defaults, translations) {
	Object.keys(translations).forEach(langKey => {
		if (!defaults.hasOwnProperty(langKey)) {
			throw new Error('Invalid translation inserted');
		}
	});
}

function validateTranslationValues(translations) {
	for (let value in translations) {
		if (typeof value !== 'string' || !(value instanceof String)) {
			throw new Error('Invalid translation value: ' + value);
		}
	}
}

module.exports = (Model, options) => {
	const defaults = populateDefaultValue(options.properties);
	Model.defineProperty('translations', {type: 'object', default: defaults});
	// TODO: Before save validate object structure
	Model.observe('before save', async (ctx, next) => {
		const translations = ctx.data.translations;
		if (!translations) {
			ctx.data.translations = defaults;
			return next();
		}

		if (translations) {
			try {
				validateLanguageKeys(defaults, translations);
				validateTranslationValues(translations);
			} catch (err) {
				return next(err);
			}
		}

		next();
	});
};
