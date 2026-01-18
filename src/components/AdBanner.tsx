/**
 * Ad Banner Component - TEMPORARILY DISABLED
 * TODO: Re-enable with Development Build
 * Fixed banner ad at bottom for free users
 * Hidden during audio playback and for premium users
 */

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {COLORS, SPACING, FONTS} from '../constants/theme';
import {useIsPremium, useAudioState, useIsDarkMode} from '../store/appStore';

export const AdBanner: React.FC = () => {
  const isPremium = useIsPremium();
  const audioState = useAudioState();
  const isDarkMode = useIsDarkMode();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  // Don't show ads for premium users
  if (isPremium) {
    return null;
  }

  // Don't show ads during audio playback (safety first!)
  if (audioState.isPlaying) {
    return null;
  }

  // Placeholder for development
  return (
    <View style={[styles.container, {backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border}]}>
      <Text style={[styles.placeholderText, {color: colors.textSecondary}]}>
        Ad Space (Development Mode)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    height: 60,
  },
  placeholderText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '500',
  },
});

export default AdBanner;
