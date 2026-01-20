/**
 * NOKK Global State Management using Zustand
 */

import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User,
  Language,
  VoiceType,
  SubscriptionStatus,
  QuickAction,
  CategoryType,
  AudioState,
  Category,
} from '../types';
import {DEFAULT_QUICK_ACTIONS, DEFAULT_CATEGORIES} from '../constants/data';

interface AppStore {
  // State
  isInitialized: boolean;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  user: User;
  categories: Category[];
  quickActions: QuickAction[];
  audioState: AudioState;
  expandedCategoryId: CategoryType | null;
  searchQuery: string;
  isDarkMode: boolean;

  // Actions
  initializeApp: () => Promise<void>;
  completeOnboarding: () => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: Partial<User>) => void;
  setLanguage: (language: Language) => void;
  setVoiceType: (type: VoiceType) => void;
  setSubscription: (status: SubscriptionStatus) => void;
  toggleDarkMode: () => void;
  setExpandedCategory: (categoryId: CategoryType | null) => void;
  setSearchQuery: (query: string) => void;
  updateQuickActions: (actions: QuickAction[]) => void;
  setAudioState: (state: Partial<AudioState>) => void;
  resetAudioState: () => void;
  logout: () => void;
  restorePurchase: () => Promise<boolean>;
}

const DEFAULT_USER: User = {
  isLoggedIn: false,
  subscriptionStatus: 'free',
  preferences: {
    language: 'en',
    voiceType: 'middle',
    isDarkMode: true,
    notificationsEnabled: true,
  },
};

const DEFAULT_AUDIO_STATE: AudioState = {
  isPlaying: false,
  currentPhraseId: null,
  isLoading: false,
  error: null,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isInitialized: false,
      isLoading: true,
      hasSeenOnboarding: false,
      user: DEFAULT_USER,
      categories: DEFAULT_CATEGORIES,
      quickActions: DEFAULT_QUICK_ACTIONS,
      audioState: DEFAULT_AUDIO_STATE,
      expandedCategoryId: null,
      searchQuery: '',
      isDarkMode: true,

      // Initialize app
      initializeApp: async () => {
        try {
          set({isLoading: true});
          // Load persisted data is handled by zustand persist
          // Reset quickActions to default to fix any corrupted data
          // This ensures audio files match the actual files
          set({quickActions: DEFAULT_QUICK_ACTIONS});
          
          // Ensure voiceType has a valid default if undefined
          const currentState = get();
          if (!currentState.user.preferences.voiceType) {
            set(state => ({
              user: {
                ...state.user,
                preferences: {
                  ...state.user.preferences,
                  voiceType: 'middle',
                },
              },
            }));
          }
          
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate init
          set({isInitialized: true, isLoading: false});
        } catch (error) {
          console.error('Failed to initialize app:', error);
          set({isLoading: false});
        }
      },

      // Complete onboarding
      completeOnboarding: () => set({ hasSeenOnboarding: true }),

      // Set loading state
      setLoading: (loading: boolean) => set({isLoading: loading}),

      // Update user
      setUser: (userData: Partial<User>) =>
        set(state => ({
          user: {...state.user, ...userData},
        })),

      // Set language
      setLanguage: (language: Language) =>
        set(state => ({
          user: {
            ...state.user,
            preferences: {...state.user.preferences, language},
          },
        })),

      // Set voice tone (Premium only)
      setVoiceType: (type: VoiceType) => {
        const {user} = get();
        if (user.subscriptionStatus === 'premium') {
          set(state => ({
            user: {
              ...state.user,
              preferences: {...state.user.preferences, voiceType: type},
            },
          }));
        }
      },

      // Set subscription status
      setSubscription: (status: SubscriptionStatus) =>
        set(state => ({
          user: {...state.user, subscriptionStatus: status},
        })),

      // Toggle dark mode
      toggleDarkMode: () =>
        set(state => ({
          isDarkMode: !state.isDarkMode,
          user: {
            ...state.user,
            preferences: {
              ...state.user.preferences,
              isDarkMode: !state.isDarkMode,
            },
          },
        })),

      // Set expanded category
      setExpandedCategory: (categoryId: CategoryType | null) =>
        set({expandedCategoryId: categoryId}),

      // Set search query
      setSearchQuery: (query: string) => set({searchQuery: query}),

      // Update quick actions (Premium only)
      updateQuickActions: (actions: QuickAction[]) => {
        const {user} = get();
        if (user.subscriptionStatus === 'premium') {
          set({quickActions: actions});
        }
      },

      // Set audio state
      setAudioState: (state: Partial<AudioState>) =>
        set(prev => ({
          audioState: {...prev.audioState, ...state},
        })),

      // Reset audio state
      resetAudioState: () => set({audioState: DEFAULT_AUDIO_STATE}),

      // Logout
      logout: () =>
        set(state => ({
          user: {
            ...DEFAULT_USER,
            preferences: state.user.preferences, // Keep preferences
          },
        })),

      // Restore purchase
      restorePurchase: async () => {
        try {
          // This will be implemented with react-native-iap
          // For now, return false
          return false;
        } catch (error) {
          console.error('Failed to restore purchase:', error);
          return false;
        }
      },
    }),
    {
      name: 'nokk-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        user: state.user,
        quickActions: state.quickActions,
        isDarkMode: state.isDarkMode,
        hasSeenOnboarding: state.hasSeenOnboarding,
      }),
    },
  ),
);

// Selectors for optimized re-renders
export const useUser = () => useAppStore(state => state.user);
export const useIsPremium = () =>
  useAppStore(state => state.user.subscriptionStatus === 'premium');
export const useLanguage = () =>
  useAppStore(state => state.user.preferences.language);
export const useVoiceType = () =>
  useAppStore(state => state.user.preferences.voiceType);
export const useCategories = () => useAppStore(state => state.categories);
export const useQuickActions = () => useAppStore(state => state.quickActions);
export const useAudioState = () => useAppStore(state => state.audioState);
export const useIsDarkMode = () => useAppStore(state => state.isDarkMode);
export const useHasSeenOnboarding = () => useAppStore(state => state.hasSeenOnboarding);
