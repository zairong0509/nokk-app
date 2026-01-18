/**
 * Home Screen
 * Main screen with Quick Actions and Categories
 * Single screen structure - no bottom navigation
 * Priority: Speed and instant access to safety voices
 */

import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';

import {COLORS, SPACING, FONTS, BORDER_RADIUS} from '../constants/theme';
import {
  useIsDarkMode,
  useQuickActions,
  useCategories,
  useAppStore,
  useIsPremium,
} from '../store/appStore';
import {RootStackParamList, Category} from '../types';
import QuickActionButton from '../components/QuickActionButton';
import CategoryCard from '../components/CategoryCard';
import AdBanner from '../components/AdBanner';

const HomeScreen: React.FC = () => {
  const {t} = useTranslation();
  const isDarkMode = useIsDarkMode();
  const isPremium = useIsPremium();
  const quickActions = useQuickActions();
  const categories = useCategories();
  const expandedCategoryId = useAppStore(state => state.expandedCategoryId);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Filter categories and phrases based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    
    const query = searchQuery.toLowerCase();
    
    return categories
      .map(category => {
        // Check if category name matches
        const categoryMatches = category.name.toLowerCase().includes(query);
        
        // Filter phrases that match
        const filteredPhrases = category.phrases.filter(phrase =>
          phrase.text.toLowerCase().includes(query)
        );
        
        // Include category if name matches or has matching phrases
        if (categoryMatches) {
          return category; // Return full category if name matches
        } else if (filteredPhrases.length > 0) {
          return {...category, phrases: filteredPhrases};
        }
        return null;
      })
      .filter((cat): cat is Category => cat !== null);
  }, [categories, searchQuery]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Header - Settings button instead of Search */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.appName, {color: colors.text}]}>NOKK</Text>
          <Text style={[styles.tagline, {color: colors.textSecondary}]}>
            {t('app.tagline')}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.settingsButton, {backgroundColor: COLORS.primary}]}
          onPress={() => navigation.navigate('Settings')}
          accessibilityLabel="Settings">
          <Icon name="cog" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: isPremium ? 20 : 80}, // Extra padding for ad banner
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Quick Actions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>
              {t('home.quickActions')}
            </Text>
            {isPremium && (
              <TouchableOpacity
                onPress={() => navigation.navigate('CustomizeQuickActions')}
                style={styles.editButton}>
                <Icon name="pencil" size={18} color={COLORS.primary} />
                <Text style={[styles.editText, {color: COLORS.primary}]}>
                  {t('common.edit')}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {quickActions.map((action, index) => (
            <QuickActionButton key={action.id} action={action} index={index} />
          ))}
        </View>

        {/* Categories Section with Search */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>
            {t('home.categories')}
          </Text>

          <View style={styles.categoriesSpacing} />

          {/* Search Input inside Categories */}
          <View style={[styles.searchContainer, {backgroundColor: colors.card}]}>
            <Icon name="magnify" size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, {color: colors.text}]}
              placeholder={t('search.placeholder')}
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close-circle" size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Search Results Info */}
          {searchQuery.length > 0 && (
            <Text style={[styles.searchResultsText, {color: colors.textSecondary}]}>
              {filteredCategories.length > 0
                ? `${filteredCategories.reduce((acc, cat) => acc + cat.phrases.length, 0)} results`
                : t('search.noResults')}
            </Text>
          )}

          {/* Filtered Categories */}
          {filteredCategories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              isExpanded={expandedCategoryId === category.id}
            />
          ))}
        </View>

        {/* Premium Banner removed - conversion happens through phrase interaction */}
      </ScrollView>

      {/* Ad Banner (free users only) */}
      <AdBanner />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  appName: {
    fontSize: FONTS.sizes['3xl'],
    fontWeight: '800',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
  },
  searchInput: {
    flex: 1,
    fontSize: FONTS.sizes.md,
    marginLeft: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  searchResultsText: {
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.sm,
  },
  categoriesSpacing: {
    height: SPACING.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default HomeScreen;
