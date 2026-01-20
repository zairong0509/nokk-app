/**
 * Premium Screen
 * One-time purchase (Lifetime) - No subscriptions
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
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';

import {COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS} from '../constants/theme';
import {useIsDarkMode, useAppStore, useIsPremium} from '../store/appStore';
import {purchasePremium, restorePurchase, getProductInfo} from '../services/iapService';

const PremiumScreen: React.FC = () => {
  const {t} = useTranslation();
  const isDarkMode = useIsDarkMode();
  const isPremium = useIsPremium();
  const setSubscription = useAppStore(state => state.setSubscription);
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [price, setPrice] = useState('$4.99');

  useEffect(() => {
    loadProductInfo();
  }, []);

  const loadProductInfo = async () => {
    const info = await getProductInfo();
    if (info) {
      setPrice(info.price);
    }
  };

  const benefits = [
    {icon: 'message-text-lock-outline', text: t('premium.benefit1')},
    {icon: 'account-voice', text: t('premium.benefit2')},
    {icon: 'lightning-bolt', text: t('premium.benefit3')},
    {icon: 'advertisement-off', text: t('premium.benefit4')},
  ];

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const success = await purchasePremium();
      if (success) {
        setSubscription('premium');
        Alert.alert(
          t('premium.successTitle'),
          t('premium.successMessage'),
        );
      }
    } catch (error) {
      console.error('Purchase error:', error);
      Alert.alert(t('common.error'), t('premium.purchaseError'));
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setRestoring(true);
    try {
      const success = await restorePurchase();
      if (success) {
        setSubscription('premium');
        Alert.alert(
          t('premium.restoreSuccessTitle'),
          t('premium.restoreSuccessMessage'),
        );
      } else {
        Alert.alert(
          t('premium.restoreFailTitle'),
          t('premium.restoreFailMessage'),
        );
      }
    } catch (error) {
      console.error('Restore error:', error);
      Alert.alert(t('common.error'), t('premium.restoreError'));
    } finally {
      setRestoring(false);
    }
  };

  // Already Premium - Show success screen
  if (isPremium) {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.premiumActiveContainer}>
          <View style={styles.successIconContainer}>
            <Icon name="crown" size={80} color={COLORS.premium} />
          </View>
          <Text style={[styles.premiumActiveTitle, {color: colors.text}]}>
            {t('premium.alreadyPremiumTitle')}
          </Text>
          <Text style={[styles.premiumActiveSubtitle, {color: colors.textSecondary}]}>
            {t('premium.alreadyPremiumMessage')}
          </Text>
          
          <View style={styles.benefitsUnlockedContainer}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitUnlockedItem}>
                <Icon name="check-circle" size={20} color={COLORS.success} />
                <Text style={[styles.benefitUnlockedText, {color: colors.text}]}>
                  {benefit.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Purchase screen
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon name="crown" size={60} color={COLORS.premium} />
          </View>
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
            <View
              key={index}
              style={[styles.benefitItem, {backgroundColor: colors.surface}]}>
              <View style={[styles.benefitIconContainer, {backgroundColor: colors.background}]}>
                <Icon name={benefit.icon as any} size={24} color={COLORS.primary} />
              </View>
              <Text style={[styles.benefitText, {color: colors.text}]}>
                {benefit.text}
              </Text>
            </View>
          ))}
        </View>

        {/* Price Card */}
        <View style={[styles.priceCard, {backgroundColor: colors.surface}]}>
          <View style={styles.priceBadge}>
            <Text style={styles.priceBadgeText}>{t('premium.oneTimePurchase')}</Text>
          </View>
          <Text style={[styles.priceAmount, {color: colors.text}]}>{price}</Text>
          <Text style={[styles.priceDescription, {color: colors.textSecondary}]}>
            {t('premium.lifetimeAccess')}
          </Text>
        </View>

        {/* Purchase Button */}
        <TouchableOpacity
          style={[styles.purchaseButton, loading && styles.purchaseButtonDisabled]}
          onPress={handlePurchase}
          disabled={loading || restoring}
          activeOpacity={0.8}>
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <>
              <Icon name="lock-open-outline" size={22} color={COLORS.white} />
              <Text style={styles.purchaseButtonText}>
                {t('premium.unlockNow')}
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Restore Button */}
        <TouchableOpacity
          style={styles.restoreButton}
          onPress={handleRestore}
          disabled={loading || restoring}>
          {restoring ? (
            <ActivityIndicator size="small" color={colors.textSecondary} />
          ) : (
            <Text style={[styles.restoreText, {color: colors.textSecondary}]}>
              {t('premium.restore')}
            </Text>
          )}
        </TouchableOpacity>

        {/* Footer Note */}
        <Text style={[styles.footerNote, {color: colors.textSecondary}]}>
          {t('premium.footerNote')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 193, 7, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    marginTop: SPACING.sm,
  },
  subtitle: {
    fontSize: FONTS.sizes.base,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  benefitsContainer: {
    marginBottom: SPACING.xl,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
  },
  benefitIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  benefitText: {
    fontSize: FONTS.sizes.base,
    flex: 1,
    fontWeight: '500',
  },
  priceCard: {
    alignItems: 'center',
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.xl,
    position: 'relative',
  },
  priceBadge: {
    position: 'absolute',
    top: -12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  priceBadgeText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  priceAmount: {
    fontSize: 48,
    fontWeight: '700',
    marginTop: SPACING.sm,
  },
  priceDescription: {
    fontSize: FONTS.sizes.base,
    marginTop: SPACING.xs,
  },
  purchaseButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    ...SHADOWS.md,
  },
  purchaseButtonDisabled: {
    opacity: 0.7,
  },
  purchaseButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
  },
  restoreButton: {
    alignItems: 'center',
    marginTop: SPACING.lg,
    padding: SPACING.sm,
  },
  restoreText: {
    fontSize: FONTS.sizes.sm,
    textDecorationLine: 'underline',
  },
  footerNote: {
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
    marginTop: SPACING.xl,
    lineHeight: 18,
  },
  // Premium Active Styles
  premiumActiveContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  successIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 193, 7, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  premiumActiveTitle: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  premiumActiveSubtitle: {
    fontSize: FONTS.sizes.base,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  benefitsUnlockedContainer: {
    width: '100%',
    marginTop: SPACING.md,
  },
  benefitUnlockedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  benefitUnlockedText: {
    fontSize: FONTS.sizes.base,
  },
});

export default PremiumScreen;
