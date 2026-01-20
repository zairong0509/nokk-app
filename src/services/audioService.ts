/**
 * NOKK Audio Service - Expo Version
 * Handles instant audio playback for safety voice phrases
 * Priority: SPEED - No delays, instant playback on tap
 */

import { Audio } from 'expo-av';
import {useAppStore} from '../store/appStore';
import {VoiceType, Language} from '../types';
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

// Audio file mapping based on language and voice type
const getAudioFileName = (
  baseFile: string,
  language: Language,
  voiceType: VoiceType,
): string => {
  // Format: {baseFile}_{language}_{voiceType}.mp3
  // Example: unknown_1_en_young.mp3
  return `${baseFile}_${language}_${voiceType}.mp3`;
};

/**
 * Initialize audio system and preload common sounds
 */
export const initializeAudio = async (): Promise<void> => {
  try {
    // Preload default quick action sounds for instant playback
    const defaultSounds = [
      'unknown_1',
      'delivery_1',
      'threat_1',
    ];

    const language = useAppStore.getState().user.preferences.language;
    const voiceType = useAppStore.getState().user.preferences.voiceType;

    await Promise.all(
      defaultSounds.map(sound => preloadAudio(sound, language, voiceType)),
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
  tone: VoiceType,
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
 * Supports both single audio file and array of audio files (combined phrases)
 */
export const playAudio = async (
  baseFile: string | string[],
  phraseId: string | string[],
): Promise<void> => {
  const store = useAppStore.getState();
  const {language, voiceType} = store.user.preferences;

  // Stop any currently playing audio immediately
  await stopAudio();

  // Update state to show playing
  store.setAudioState({
    isPlaying: true,
    currentPhraseId: Array.isArray(phraseId) ? phraseId.join('+') : phraseId,
    isLoading: false,
    error: null,
  });

  try {
    // Handle combined phrases (array of audio files)
    if (Array.isArray(baseFile)) {
      await playMultipleAudios(baseFile, language, voiceType);
    } else {
      // Single audio file
      await playSingleAudio(baseFile, language, voiceType);
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
 * Play a single audio file
 */
const playSingleAudio = async (
  baseFile: string,
  language: Language,
  voiceType: VoiceType,
): Promise<void> => {
  const store = useAppStore.getState();
  const cacheKey = `${baseFile}_${language}_${voiceType}`;

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
};

/**
 * Play multiple audio files sequentially (for combined phrases)
 */
const playMultipleAudios = async (
  baseFiles: string[],
  language: Language,
  voiceType: VoiceType,
): Promise<void> => {
  const store = useAppStore.getState();
  
  for (let i = 0; i < baseFiles.length; i++) {
    const baseFile = baseFiles[i];
    const cacheKey = `${baseFile}_${language}_${voiceType}`;
    
    let sound = audioCache.get(cacheKey);
    
    // If not cached, load it
    if (!sound) {
      sound = await loadSound(cacheKey);
      if (sound) {
        audioCache.set(cacheKey, sound);
      }
    }
    
    if (sound) {
      currentSound = sound;
      
      // Reset to beginning
      await sound.setPositionAsync(0);
      
      // Set volume to maximum
      await sound.setVolumeAsync(1.0);
      
      // Play the audio
      await sound.playAsync();
      
      // Wait for this audio to finish before playing next
      await new Promise<void>((resolve) => {
        sound!.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound!.setOnPlaybackStatusUpdate(null);
            resolve();
          }
        });
      });
      
      // Reset position for next play (keep in cache)
      await sound.setPositionAsync(0);
      
      // Small pause between phrases (300ms)
      if (i < baseFiles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    } else {
      console.warn(`Audio file not found: ${cacheKey}`);
    }
  }
  
  // All audios finished playing
  console.log('Combined audio playback finished');
  store.resetAudioState();
  currentSound = null;
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
      // Don't unload - keep in cache for reuse
      // Just reset position for next play
      await currentSound.setPositionAsync(0);
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
  tone: VoiceType,
): Promise<void> => {
  // Clear old cache
  for (const sound of audioCache.values()) {
    try {
      await sound.unloadAsync();
    } catch (error) {
      console.warn('Error unloading sound:', error);
    }
  }
  audioCache.clear();

  // Preload common phrases (matching actual audio files)
  const commonPhrases = [
    'unknown_1',
    'unknown_2',
    'unknown_3',
    'delivery_1',
    'delivery_2',
    'threat_1',
    'threat_2',
    'threat_3',
    'general_1',
    'general_2',
    'general_3',
    'general_4',
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
  voiceType: VoiceType,
): Promise<number> => {
  const cacheKey = `${baseFile}_${language}_${voiceType}`;
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
