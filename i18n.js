const NextI18Next = require('next-i18next').default;
const config = require('next/config').default();
const get = require('lodash/get');

const localeSubpaths = get(config, 'publicRuntimeConfig.localeSubpaths', 'none');

const EN = 'en';
const JA = 'ja';

const localeSubpathMapping = {
  none: {},
  en: EN,
  ja: JA,
  all: {
    en: EN,
    ja: JA,
  },
};

module.exports = new NextI18Next({
  defaultNS: 'common',
  defaultLanguage: 'en',
  otherLanguages: [EN, JA],
  localeSubpaths: localeSubpathMapping[localeSubpaths],
});
