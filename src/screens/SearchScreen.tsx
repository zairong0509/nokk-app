/**
 * Search Screen
 * Search phrases by text or category
 */

import React, {useState, useMemo} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';

import {COLORS, SPACING, FONTS, BORDER_RADIUS} from '../constants/theme';
import {useIsDarkMode, useCategories} from '../store/appStore';
import {Phrase} from '../types';
import PhraseItem from '../components/PhraseItem';

const SearchScreen: React.FC = () => {
  const {t} = useTranslation();
  const isDarkMode = useIsDarkMode();
  const categories = useCategories();
  const navigation = useNavigation();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;
  
  const [query, setQuery] = useState('');

  // Get all phrases
  const allPhrases = useMemo(() => {
    return categories.flatMap(cat => cat.phrases);
  }, [categories]);

  // Filter phrases based on search query
  const filteredPhrases = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return allPhrases.filter(phrase =>
      phrase.text.toLowerCase().includes(lowerQuery)
    );
  }, [query, allPhrases]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Search Header */}
      <View style={styles.header}>
        <View style={[styles.searchContainer, {backgroundColor: colors.card}]}>
          <Icon name="magnify" size={24} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, {color: colors.text}]}
            placeholder={t('search.placeholder')}
            placeholderTextColor={colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            autoFocus
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Icon name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
          <Text style={[styles.cancelText, {color: COLORS.primary}]}>
            {t('common.cancel')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      {query.length > 0 && (
        <Text style={[styles.resultsText, {color: colors.textSecondary}]}>
          {filteredPhrases.length > 0
            ? t('search.results', {count: filteredPhrases.length})
            : t('search.noResults')}
        </Text>
      )}

      <FlatList
        data={filteredPhrases}
        renderItem={({item, index}) => (
          <PhraseItem phrase={item} isLast={index === filteredPhrases.length - 1} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flexDirection: 'row', alignItems: 'center', padding: SPACING.md},
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    height: 44,
  },
  searchInput: {flex: 1, fontSize: FONTS.sizes.base, marginLeft: SPACING.sm},
  cancelButton: {paddingLeft: SPACING.md},
  cancelText: {fontSize: FONTS.sizes.base, fontWeight: '500'},
  resultsText: {fontSize: FONTS.sizes.sm, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.sm},
  list: {paddingHorizontal: SPACING.md},
});

export default SearchScreen;
