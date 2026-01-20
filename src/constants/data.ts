/**
 * NOKK Default Data - Categories, Phrases, and Quick Actions
 */

import {Category, QuickAction, CategoryType, Phrase} from '../types';
import {COLORS} from './theme';

// Default phrases for each category
const GENERAL_PHRASES: Phrase[] = [
  {
    id: 'general_1',
    text: "Hang on, I'm coming.",
    categoryId: 'general',
    audioFile: 'general_1',
    isPremium: false,
    order: 1,
  },
  {
    id: 'general_2',
    text: 'Just a sec.',
    categoryId: 'general',
    audioFile: 'general_2',
    isPremium: false,
    order: 2,
  },
  {
    id: 'general_3',
    text: 'Yeah?',
    categoryId: 'general',
    audioFile: 'general_3',
    isPremium: false,
    order: 3,
  },
  {
    id: 'general_4',
    text: 'Who is it?',
    categoryId: 'general',
    audioFile: 'general_4',
    isPremium: false,
    order: 4,
  },
  {
    id: 'general_5',
    text: 'Nope, wrong house.',
    categoryId: 'general',
    audioFile: 'general_5',
    isPremium: true,
    order: 5,
  },
];

const DELIVERY_PHRASES: Phrase[] = [
  {
    id: 'delivery_1',
    text: 'Just leave it at the door.',
    categoryId: 'delivery',
    audioFile: 'delivery_1',
    isPremium: false,
    order: 1,
  },
  {
    id: 'delivery_2',
    text: 'Set it down there.',
    categoryId: 'delivery',
    audioFile: 'delivery_2',
    isPremium: true,
    order: 2,
  },
  {
    id: 'delivery_3',
    text: 'Got it, thanks.',
    categoryId: 'delivery',
    audioFile: 'delivery_3',
    isPremium: true,
    order: 3,
  },
  {
    id: 'delivery_4',
    text: 'Leave it by the gate.',
    categoryId: 'delivery',
    audioFile: 'delivery_4',
    isPremium: true,
    order: 4,
  },
];

const UNKNOWN_VISITOR_PHRASES: Phrase[] = [
  {
    id: 'unknown_1',
    text: 'Who is it?',
    categoryId: 'unknown',
    audioFile: 'unknown_1',
    isPremium: false,
    order: 1,
  },
  {
    id: 'unknown_2',
    text: 'Who the hell is it?!',
    categoryId: 'unknown',
    audioFile: 'unknown_2',
    isPremium: true,
    order: 2,
  },
  {
    id: 'unknown_3',
    text: 'What do you want?',
    categoryId: 'unknown',
    audioFile: 'unknown_3',
    isPremium: false,
    order: 3,
  },
  {
    id: 'unknown_4',
    text: 'Not interested, thanks.',
    categoryId: 'unknown',
    audioFile: 'unknown_4',
    isPremium: true,
    order: 4,
  },
  {
    id: 'unknown_5',
    text: 'I said not interested! Go away!',
    categoryId: 'unknown',
    audioFile: 'unknown_5',
    isPremium: true,
    order: 5,
  },
  {
    id: 'unknown_6',
    text: 'Come back another time.',
    categoryId: 'unknown',
    audioFile: 'unknown_6',
    isPremium: true,
    order: 6,
  },
  {
    id: 'unknown_7',
    text: "I'm busy right now.",
    categoryId: 'unknown',
    audioFile: 'unknown_7',
    isPremium: true,
    order: 7,
  },
];

const THREAT_PHRASES: Phrase[] = [
  {
    id: 'threat_1',
    text: "I'm calling the cops.",
    categoryId: 'threat',
    audioFile: 'threat_1',
    isPremium: false,
    order: 1,
  },
  {
    id: 'threat_2',
    text: "I just called the cops! You're fucked!",
    categoryId: 'threat',
    audioFile: 'threat_2',
    isPremium: true,
    order: 2,
  },
  {
    id: 'threat_3',
    text: 'Step back. Get away from my door.',
    categoryId: 'threat',
    audioFile: 'threat_3',
    isPremium: false,
    order: 3,
  },
  {
    id: 'threat_4',
    text: 'Back off!',
    categoryId: 'threat',
    audioFile: 'threat_4',
    isPremium: true,
    order: 4,
  },
  {
    id: 'threat_5',
    text: 'Get the fuck out!',
    categoryId: 'threat',
    audioFile: 'threat_5',
    isPremium: true,
    order: 5,
  },
  {
    id: 'threat_6',
    text: "You're being recorded. I have cameras.",
    categoryId: 'threat',
    audioFile: 'threat_6',
    isPremium: true,
    order: 6,
  },
  {
    id: 'threat_7',
    text: "Everything's on camera! You're so fucked!",
    categoryId: 'threat',
    audioFile: 'threat_7',
    isPremium: true,
    order: 7,
  },
];

const NIGHT_PHRASES: Phrase[] = [
  {
    id: 'night_1',
    text: "It's the middle of the night. What do you want?",
    categoryId: 'night',
    audioFile: 'night_1',
    isPremium: true,
    order: 1,
  },
  {
    id: 'night_2',
    text: "It's the middle of the fucking night! Are you insane?!",
    categoryId: 'night',
    audioFile: 'night_2',
    isPremium: true,
    order: 2,
  },
  {
    id: 'night_3',
    text: "I'm trying to sleep. Go away.",
    categoryId: 'night',
    audioFile: 'night_3',
    isPremium: true,
    order: 3,
  },
  {
    id: 'night_4',
    text: "I'm sleeping! Get lost!",
    categoryId: 'night',
    audioFile: 'night_4',
    isPremium: true,
    order: 4,
  },
  {
    id: 'night_5',
    text: 'Come back tomorrow.',
    categoryId: 'night',
    audioFile: 'night_5',
    isPremium: true,
    order: 5,
  },
  {
    id: 'night_6',
    text: 'Do you know what time it is?',
    categoryId: 'night',
    audioFile: 'night_6',
    isPremium: true,
    order: 6,
  },
  {
    id: 'night_7',
    text: 'Do you have any idea what fucking time it is?!',
    categoryId: 'night',
    audioFile: 'night_7',
    isPremium: true,
    order: 7,
  },
];

// Default categories (General first)
export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'general',
    name: 'General',
    icon: 'message-text',
    color: COLORS.categories.general,
    phrases: GENERAL_PHRASES,
  },
  {
    id: 'delivery',
    name: 'Delivery',
    icon: 'package-variant',
    color: COLORS.categories.delivery,
    phrases: DELIVERY_PHRASES,
  },
  {
    id: 'unknown',
    name: 'Unknown Visitor',
    icon: 'account-question',
    color: COLORS.categories.unknown,
    phrases: UNKNOWN_VISITOR_PHRASES,
  },
  {
    id: 'threat',
    name: 'Threat',
    icon: 'shield-alert',
    color: COLORS.categories.threat,
    phrases: THREAT_PHRASES,
  },
  {
    id: 'night',
    name: 'Night Situation',
    icon: 'weather-night',
    color: COLORS.categories.night,
    phrases: NIGHT_PHRASES,
  },
];

// Default quick actions (3 for free users)
export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'quick_1',
    phraseId: 'general_4',
    text: 'Who is it?',
    audioFile: 'general_4',
    order: 1,
    isDefault: true,
    isCustomizable: false,
  },
  {
    id: 'quick_2',
    phraseId: 'delivery_1',
    text: 'Just leave it at the door.',
    audioFile: 'delivery_1',
    order: 2,
    isDefault: true,
    isCustomizable: false,
  },
  {
    id: 'quick_3',
    phraseId: 'threat_1',
    text: "I'm calling the cops.",
    audioFile: 'threat_1',
    order: 3,
    isDefault: true,
    isCustomizable: false,
  },
];

// Premium quick actions slots (5 total, customizable)
export const PREMIUM_QUICK_ACTION_SLOTS = 5;

// Get all phrases flattened
export const getAllPhrases = (): Phrase[] => {
  return DEFAULT_CATEGORIES.flatMap(category => category.phrases);
};

// Get phrase by ID
export const getPhraseById = (id: string): Phrase | undefined => {
  return getAllPhrases().find(phrase => phrase.id === id);
};

// Get category by ID
export const getCategoryById = (id: CategoryType): Category | undefined => {
  return DEFAULT_CATEGORIES.find(category => category.id === id);
};

// Search phrases
export const searchPhrases = (query: string): Phrase[] => {
  const lowerQuery = query.toLowerCase();
  return getAllPhrases().filter(phrase =>
    phrase.text.toLowerCase().includes(lowerQuery),
  );
};

// Free phrases (for free users quick actions)
export const FREE_PHRASE_IDS = ['general_4', 'delivery_1', 'threat_1'];
