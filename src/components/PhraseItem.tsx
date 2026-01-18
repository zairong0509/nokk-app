/**
 * Phrase Item Component
 * Shows individual phrase with play functionality
 * Free users: See phrases but cannot play (shows upgrade popup)
 * Premium users: Tap = instant playback
 */

import React, {useCallback} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';

import {COLORS, SPACING, BORDER_RADIUS, FONTS} from '../constants/theme';
import {useIsDarkMode, useIsPremium, useAudioState} from '../store/appStore';
import {playAudio} from '../services/audioService';
import {Phrase, RootStackParamList} from '../types';

interface PhraseItemProps {
  phrase: Phrase;
  isLast?: boolean;
}

export const PhraseItem: React.FC<PhraseItemProps> = ({phrase, isLast}) => {
  const {t} = useTranslation();
  const isDarkMode = useIsDarkMode();
  const isPremium = useIsPremium();
  const audioState = useAudioState();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  const isPlaying = audioState.isPlaying && audioState.currentPhraseId === phrase.id;
  const isLocked = phrase.isPremium && !isPremium;

  // Handle phrase tap
  const handlePress = useCallback(() => {
    console.log('Phrase tapped:', phrase.text, 'isLocked:', isLocked, 'isPremium:', isPremium);
    
    if (isLocked) {
      // Free user taps phrase → go directly to Premium screen
      console.log('Navigating to Premium screen...');
      navigation.navigate('Premium');
      return;
    }

    // Premium user → INSTANT playback - no delays
    console.log('Playing audio...');
    playAudio(phrase.audioFile, phrase.id);
  }, [isLocked, phrase.audioFile, phrase.id, navigation, isPremium, phrase.text]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderBottomColor: isLast ? 'transparent' : colors.divider,
          opacity: isLocked ? 0.7 : 1,
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.6}
      accessibilityLabel={phrase.text}
      accessibilityRole="button"
      accessibilityHint={isLocked ? 'Tap to upgrade to Premium' : 'Tap to play audio'}>
      <View style={styles.content}>
        <Text
          style={[
            styles.text,
            {color: isLocked ? colors.textTertiary : colors.text},
          ]}
          numberOfLines={2}>
          {t(`phrases.${phrase.id}`, {defaultValue: phrase.text})}
        </Text>
      </View>

      <View style={styles.rightSection}>
        {isLocked ? (
          <View style={[styles.lockBadge, {backgroundColor: COLORS.premium + '20'}]}>
            <Icon name="lock" size={16} color={COLORS.premium} />
          </View>
        ) : isPlaying ? (
          <View style={styles.playingContainer}>
            <Icon name="volume-high" size={20} color={COLORS.primary} />
          </View>
        ) : (
          <Icon name="play-circle-outline" size={24} color={colors.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.base,
    borderBottomWidth: 1,
    minHeight: 64,
  },
  content: {
    flex: 1,
    marginRight: SPACING.md,
  },
  text: {
    fontSize: FONTS.sizes.base,
    lineHeight: 24,
    fontWeight: '500',
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  lockBadge: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playingContainer: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PhraseItem;
