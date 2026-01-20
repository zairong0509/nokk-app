/**
 * Customize Quick Actions Screen (Premium Only)
 * Allow premium users to customize their 5 quick action slots
 */

import React, {useState, useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, TextInput, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';

import {COLORS, SPACING, FONTS, BORDER_RADIUS} from '../constants/theme';
import {useIsDarkMode, useAppStore, useQuickActions, useCategories} from '../store/appStore';
import {QuickAction, Phrase, Category} from '../types';
import {PREMIUM_QUICK_ACTION_SLOTS} from '../constants/data';

const CustomizeQuickActionsScreen: React.FC = () => {
  const {t} = useTranslation();
  const isDarkMode = useIsDarkMode();
  const isPremium = useAppStore(state => state.user.subscriptionStatus === 'premium');
  const quickActions = useQuickActions();
  const categories = useCategories();
  const updateQuickActions = useAppStore(state => state.updateQuickActions);
  const navigation = useNavigation();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhrases, setSelectedPhrases] = useState<Phrase[]>([]);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Filter categories and phrases based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return categories;
    }

    const query = searchQuery.toLowerCase();
    const filtered = categories
      .map(category => ({
        ...category,
        phrases: category.phrases.filter(phrase => {
          // Search in translated text
          const translatedText = t(`phrases.${phrase.id}`);
          return translatedText.toLowerCase().includes(query);
        }),
      }))
      .filter(category => category.phrases.length > 0);
    
    // Auto-expand categories that have search results
    const newExpanded = new Set<string>();
    filtered.forEach(category => {
      newExpanded.add(category.id);
    });
    setExpandedCategories(newExpanded);
    
    return filtered;
  }, [categories, searchQuery, t]);

  // Handle phrase selection
  const handleSelectPhrase = (phrase: Phrase) => {
    if (selectedSlot === null) return;

    if (isPremium) {
      // Premium: Allow adding multiple phrases
      const isAlreadySelected = selectedPhrases.some(p => p.id === phrase.id);
      
      if (isAlreadySelected) {
        // Remove from selection
        setSelectedPhrases(selectedPhrases.filter(p => p.id !== phrase.id));
      } else {
        // Add to selection
        setSelectedPhrases([...selectedPhrases, phrase]);
      }
    } else {
      // Free: Single phrase only - immediate selection
      const newActions = [...quickActions];
      
      if (selectedSlot < newActions.length) {
        newActions[selectedSlot] = {
          ...newActions[selectedSlot],
          phraseId: phrase.id,
          text: phrase.text,
          audioFile: phrase.audioFile,
          isCombined: false,
        };
      } else {
        newActions.push({
          id: `quick_custom_${Date.now()}`,
          phraseId: phrase.id,
          text: phrase.text,
          audioFile: phrase.audioFile,
          order: selectedSlot + 1,
          isDefault: false,
          isCustomizable: true,
          isCombined: false,
        });
      }

      updateQuickActions(newActions);
      setSelectedSlot(null);
    }
  };

  // Handle confirm combined action (Premium only)
  const handleConfirmCombinedAction = () => {
    if (selectedSlot === null || selectedPhrases.length === 0) return;

    const newActions = [...quickActions];
    
    if (selectedPhrases.length === 1) {
      // Single phrase
      const phrase = selectedPhrases[0];
      if (selectedSlot < newActions.length) {
        newActions[selectedSlot] = {
          ...newActions[selectedSlot],
          phraseId: phrase.id,
          text: phrase.text,
          audioFile: phrase.audioFile,
          isCombined: false,
        };
      } else {
        newActions.push({
          id: `quick_custom_${Date.now()}`,
          phraseId: phrase.id,
          text: phrase.text,
          audioFile: phrase.audioFile,
          order: selectedSlot + 1,
          isDefault: false,
          isCustomizable: true,
          isCombined: false,
        });
      }
    } else {
      // Multiple phrases combined
      const combinedText = selectedPhrases.map(p => p.text).join(' + ');
      const phraseIds = selectedPhrases.map(p => p.id);
      const audioFiles = selectedPhrases.map(p => p.audioFile);
      
      if (selectedSlot < newActions.length) {
        newActions[selectedSlot] = {
          ...newActions[selectedSlot],
          phraseId: phraseIds,
          text: combinedText,
          audioFile: audioFiles,
          isCombined: true,
        };
      } else {
        newActions.push({
          id: `quick_custom_${Date.now()}`,
          phraseId: phraseIds,
          text: combinedText,
          audioFile: audioFiles,
          order: selectedSlot + 1,
          isDefault: false,
          isCustomizable: true,
          isCombined: true,
        });
      }
    }

    updateQuickActions(newActions);
    setSelectedSlot(null);
    setSelectedPhrases([]);
    setSearchQuery('');
  };

  // Handle cancel selection
  const handleCancelSelection = () => {
    setSelectedSlot(null);
    setSelectedPhrases([]);
    setSearchQuery('');
  };

  // Handle remove action
  const handleRemoveAction = (index: number) => {
    if (quickActions.length <= 1) {
      Alert.alert('Error', 'You must have at least one quick action.');
      return;
    }

    Alert.alert(
      'Remove Quick Action',
      'Are you sure you want to remove this quick action?',
      [
        {text: t('common.cancel'), style: 'cancel'},
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: () => {
            const newActions = quickActions.filter((_, i) => i !== index);
            updateQuickActions(newActions);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]} edges={['bottom']}>
      <ScrollView 
        style={styles.mainScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, isPremium && selectedPhrases.length > 0 && styles.scrollContentWithButton]}>
        {/* Current Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: colors.textSecondary}]}>
            YOUR QUICK ACTIONS ({quickActions.length}/{PREMIUM_QUICK_ACTION_SLOTS})
          </Text>
          {quickActions.map((action, index) => (
            <View
              key={action.id}
              style={[
                styles.actionItem,
                {
                  backgroundColor: selectedSlot === index ? COLORS.primary + '20' : colors.card,
                  borderColor: selectedSlot === index ? COLORS.primary : 'transparent',
                },
              ]}>
              <TouchableOpacity
                style={styles.actionItemContent}
                onPress={() => setSelectedSlot(selectedSlot === index ? null : index)}>
                <Text style={[styles.actionText, {color: colors.text}]} numberOfLines={1}>
                  {Array.isArray(action.phraseId) 
                    ? action.phraseId.map(id => t(`phrases.${id}`)).join(' + ')
                    : t(`phrases.${action.phraseId}`)
                  }
                </Text>
                <Icon name="pencil" size={18} color={isDarkMode ? COLORS.white : colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleRemoveAction(index)}>
                <Icon name="trash-can-outline" size={20} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          ))}
          
          {/* Add new slot button */}
          {quickActions.length < PREMIUM_QUICK_ACTION_SLOTS && (
            <TouchableOpacity
              style={[styles.addButton, {borderColor: colors.border}]}
              onPress={() => setSelectedSlot(quickActions.length)}>
              <Icon name="plus" size={24} color={COLORS.primary} />
              <Text style={[styles.addText, {color: COLORS.primary}]}>Add Quick Action</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Phrase Selection (when slot is selected) */}
        {selectedSlot !== null && (
          <View style={styles.phraseSection}>
            <View style={styles.phraseSectionHeader}>
            <Text style={[styles.sectionTitle, {color: colors.textSecondary}]}>
              {isPremium ? 'SELECT PHRASES (TAP TO ADD/REMOVE)' : 'SELECT A PHRASE'}
            </Text>
            <TouchableOpacity onPress={handleCancelSelection}>
              <Icon name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          {/* Selected Phrases Preview (Premium only) */}
          {isPremium && selectedPhrases.length > 0 && (
            <View style={[styles.selectedPhrasesContainer, {backgroundColor: COLORS.primary + '10', borderColor: COLORS.primary}]}>
              <Text style={[styles.selectedPhrasesLabel, {color: COLORS.primary}]}>
                SELECTED ({selectedPhrases.length}):
              </Text>
              <Text style={[styles.selectedPhrasesText, {color: colors.text}]} numberOfLines={2}>
                {selectedPhrases.map(p => t(`phrases.${p.id}`)).join(' + ')}
              </Text>
            </View>
          )}

          {/* Search Bar */}
          <View style={[styles.searchContainer, {backgroundColor: colors.card}]}>
            <Icon name="magnify" size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, {color: colors.text}]}
              placeholder="Search phrases..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Categories with Accordion */}
          <View style={styles.categoriesContainer}>
            {filteredCategories.map((category) => (
              <View key={category.id} style={styles.categoryContainer}>
                {/* Category Header */}
                <TouchableOpacity
                  style={[styles.categoryHeader, {backgroundColor: colors.card}]}
                  onPress={() => toggleCategory(category.id)}>
                  <View style={styles.categoryHeaderContent}>
                    <Icon 
                      name={category.icon} 
                      size={20} 
                      color={COLORS.primary} 
                      style={styles.categoryIcon}
                    />
                    <Text style={[styles.categoryTitle, {color: colors.text}]}>
                      {t(`categories.${category.id}`)}
                    </Text>
                    <Text style={[styles.phraseCount, {color: colors.textSecondary}]}>
                      ({category.phrases.length})
                    </Text>
                  </View>
                  <Icon
                    name={expandedCategories.has(category.id) ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>

                {/* Category Phrases (Expanded) */}
                {expandedCategories.has(category.id) && (
                  <View style={styles.phrasesContainer}>
                    {category.phrases.map((phrase) => {
                      const isSelected = isPremium && selectedPhrases.some(p => p.id === phrase.id);
                      return (
                        <TouchableOpacity
                          key={phrase.id}
                          style={[
                            styles.phraseItem, 
                            {
                              backgroundColor: isSelected ? COLORS.primary + '20' : colors.background,
                              borderWidth: isSelected ? 2 : 0,
                              borderColor: isSelected ? COLORS.primary : 'transparent',
                            }
                          ]}
                          onPress={() => handleSelectPhrase(phrase)}>
                          <Text style={[styles.phraseText, {color: colors.text}]}>
                            {t(`phrases.${phrase.id}`)}
                          </Text>
                          {isPremium ? (
                            <Icon 
                              name={isSelected ? "check-circle" : "plus-circle-outline"} 
                              size={20} 
                              color={isSelected ? COLORS.primary : colors.textSecondary} 
                            />
                          ) : (
                            <Icon name="chevron-right" size={18} color={colors.textSecondary} />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            ))}

            {filteredCategories.length === 0 && (
              <View style={styles.emptyState}>
                <Icon name="magnify-close" size={48} color={colors.textSecondary} />
                <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
                  {t('home.noResults')}
                </Text>
              </View>
            )}
          </View>

          </View>
        )}
      </ScrollView>

      {/* Confirm Button (Premium only, when phrases are selected) - Fixed at bottom */}
      {isPremium && selectedPhrases.length > 0 && selectedSlot !== null && (
        <View style={[styles.confirmButtonContainer, {backgroundColor: colors.background, borderTopColor: colors.border}]}>
          <TouchableOpacity
            style={[styles.confirmButton, {backgroundColor: COLORS.primary}]}
            onPress={handleConfirmCombinedAction}>
            <Icon name="check" size={24} color={COLORS.white} />
            <Text style={styles.confirmButtonText}>
              {selectedPhrases.length === 1 ? 'Confirm Selection' : `Combine ${selectedPhrases.length} Phrases`}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  mainScroll: {flex: 1},
  scrollContent: {flexGrow: 1},
  scrollContentWithButton: {paddingBottom: 80},
  section: {padding: SPACING.lg},
  sectionTitle: {fontSize: FONTS.sizes.xs, fontWeight: '600', letterSpacing: 1, marginBottom: SPACING.md},
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    borderWidth: 2,
  },
  actionItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: SPACING.base,
  },
  actionText: {fontSize: FONTS.sizes.base, flex: 1, marginRight: SPACING.sm},
  deleteButton: {
    padding: SPACING.base,
    paddingLeft: SPACING.sm,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.base,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  addText: {fontSize: FONTS.sizes.base, fontWeight: '500', marginLeft: SPACING.sm},
  phraseSection: {paddingHorizontal: SPACING.lg, paddingBottom: SPACING.lg},
  phraseSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  selectedPhrasesContainer: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    borderWidth: 2,
  },
  selectedPhrasesLabel: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  selectedPhrasesText: {
    fontSize: FONTS.sizes.base,
    lineHeight: FONTS.sizes.base * 1.5,
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
    marginLeft: SPACING.sm,
    fontSize: FONTS.sizes.base,
    paddingVertical: SPACING.xs,
  },
  categoriesContainer: {
    marginBottom: SPACING.md,
  },
  categoryContainer: {
    marginBottom: SPACING.sm,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  categoryHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    marginRight: SPACING.sm,
  },
  categoryTitle: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
  },
  phraseCount: {
    fontSize: FONTS.sizes.sm,
    marginLeft: SPACING.xs,
  },
  phrasesContainer: {
    marginTop: SPACING.xs,
    paddingLeft: SPACING.md,
  },
  phraseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xs,
  },
  phraseText: {
    fontSize: FONTS.sizes.md,
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING['3xl'],
  },
  emptyText: {
    fontSize: FONTS.sizes.base,
    marginTop: SPACING.md,
  },
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.md,
    paddingBottom: SPACING.lg,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.base,
    borderRadius: BORDER_RADIUS.lg,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
});

export default CustomizeQuickActionsScreen;
