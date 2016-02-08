import {Locale} from './locale';

export var config = {};
config.locales = {};

config.addLocale = function(locale, data) {
  config.locales[locale] = new Locale(data);
};
