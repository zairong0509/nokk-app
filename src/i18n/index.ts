/**
 * NOKK Internationalization (i18n) Setup
 */

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import ko from './locales/ko.json';
import ja from './locales/ja.json';
import es from './locales/es.json';

const LANGUAGE_STORAGE_KEY = 'nokk_language';

const resources = {
  en: {translation: en},
  ko: {translation: ko},
  ja: {translation: ja},
  es: {translation: es},
};

export const SUPPORTED_LANGUAGES = [
  {code: 'en', name: 'English', nativeName: 'English'},
  {code: 'ko', name: 'Korean', nativeName: '한국어'},
  {code: 'ja', name: 'Japanese', nativeName: '日本語'},
  {code: 'es', name: 'Spanish', nativeName: 'Español'},
];

// Get device language
const getDeviceLanguage = (): string => {
  try {
    const locale = Localization.locale;
    const deviceLang = locale.split('-')[0]; // Get language code (e.g., 'en' from 'en-US')
    // Check if device language is supported
    if (Object.keys(resources).includes(deviceLang)) {
      return deviceLang;
    }
  } catch (error) {
    console.log('Error getting device language:', error);
  }
  return 'en'; // Default to English
};

// Initialize i18n
export const initializeI18n = async () => {
  try {
    // Try to get saved language preference
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    const initialLanguage = savedLanguage || getDeviceLanguage();

    await i18n.use(initReactI18next).init({
      resources,
      lng: initialLanguage,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    // Initialize with defaults
    await i18n.use(initReactI18next).init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
  }
};

// Change language
export const changeLanguage = async (languageCode: string) => {
  try {
    await i18n.changeLanguage(languageCode);
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
  } catch (error) {
    console.error('Failed to change language:', error);
  }
};

// Get current language
export const getCurrentLanguage = (): string => {
  return i18n.language;
};

export default i18n;
