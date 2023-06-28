import { Locales } from "./locales";

export const supportedLanguages = Locales.map(lang => {
  return {
    id: lang,
    code: lang,
    name: `langs.${lang}`,
    text: `langs.${lang}`,
    active: false,
    included: false
  };
});
