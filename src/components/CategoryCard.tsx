/**
 * Category Card Component
 * Accordion-style expandable category with phrases
 */

import React, {useCallback} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';

import {COLORS, SPACING, BORDER_RADIUS, FONTS, SHADOWS} from '../constants/theme';
import {useIsDarkMode, useAppStore} from '../store/appStore';
import {Category, CategoryType} from '../types';
import PhraseItem from './PhraseItem';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CategoryCardProps {
  category: Category;
  isExpanded: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isExpanded,
}) => {
  const {t} = useTranslation();
  const isDarkMode = useIsDarkMode();
  const setExpandedCategory = useAppStore(state => state.setExpandedCategory);
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  const handleToggle = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCategory(isExpanded ? null : category.id);
  }, [isExpanded, category.id, setExpandedCategory]);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: category.color,
          },
        ]}
        onPress={handleToggle}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityState={{expanded: isExpanded}}>
        <View style={styles.iconContainer}>
          <Icon name={category.icon} size={28} color={COLORS.white} />
        </View>
        <Text style={styles.name}>{t(`categories.${category.id}`, {defaultValue: category.name})}</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {category.phrases.length}
          </Text>
        </View>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={COLORS.white}
        />
      </TouchableOpacity>

      {/* Expanded Phrase List - Accordion Style */}
      {isExpanded && (
        <View style={[styles.phraseList, {backgroundColor: colors.background}]}>
          {category.phrases.map((phrase, index) => (
            <PhraseItem
              key={phrase.id}
              phrase={phrase}
              isLast={index === category.phrases.length - 1}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.md,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    borderRadius: BORDER_RADIUS.xl,
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
  name: {
    flex: 1,
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
  },
  countBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.sm,
  },
  countText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  phraseList: {
    marginTop: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    marginLeft: SPACING.xl,
  },
});

export default CategoryCard;
