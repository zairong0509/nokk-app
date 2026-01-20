/**
 * Ad Banner Component
 * Fixed banner ad at bottom for free users
 * Hidden during audio playback and for premium users
 */

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

import {COLORS} from '../constants/theme';
import {useIsPremium, useAudioState, useIsDarkMode} from '../store/appStore';

// Production Ad Unit ID for Android
const ANDROID_AD_UNIT_ID = 'ca-app-pub-5021298398801669/3372406747';

// Use test ads in development, real ads in production
const AD_UNIT_ID = __DEV__ 
  ? TestIds.BANNER 
  : Platform.OS === 'android' 
    ? ANDROID_AD_UNIT_ID 
    : TestIds.BANNER; // iOS will be added later

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

  return (
    <View style={[styles.container, {backgroundColor: colors.surface, borderTopColor: colors.border}]}>
      <BannerAd
        unitId={AD_UNIT_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={(error) => {
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
  },
});

export default AdBanner;
