import config from '../config.json'
import R from 'ramda'

if (!config.availableLanguages) throw new Error('Missing required configuration "availableLanguages" from config.json');

module.exports = (Model, options) => {
	let initialTranslations = {};
	let languages = config.availableLanguages.reduce((dict, key) => {
		dict[key] = '';
		return dict;
	}, {});
	if (options.properties && Array.isArray(options.properties)) {
		options.properties.forEach(propertyName => initialTranslations[propertyName] = R.clone(languages));
	}
	Model.defineProperty('translations', {type: 'object', default: initialTranslations});
};
