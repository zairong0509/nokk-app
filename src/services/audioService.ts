/**
 * NOKK Audio Service - Expo Version
 * Handles instant audio playback for safety voice phrases
 * Priority: SPEED - No delays, instant playback on tap
 */

import { Audio } from 'expo-av';
import {useAppStore} from '../store/appStore';
import {VoiceTone, Language} from '../types';
import {AUDIO_FILES} from './audioFiles';

// Enable playback in silence mode (iOS)
Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  staysActiveInBackground: true,
  shouldDuckAndroid: true,
});

// Audio cache for instant playback
const audioCache: Map<string, Audio.Sound> = new Map();

// Current playing sound reference
let currentSound: Audio.Sound | null = null;

// Audio file mapping based on language and tone
const getAudioFileName = (
  baseFile: string,
  language: Language,
  tone: VoiceTone,
): string => {
  // Format: {baseFile}_{language}_{tone}.mp3
  // Example: unknown_who_en_normal.mp3
  return `${baseFile}_${language}_${tone}.mp3`;
};

/**
 * Initialize audio system and preload common sounds
 */
export const initializeAudio = async (): Promise<void> => {
  try {
    // Preload default quick action sounds for instant playback
    const defaultSounds = [
      'unknown_who',
      'delivery_leave_door',
      'threat_calling_police',
    ];

    const language = useAppStore.getState().user.preferences.language;
    const tone = useAppStore.getState().user.preferences.voiceTone;

    await Promise.all(
      defaultSounds.map(sound => preloadAudio(sound, language, tone)),
    );

    console.log('Audio system initialized');
  } catch (error) {
    console.error('Failed to initialize audio:', error);
  }
};

/**
 * Preload audio file into cache for instant playback
 */
export const preloadAudio = async (
  baseFile: string,
  language: Language,
  tone: VoiceTone,
): Promise<void> => {
  try {
    const cacheKey = `${baseFile}_${language}_${tone}`;

    // Check if already cached
    if (audioCache.has(cacheKey)) {
      return;
    }

    // Get the audio file from the mapping
    const audioSource = AUDIO_FILES[cacheKey];
    if (!audioSource) {
      console.warn(`Audio file not found: ${cacheKey}`);
      return;
    }

    // Load the sound file using require() mapping
    const { sound } = await Audio.Sound.createAsync(
      audioSource,
      { shouldPlay: false }
    );

    // Cache the loaded sound
    audioCache.set(cacheKey, sound);
  } catch (error) {
    console.warn(`Failed to load audio: ${baseFile}`, error);
    // Don't throw - we want the app to continue working
  }
};

/**
 * Play audio INSTANTLY - This is the core function
 * NO DELAYS, NO CONFIRMATION, NO LOADING
 */
export const playAudio = async (
  baseFile: string,
  phraseId: string,
): Promise<void> => {
  const store = useAppStore.getState();
  const {language, voiceTone} = store.user.preferences;
  const cacheKey = `${baseFile}_${language}_${voiceTone}`;

  // Stop any currently playing audio immediately
  await stopAudio();

  // Update state to show playing
  store.setAudioState({
    isPlaying: true,
    currentPhraseId: phraseId,
    isLoading: false,
    error: null,
  });

  try {
    let sound = audioCache.get(cacheKey);

    // If not cached, load it (this should be rare with preloading)
    if (!sound) {
      sound = await loadSound(cacheKey);
      if (sound) {
        audioCache.set(cacheKey, sound);
      }
    }

    if (sound) {
      currentSound = sound;
      
      // Reset to beginning if already played
      await sound.setPositionAsync(0);
      
      // Set volume to maximum for safety situations
      await sound.setVolumeAsync(1.0);
      
      // Play immediately
      await sound.playAsync();

      // Set playback status callback
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          console.log('Audio playback finished');
          store.resetAudioState();
          currentSound = null;
        }
      });
    } else {
      throw new Error('Sound not available');
    }
  } catch (error) {
    console.error('Playback error:', error);
    store.setAudioState({
      isPlaying: false,
      currentPhraseId: null,
      isLoading: false,
      error: 'Failed to play audio',
    });
  }
};

/**
 * Load sound file (fallback when not cached)
 */
const loadSound = async (cacheKey: string): Promise<Audio.Sound | null> => {
  try {
    const audioSource = AUDIO_FILES[cacheKey];
    if (!audioSource) {
      console.warn(`Audio file not found: ${cacheKey}`);
      return null;
    }
    
    const { sound } = await Audio.Sound.createAsync(
      audioSource,
      { shouldPlay: false }
    );
    return sound;
  } catch (error) {
    console.warn(`Failed to load: ${cacheKey}`, error);
    return null;
  }
};

/**
 * Stop currently playing audio immediately
 */
export const stopAudio = async (): Promise<void> => {
  if (currentSound) {
    try {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    } catch (error) {
      console.warn('Error stopping audio:', error);
    }
    currentSound = null;
  }
  useAppStore.getState().resetAudioState();
};

/**
 * Preload all audio for a specific language and tone
 * Called when user changes language or tone settings
 */
export const preloadAllAudioForSettings = async (
  language: Language,
  tone: VoiceTone,
): Promise<void> => {
  // Clear old cache
  audioCache.forEach(sound => sound.release());
  audioCache.clear();

  // Preload common phrases
  const commonPhrases = [
    'unknown_who',
    'delivery_leave_door',
    'threat_calling_police',
    'unknown_not_expecting',
    'unknown_what_want',
    'threat_get_away',
    'delivery_put_down',
  ];

  await Promise.all(
    commonPhrases.map(phrase => preloadAudio(phrase, language, tone)),
  );
};

/**
 * Clear audio cache
 */
export const clearAudioCache = async (): Promise<void> => {
  for (const sound of audioCache.values()) {
    try {
      await sound.unloadAsync();
    } catch (error) {
      console.warn('Error unloading sound:', error);
    }
  }
  audioCache.clear();
};

/**
 * Check if a specific audio is currently playing
 */
export const isAudioPlaying = (phraseId: string): boolean => {
  const state = useAppStore.getState().audioState;
  return state.isPlaying && state.currentPhraseId === phraseId;
};

/**
 * Get audio duration for a phrase
 */
export const getAudioDuration = async (
  baseFile: string,
  language: Language,
  tone: VoiceTone,
): Promise<number> => {
  const cacheKey = `${baseFile}_${language}_${tone}`;
  const sound = audioCache.get(cacheKey);

  if (sound) {
    try {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.durationMillis) {
        return status.durationMillis / 1000; // Convert to seconds
      }
    } catch (error) {
      console.warn('Error getting duration:', error);
    }
  }

  return 0;
};

export default {
  initializeAudio,
  playAudio,
  stopAudio,
  preloadAudio,
  preloadAllAudioForSettings,
  clearAudioCache,
  isAudioPlaying,
};
