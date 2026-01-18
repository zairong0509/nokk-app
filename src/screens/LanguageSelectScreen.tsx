/**
 * Language Select Screen
 * User can select app language
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import {COLORS, SPACING, FONTS, BORDER_RADIUS} from '../constants/theme';
import {useIsDarkMode, useAppStore, useLanguage} from '../store/appStore';
import {SUPPORTED_LANGUAGES, changeLanguage} from '../i18n';
import {preloadAllAudioForSettings} from '../services/audioService';
import {Language} from '../types';

const LanguageSelectScreen: React.FC = () => {
  const isDarkMode = useIsDarkMode();
  const currentLanguage = useLanguage();
  const setLanguage = useAppStore(state => state.setLanguage);
  const voiceTone = useAppStore(state => state.user.preferences.voiceTone);
  const navigation = useNavigation();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  const handleSelectLanguage = async (langCode: string) => {
    // Update i18n
    await changeLanguage(langCode);
    // Update store
    setLanguage(langCode as Language);
    // Preload audio for new language
    preloadAllAudioForSettings(langCode as Language, voiceTone);
    // Go back
    navigation.goBack();
  };

  const renderItem = ({item}: {item: typeof SUPPORTED_LANGUAGES[0]}) => (
    <TouchableOpacity
      style={[styles.item, {backgroundColor: colors.card}]}
      onPress={() => handleSelectLanguage(item.code)}
      activeOpacity={0.7}>
      <View style={styles.textContainer}>
        <Text style={[styles.nativeName, {color: colors.text}]}>
          {item.nativeName}
        </Text>
        <Text style={[styles.name, {color: colors.textSecondary}]}>
          {item.name}
        </Text>
      </View>
      {currentLanguage === item.code && (
        <Icon name="check" size={24} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]} edges={['bottom']}>
      <FlatList
        data={SUPPORTED_LANGUAGES}
        renderItem={renderItem}
        keyExtractor={item => item.code}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{height: SPACING.sm}} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  list: {padding: SPACING.lg},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.base,
    borderRadius: BORDER_RADIUS.lg,
  },
  textContainer: {flex: 1},
  nativeName: {fontSize: FONTS.sizes.lg, fontWeight: '600'},
  name: {fontSize: FONTS.sizes.sm, marginTop: 2},
});

export default LanguageSelectScreen;
