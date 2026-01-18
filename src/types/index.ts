/**
 * NOKK Type Definitions
 */

// Supported languages
export type Language = 'en' | 'ko' | 'ja' | 'es';

// Voice tone options
export type VoiceTone = 'normal' | 'firm' | 'angry';

// Category types
export type CategoryType = 'delivery' | 'unknown' | 'threat' | 'night' | 'general';

// Phrase interface
export interface Phrase {
  id: string;
  text: string;
  categoryId: CategoryType;
  audioFile: string; // Local audio file path
  isPremium: boolean;
  order: number;
}

// Category interface
export interface Category {
  id: CategoryType;
  name: string;
  icon: string;
  color: string;
  phrases: Phrase[];
}

// Quick Action button interface
export interface QuickAction {
  id: string;
  phraseId: string;
  text: string;
  audioFile: string;
  order: number;
  isDefault: boolean;
  isCustomizable: boolean; // Premium users can customize
}

// User subscription status
export type SubscriptionStatus = 'free' | 'premium';

// User preferences
export interface UserPreferences {
  language: Language;
  voiceTone: VoiceTone;
  isDarkMode: boolean;
  notificationsEnabled: boolean;
}

// User data
export interface User {
  id?: string;
  email?: string;
  displayName?: string;
  photoUrl?: string;
  isLoggedIn: boolean;
  subscriptionStatus: SubscriptionStatus;
  subscriptionExpiry?: Date;
  preferences: UserPreferences;
  customQuickActions?: QuickAction[];
}

// In-App Purchase product
export interface IAPProduct {
  productId: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  localizedPrice: string;
  type: 'subscription' | 'one_time';
}

// Audio playback state
export interface AudioState {
  isPlaying: boolean;
  currentPhraseId: string | null;
  isLoading: boolean;
  error: string | null;
}

// App state
export interface AppState {
  isInitialized: boolean;
  isLoading: boolean;
  user: User;
  categories: Category[];
  quickActions: QuickAction[];
  audioState: AudioState;
  expandedCategoryId: CategoryType | null;
  searchQuery: string;
}

// Navigation types
export type RootStackParamList = {
  Main: undefined;
  Settings: undefined;
  Premium: undefined;
  LanguageSelect: undefined;
  ToneSelect: undefined;
  CustomizeQuickActions: undefined;
  Search: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Categories: undefined;
  Settings: undefined;
};

// Action results
export interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

// Store action types
export type StoreAction =
  | {type: 'SET_LOADING'; payload: boolean}
  | {type: 'SET_USER'; payload: Partial<User>}
  | {type: 'SET_LANGUAGE'; payload: Language}
  | {type: 'SET_VOICE_TONE'; payload: VoiceTone}
  | {type: 'SET_SUBSCRIPTION'; payload: SubscriptionStatus}
  | {type: 'TOGGLE_DARK_MODE'}
  | {type: 'SET_EXPANDED_CATEGORY'; payload: CategoryType | null}
  | {type: 'SET_SEARCH_QUERY'; payload: string}
  | {type: 'UPDATE_QUICK_ACTIONS'; payload: QuickAction[]};
