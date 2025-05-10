import type { HomeAssistant } from '@hass/types';
import type { TranslationKey } from './types';

import * as en from '../translations/en.json';
// Import other languages as needed above this line and in order

// Define supported languages
const languages: Record<string, any> = {
  en: en,
  // Add more languages here in order
};

/**
 * Localize a string based on the user's language preference.
 * It will first check if the string exists in the user's language.
 * If not, it will fall back to English.
 * @param hass - The Home Assistant object containing the user's language preference.
 * @param key - The key for the localized string.
 * @param search - The string to be replaced in the localized string.
 * @param replace - The string to replace the search string with.
 * @returns The localized string.
 */
export const localize = (
  hass: HomeAssistant,
  key: TranslationKey,
  search = '',
  replace = '',
): string => {
  const lang = hass.language;

  // Try to get the translation safely
  let translated: string | undefined;

  try {
    // First try with user's language
    translated = getNestedTranslation(languages[lang], key);

    // If not found, try with English
    if (translated === undefined) {
      translated = getNestedTranslation(languages.en, key);
    }
  } catch (error) {
    // If any error occurs, fall back to the key
    translated = undefined;
  }

  // If no translation found, use the key itself
  if (translated === undefined) {
    return key;
  }

  // Replace placeholders
  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }

  return translated;
};

// Helper function to safely navigate nested objects
function getNestedTranslation(obj: any, path: string): string | undefined {
  if (!obj) return undefined;

  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result === undefined || result === null || typeof result !== 'object') {
      return undefined;
    }
    result = result[key];
  }

  return typeof result === 'string' ? result : undefined;
}
