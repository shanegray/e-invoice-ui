import { Locales } from "./locales";

import en from "./LanguageFileEN.json";
import fr from "./thisistheFrenchFile.json";
import es from "./LanguageFileES.json";

export const messages = {
  [Locales.EN]: en,
  [Locales.FR]: fr,
  [Locales.ES]: es
};

export const defaultLocale = Locales.EN;