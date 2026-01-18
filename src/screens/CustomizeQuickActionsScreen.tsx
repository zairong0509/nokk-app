/**
 * Customize Quick Actions Screen (Premium Only)
 * Allow premium users to customize their 5 quick action slots
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';

import {COLORS, SPACING, FONTS, BORDER_RADIUS} from '../constants/theme';
import {useIsDarkMode, useAppStore, useQuickActions, useCategories} from '../store/appStore';
import {QuickAction, Phrase} from '../types';
import {PREMIUM_QUICK_ACTION_SLOTS} from '../constants/data';

const CustomizeQuickActionsScreen: React.FC = () => {
  const {t} = useTranslation();
  const isDarkMode = useIsDarkMode();
  const quickActions = useQuickActions();
  const categories = useCategories();
  const updateQuickActions = useAppStore(state => state.updateQuickActions);
  const navigation = useNavigation();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  // Get all phrases
  const allPhrases = categories.flatMap(cat => cat.phrases);

  // Handle phrase selection
  const handleSelectPhrase = (phrase: Phrase) => {
    if (selectedSlot === null) return;

    const newActions = [...quickActions];
    
    // Check if we're adding or replacing
    if (selectedSlot < newActions.length) {
      newActions[selectedSlot] = {
        ...newActions[selectedSlot],
        phraseId: phrase.id,
        text: phrase.text,
        audioFile: phrase.audioFile,
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
      });
    }

    updateQuickActions(newActions);
    setSelectedSlot(null);
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
      {/* Current Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: colors.textSecondary}]}>
          YOUR QUICK ACTIONS ({quickActions.length}/{PREMIUM_QUICK_ACTION_SLOTS})
        </Text>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={action.id}
            style={[
              styles.actionItem,
              {
                backgroundColor: selectedSlot === index ? COLORS.primary + '20' : colors.card,
                borderColor: selectedSlot === index ? COLORS.primary : 'transparent',
              },
            ]}
            onPress={() => setSelectedSlot(selectedSlot === index ? null : index)}
            onLongPress={() => handleRemoveAction(index)}>
            <Text style={[styles.actionText, {color: colors.text}]} numberOfLines={1}>
              {action.text}
            </Text>
            <Icon name="pencil" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
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
          <Text style={[styles.sectionTitle, {color: colors.textSecondary}]}>
            SELECT A PHRASE
          </Text>
          <FlatList
            data={allPhrases}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[styles.phraseItem, {backgroundColor: colors.card}]}
                onPress={() => handleSelectPhrase(item)}>
                <Text style={[styles.phraseText, {color: colors.text}]}>{item.text}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={{height: SPACING.xs}} />}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  section: {padding: SPACING.lg},
  sectionTitle: {fontSize: FONTS.sizes.xs, fontWeight: '600', letterSpacing: 1, marginBottom: SPACING.md},
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.base,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    borderWidth: 2,
  },
  actionText: {fontSize: FONTS.sizes.base, flex: 1, marginRight: SPACING.sm},
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
  phraseSection: {flex: 1, paddingHorizontal: SPACING.lg},
  phraseItem: {padding: SPACING.md, borderRadius: BORDER_RADIUS.md},
  phraseText: {fontSize: FONTS.sizes.md},
});

export default CustomizeQuickActionsScreen;
