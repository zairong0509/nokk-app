/**
 * Voice Tone Select Screen (Premium Only)
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';

import {COLORS, SPACING, FONTS, BORDER_RADIUS} from '../constants/theme';
import {useIsDarkMode, useAppStore, useVoiceTone, useLanguage} from '../store/appStore';
import {preloadAllAudioForSettings} from '../services/audioService';
import {VoiceTone} from '../types';

const VOICE_TONES: {id: VoiceTone; icon: string}[] = [
  {id: 'normal', icon: 'account-voice'},
  {id: 'firm', icon: 'account-tie-voice'},
  {id: 'angry', icon: 'account-alert'},
];

const ToneSelectScreen: React.FC = () => {
  const {t} = useTranslation();
  const isDarkMode = useIsDarkMode();
  const currentTone = useVoiceTone();
  const language = useLanguage();
  const setVoiceTone = useAppStore(state => state.setVoiceTone);
  const navigation = useNavigation();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  const handleSelectTone = async (tone: VoiceTone) => {
    setVoiceTone(tone);
    // Preload audio for new tone
    preloadAllAudioForSettings(language, tone);
    navigation.goBack();
  };

  const renderItem = ({item}: {item: typeof VOICE_TONES[0]}) => (
    <TouchableOpacity
      style={[styles.item, {backgroundColor: colors.card}]}
      onPress={() => handleSelectTone(item.id)}
      activeOpacity={0.7}>
      <View style={[styles.iconContainer, {backgroundColor: COLORS.primary + '20'}]}>
        <Icon name={item.icon} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.name, {color: colors.text}]}>
          {t(`voiceTone.${item.id}`)}
        </Text>
      </View>
      {currentTone === item.id && (
        <Icon name="check" size={24} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]} edges={['bottom']}>
      <Text style={[styles.description, {color: colors.textSecondary}]}>
        {t('voiceTone.description')}
      </Text>
      <FlatList
        data={VOICE_TONES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{height: SPACING.sm}} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  description: {fontSize: FONTS.sizes.sm, padding: SPACING.lg, paddingBottom: SPACING.sm},
  list: {paddingHorizontal: SPACING.lg},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    borderRadius: BORDER_RADIUS.lg,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {flex: 1},
  name: {fontSize: FONTS.sizes.lg, fontWeight: '600'},
});

export default ToneSelectScreen;
