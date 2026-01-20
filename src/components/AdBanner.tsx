/**
 * Ad Banner Component
 * Fixed banner ad at bottom for free users
 * Hidden during audio playback and for premium users
 */

import React, {useState} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import Constants from 'expo-constants';

import {COLORS, SPACING, FONTS} from '../constants/theme';
import {useIsPremium, useAudioState, useIsDarkMode} from '../store/appStore';

// Check if running in Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

// Production Ad Unit ID for Android
const ANDROID_AD_UNIT_ID = 'ca-app-pub-5021298398801669/3372406747';

export const AdBanner: React.FC = () => {
  const isPremium = useIsPremium();
  const audioState = useAudioState();
  const isDarkMode = useIsDarkMode();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;
  const [adLoaded, setAdLoaded] = useState(false);

  // Don't show ads for premium users
  if (isPremium) {
    return null;
  }

  // Don't show ads during audio playback (safety first!)
  if (audioState.isPlaying) {
    return null;
  }

  // Show placeholder in Expo Go (native ads don't work)
  if (isExpoGo) {
    return (
      <View style={[styles.container, {backgroundColor: colors.surface, borderTopColor: colors.border}]}>
        <Text style={[styles.placeholderText, {color: colors.textSecondary}]}>
          Ad Space (Dev Mode)
        </Text>
      </View>
    );
  }

  // Production: Load real ads
  const { BannerAd, BannerAdSize, TestIds } = require('react-native-google-mobile-ads');
  const AD_UNIT_ID = __DEV__ 
    ? TestIds.BANNER 
    : Platform.OS === 'android' 
      ? ANDROID_AD_UNIT_ID 
      : TestIds.BANNER;

  return (
    <View style={[styles.container, {backgroundColor: colors.surface, borderTopColor: colors.border}]}>
      <BannerAd
        unitId={AD_UNIT_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={(error: any) => {
          console.log('Ad failed to load:', error);
        }}
      />
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
    borderTopWidth: 1,
    paddingVertical: SPACING.md,
    minHeight: 60,
  },
  placeholderText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '500',
  },
});

export default AdBanner;
