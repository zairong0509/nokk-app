/**
 * Quick Action Button Component
 * CRITICAL: One tap = instant audio playback
 * No delays, no confirmation, no loading
 */

import React, {useCallback} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';

import {COLORS, SPACING, BORDER_RADIUS, FONTS, SHADOWS} from '../constants/theme';
import {useIsDarkMode, useAudioState} from '../store/appStore';
import {playAudio} from '../services/audioService';
import {QuickAction} from '../types';

interface QuickActionButtonProps {
  action: QuickAction;
  index: number;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  action,
  index,
}) => {
  const {t} = useTranslation();
  const isDarkMode = useIsDarkMode();
  const audioState = useAudioState();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  const currentPhraseId = Array.isArray(action.phraseId) ? action.phraseId.join('+') : action.phraseId;
  const isPlaying = audioState.isPlaying && audioState.currentPhraseId === currentPhraseId;
  
  // Get translated text based on phraseId(s)
  const getTranslatedText = () => {
    if (Array.isArray(action.phraseId)) {
      // Combined phrases: translate each and join with " + "
      return action.phraseId.map(id => t(`phrases.${id}`)).join(' + ');
    } else {
      // Single phrase
      return t(`phrases.${action.phraseId}`);
    }
  };

  // INSTANT playback on tap - no delays
  const handlePress = useCallback(() => {
    playAudio(action.audioFile, action.phraseId);
  }, [action.audioFile, action.phraseId]);

  // Get icon based on action type
  const getIcon = () => {
    if (action.text.toLowerCase().includes('who')) return 'account-question';
    if (action.text.toLowerCase().includes('door') || action.text.toLowerCase().includes('leave')) return 'package-variant';
    if (action.text.toLowerCase().includes('police')) return 'shield-alert';
    return 'message-text';
  };

  // Get background color based on index - simplified to navy shades
  const getBackgroundColor = () => {
    const navyShades = [
      '#2a3d54', // Navy medium
      '#3d5a80', // Navy light
      '#1a2332', // Navy dark
    ];
    return navyShades[index % navyShades.length];
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          opacity: isPlaying ? 0.8 : 1,
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityLabel={action.text}
      accessibilityRole="button"
      accessibilityHint={t('home.tapToPlay')}>
      <View style={styles.iconContainer}>
        <Icon
          name={isPlaying ? 'volume-high' : getIcon()}
          size={28}
          color={COLORS.white}
        />
      </View>
      <Text style={styles.text} numberOfLines={2}>
        {getTranslatedText()}
      </Text>
      {isPlaying && (
        <View style={styles.playingIndicator}>
          <View style={[styles.wave, styles.wave1]} />
          <View style={[styles.wave, styles.wave2]} />
          <View style={[styles.wave, styles.wave3]} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.md,
    minHeight: 72,
    ...SHADOWS.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  text: {
    flex: 1,
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    lineHeight: 24,
  },
  playingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  wave: {
    width: 3,
    backgroundColor: COLORS.white,
    borderRadius: 2,
    marginHorizontal: 1,
  },
  wave1: {
    height: 12,
  },
  wave2: {
    height: 20,
  },
  wave3: {
    height: 16,
  },
});

export default QuickActionButton;
