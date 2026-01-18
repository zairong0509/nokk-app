/**
 * NOKK Default Data - Categories, Phrases, and Quick Actions
 */

import {Category, QuickAction, CategoryType, Phrase} from '../types';
import {COLORS} from './theme';

// Default phrases for each category
const DELIVERY_PHRASES: Phrase[] = [
  {
    id: 'delivery_1',
    text: 'Leave it at the door.',
    categoryId: 'delivery',
    audioFile: 'delivery_leave_door',
    isPremium: false,
    order: 1,
  },
  {
    id: 'delivery_2',
    text: 'Just put it down there.',
    categoryId: 'delivery',
    audioFile: 'delivery_put_down',
    isPremium: true,
    order: 2,
  },
  {
    id: 'delivery_3',
    text: 'Thanks, I got it.',
    categoryId: 'delivery',
    audioFile: 'delivery_thanks',
    isPremium: true,
    order: 3,
  },
  {
    id: 'delivery_4',
    text: 'Leave it by the gate.',
    categoryId: 'delivery',
    audioFile: 'delivery_gate',
    isPremium: true,
    order: 4,
  },
  {
    id: 'delivery_5',
    text: "I'll pick it up in a minute.",
    categoryId: 'delivery',
    audioFile: 'delivery_pickup',
    isPremium: true,
    order: 5,
  },
];

const UNKNOWN_VISITOR_PHRASES: Phrase[] = [
  {
    id: 'unknown_1',
    text: 'Who is it?',
    categoryId: 'unknown',
    audioFile: 'unknown_who',
    isPremium: false,
    order: 1,
  },
  {
    id: 'unknown_2',
    text: "I'm not expecting anyone.",
    categoryId: 'unknown',
    audioFile: 'unknown_not_expecting',
    isPremium: true,
    order: 2,
  },
  {
    id: 'unknown_3',
    text: 'What do you want?',
    categoryId: 'unknown',
    audioFile: 'unknown_what_want',
    isPremium: true,
    order: 3,
  },
  {
    id: 'unknown_4',
    text: "We're not interested.",
    categoryId: 'unknown',
    audioFile: 'unknown_not_interested',
    isPremium: true,
    order: 4,
  },
  {
    id: 'unknown_5',
    text: 'Come back later.',
    categoryId: 'unknown',
    audioFile: 'unknown_come_back',
    isPremium: true,
    order: 5,
  },
  {
    id: 'unknown_6',
    text: "I'm busy right now.",
    categoryId: 'unknown',
    audioFile: 'unknown_busy',
    isPremium: true,
    order: 6,
  },
];

const THREAT_PHRASES: Phrase[] = [
  {
    id: 'threat_1',
    text: "I'm calling the police.",
    categoryId: 'threat',
    audioFile: 'threat_calling_police',
    isPremium: false,
    order: 1,
  },
  {
    id: 'threat_2',
    text: 'Get away from my door!',
    categoryId: 'threat',
    audioFile: 'threat_get_away',
    isPremium: true,
    order: 2,
  },
  {
    id: 'threat_3',
    text: "I've got a camera recording you.",
    categoryId: 'threat',
    audioFile: 'threat_camera',
    isPremium: true,
    order: 3,
  },
  {
    id: 'threat_4',
    text: 'Leave now or I call security.',
    categoryId: 'threat',
    audioFile: 'threat_security',
    isPremium: true,
    order: 4,
  },
  {
    id: 'threat_5',
    text: "I'm armed and I will defend myself.",
    categoryId: 'threat',
    audioFile: 'threat_armed',
    isPremium: true,
    order: 5,
  },
  {
    id: 'threat_6',
    text: 'My neighbors are watching.',
    categoryId: 'threat',
    audioFile: 'threat_neighbors',
    isPremium: true,
    order: 6,
  },
];

const NIGHT_PHRASES: Phrase[] = [
  {
    id: 'night_1',
    text: "It's late. What do you want?",
    categoryId: 'night',
    audioFile: 'night_late',
    isPremium: true,
    order: 1,
  },
  {
    id: 'night_2',
    text: "We're sleeping. Go away.",
    categoryId: 'night',
    audioFile: 'night_sleeping',
    isPremium: true,
    order: 2,
  },
  {
    id: 'night_3',
    text: 'Come back tomorrow.',
    categoryId: 'night',
    audioFile: 'night_tomorrow',
    isPremium: true,
    order: 3,
  },
  {
    id: 'night_4',
    text: "Do you know what time it is?",
    categoryId: 'night',
    audioFile: 'night_time',
    isPremium: true,
    order: 4,
  },
];

const GENERAL_PHRASES: Phrase[] = [
  {
    id: 'general_1',
    text: 'Hold on, I\'m coming.',
    categoryId: 'general',
    audioFile: 'general_coming',
    isPremium: true,
    order: 1,
  },
  {
    id: 'general_2',
    text: 'Give me a second.',
    categoryId: 'general',
    audioFile: 'general_second',
    isPremium: true,
    order: 2,
  },
  {
    id: 'general_3',
    text: 'Yes?',
    categoryId: 'general',
    audioFile: 'general_yes',
    isPremium: true,
    order: 3,
  },
  {
    id: 'general_4',
    text: 'Who\'s there?',
    categoryId: 'general',
    audioFile: 'general_whos_there',
    isPremium: true,
    order: 4,
  },
];

// Default categories
export const DEFAULT_CATEGORIES: Category[] = [
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
  {
    id: 'general',
    name: 'General',
    icon: 'message-text',
    color: COLORS.categories.general,
    phrases: GENERAL_PHRASES,
  },
];

// Default quick actions (3 for free users)
export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'quick_1',
    phraseId: 'unknown_1',
    text: 'Who is it?',
    audioFile: 'unknown_who',
    order: 1,
    isDefault: true,
    isCustomizable: false,
  },
  {
    id: 'quick_2',
    phraseId: 'delivery_1',
    text: 'Leave it at the door.',
    audioFile: 'delivery_leave_door',
    order: 2,
    isDefault: true,
    isCustomizable: false,
  },
  {
    id: 'quick_3',
    phraseId: 'threat_1',
    text: "I'm calling the police.",
    audioFile: 'threat_calling_police',
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
export const FREE_PHRASE_IDS = ['unknown_1', 'delivery_1', 'threat_1'];
