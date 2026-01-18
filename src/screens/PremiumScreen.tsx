/**
 * Premium Screen
 * In-App Purchase and subscription management
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';

import {COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS} from '../constants/theme';
import {useIsDarkMode, useAppStore, useIsPremium} from '../store/appStore';
import {purchasePremium, restorePurchases} from '../services/iapService';

const PremiumScreen: React.FC = () => {
  const {t} = useTranslation();
  const isDarkMode = useIsDarkMode();
  const isPremium = useIsPremium();
  const setSubscription = useAppStore(state => state.setSubscription);
  const colors = isDarkMode ? COLORS.dark : COLORS.light;
  
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | 'lifetime'>('yearly');

  const plans = [
    {id: 'monthly', price: '$2.99', period: t('premium.perMonth'), save: null},
    {id: 'yearly', price: '$19.99', period: t('premium.perYear'), save: '45%'},
    {id: 'lifetime', price: '$49.99', period: t('premium.oneTime'), save: 'Best'},
  ];

  const benefits = [
    {icon: 'message-text-lock-outline', text: t('premium.benefit1')},
    {icon: 'account-voice', text: t('premium.benefit2')},
    {icon: 'lightning-bolt', text: t('premium.benefit3')},
    {icon: 'advertisement-off', text: t('premium.benefit4')},
  ];

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const success = await purchasePremium(selectedPlan);
      if (success) {
        setSubscription('premium');
        Alert.alert(t('common.success'), 'Welcome to NOKK Premium!');
      }
    } catch (error) {
      Alert.alert(t('common.error'), t('errors.purchase'));
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      const success = await restorePurchases();
      if (success) {
        setSubscription('premium');
        Alert.alert(t('common.success'), 'Purchase restored successfully!');
      } else {
        Alert.alert(t('common.error'), 'No purchase found to restore.');
      }
    } catch (error) {
      Alert.alert(t('common.error'), 'Failed to restore purchase.');
    } finally {
      setLoading(false);
    }
  };

  if (isPremium) {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.premiumActive}>
          <Icon name="crown" size={64} color={COLORS.premium} />
          <Text style={[styles.premiumActiveTitle, {color: colors.text}]}>
            You're Premium!
          </Text>
          <Text style={[styles.premiumActiveSubtitle, {color: colors.textSecondary}]}>
            All features are unlocked
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Icon name="crown" size={48} color={COLORS.premium} />
          <Text style={[styles.title, {color: colors.text}]}>
            {t('premium.title')}
          </Text>
          <Text style={[styles.subtitle, {color: colors.textSecondary}]}>
            {t('premium.subtitle')}
          </Text>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsContainer}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <Icon name={benefit.icon} size={24} color={COLORS.primary} />
              <Text style={[styles.benefitText, {color: colors.text}]}>
                {benefit.text}
              </Text>
            </View>
          ))}
        </View>

        {/* Plans */}
        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                {
                  backgroundColor: colors.card,
                  borderColor: selectedPlan === plan.id ? COLORS.primary : colors.border,
                  borderWidth: selectedPlan === plan.id ? 2 : 1,
                },
              ]}
              onPress={() => setSelectedPlan(plan.id as any)}
              activeOpacity={0.7}>
              {plan.save && (
                <View style={styles.saveBadge}>
                  <Text style={styles.saveText}>{plan.save}</Text>
                </View>
              )}
              <Text style={[styles.planPrice, {color: colors.text}]}>
                {plan.price}
              </Text>
              <Text style={[styles.planPeriod, {color: colors.textSecondary}]}>
                {plan.period}
              </Text>
              {selectedPlan === plan.id && (
                <Icon name="check-circle" size={24} color={COLORS.primary} style={styles.checkIcon} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Purchase Button */}
        <TouchableOpacity
          style={[styles.purchaseButton, loading && styles.purchaseButtonDisabled]}
          onPress={handlePurchase}
          disabled={loading}
          activeOpacity={0.8}>
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.purchaseButtonText}>{t('premium.subscribe')}</Text>
          )}
        </TouchableOpacity>

        {/* Restore */}
        <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}>
          <Text style={[styles.restoreText, {color: colors.textSecondary}]}>
            {t('premium.restore')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollContent: {padding: SPACING.lg, paddingTop: SPACING['3xl']},
  header: {alignItems: 'center', marginBottom: SPACING['2xl']},
  title: {fontSize: FONTS.sizes['3xl'], fontWeight: '700', marginTop: SPACING.md},
  subtitle: {fontSize: FONTS.sizes.base, marginTop: SPACING.xs},
  benefitsContainer: {marginBottom: SPACING['2xl']},
  benefitItem: {flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md},
  benefitText: {fontSize: FONTS.sizes.base, marginLeft: SPACING.md, flex: 1},
  plansContainer: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.xl},
  planCard: {
    flex: 1,
    alignItems: 'center',
    padding: SPACING.base,
    borderRadius: BORDER_RADIUS.lg,
    marginHorizontal: SPACING.xs,
    position: 'relative',
  },
  saveBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  saveText: {color: COLORS.white, fontSize: FONTS.sizes.xs, fontWeight: '600'},
  planPrice: {fontSize: FONTS.sizes.xl, fontWeight: '700', marginTop: SPACING.sm},
  planPeriod: {fontSize: FONTS.sizes.xs, marginTop: 2},
  checkIcon: {position: 'absolute', bottom: 8, right: 8},
  purchaseButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.base,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  purchaseButtonDisabled: {opacity: 0.7},
  purchaseButtonText: {color: COLORS.white, fontSize: FONTS.sizes.lg, fontWeight: '600'},
  restoreButton: {alignItems: 'center', marginTop: SPACING.lg},
  restoreText: {fontSize: FONTS.sizes.sm},
  premiumActive: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  premiumActiveTitle: {fontSize: FONTS.sizes['2xl'], fontWeight: '700', marginTop: SPACING.lg},
  premiumActiveSubtitle: {fontSize: FONTS.sizes.base, marginTop: SPACING.sm},
});

export default PremiumScreen;
