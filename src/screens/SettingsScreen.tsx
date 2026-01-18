/**
 * Settings Screen
 * Language, Voice Tone, Account, and App Settings
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';

import {COLORS, SPACING, FONTS, BORDER_RADIUS} from '../constants/theme';
import {
  useIsDarkMode,
  useAppStore,
  useIsPremium,
  useUser,
  useLanguage,
  useVoiceTone,
} from '../store/appStore';
import {RootStackParamList} from '../types';
import {SUPPORTED_LANGUAGES} from '../i18n';

const SettingsScreen: React.FC = () => {
  const {t} = useTranslation();
  const isDarkMode = useIsDarkMode();
  const isPremium = useIsPremium();
  const user = useUser();
  const language = useLanguage();
  const voiceTone = useVoiceTone();
  const toggleDarkMode = useAppStore(state => state.toggleDarkMode);
  const restorePurchase = useAppStore(state => state.restorePurchase);
  const logout = useAppStore(state => state.logout);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  // Get language display name
  const getLanguageName = () => {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === language);
    return lang?.nativeName || 'English';
  };

  // Get voice tone display name
  const getVoiceToneName = () => {
    return t(`voiceTone.${voiceTone}`);
  };

  // Handle restore purchase
  const handleRestorePurchase = async () => {
    const success = await restorePurchase();
    if (success) {
      Alert.alert(t('common.success'), 'Your purchase has been restored.');
    } else {
      Alert.alert(t('common.error'), 'No purchase found to restore.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      t('settings.logout'),
      'Are you sure you want to log out?',
      [
        {text: t('common.cancel'), style: 'cancel'},
        {
          text: t('settings.logout'),
          style: 'destructive',
          onPress: () => logout(),
        },
      ],
    );
  };

  // Settings item component
  const SettingsItem = ({
    icon,
    title,
    value,
    onPress,
    showChevron = true,
    isSwitch = false,
    switchValue = false,
    onSwitchChange,
    disabled = false,
    isPremiumFeature = false,
  }: {
    icon: string;
    title: string;
    value?: string;
    onPress?: () => void;
    showChevron?: boolean;
    isSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    disabled?: boolean;
    isPremiumFeature?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.settingsItem, {opacity: disabled ? 0.5 : 1}]}
      onPress={onPress}
      disabled={disabled || isSwitch}
      activeOpacity={0.7}>
      <View style={[styles.iconContainer, {backgroundColor: COLORS.primary + '20'}]}>
        <Icon name={icon} size={22} color={isDarkMode ? COLORS.white : COLORS.primary} />
      </View>
      <View style={styles.settingsContent}>
        <View style={styles.settingsTitleRow}>
          <Text style={[styles.settingsTitle, {color: colors.text}]}>
            {title}
          </Text>
          {isPremiumFeature && !isPremium && (
            <View style={styles.premiumBadge}>
              <Icon name="crown" size={12} color={COLORS.premium} />
            </View>
          )}
        </View>
        {value && (
          <Text style={[styles.settingsValue, {color: colors.textSecondary}]}>
            {value}
          </Text>
        )}
      </View>
      {isSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{false: colors.border, true: COLORS.primary}}
          thumbColor={COLORS.white}
        />
      ) : showChevron ? (
        <Icon name="chevron-right" size={24} color={colors.textSecondary} />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, {color: colors.text}]}>
            {t('settings.title')}
          </Text>
        </View>

        {/* Subscription Status */}
        <TouchableOpacity
          style={[styles.subscriptionCard, {backgroundColor: isPremium ? COLORS.primary + '20' : colors.card}]}
          onPress={() => navigation.navigate('Premium')}>
          <View style={styles.subscriptionContent}>
            <Icon
              name={isPremium ? 'crown' : 'crown-outline'}
              size={28}
              color={isPremium ? COLORS.premium : colors.textSecondary}
            />
            <View style={styles.subscriptionText}>
              <Text style={[styles.subscriptionTitle, {color: colors.text}]}>
                {isPremium ? t('premium.premiumPlan') : t('premium.freePlan')}
              </Text>
              <Text style={[styles.subscriptionSubtitle, {color: colors.textSecondary}]}>
                {isPremium ? 'All features unlocked' : 'Tap to upgrade'}
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Voice Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: colors.textSecondary}]}>
            VOICE
          </Text>
          <View style={[styles.settingsGroup, {backgroundColor: colors.card}]}>
            <SettingsItem
              icon="translate"
              title={t('settings.language')}
              value={getLanguageName()}
              onPress={() => navigation.navigate('LanguageSelect')}
            />
            <View style={[styles.divider, {backgroundColor: colors.divider}]} />
            <SettingsItem
              icon="account-voice"
              title={t('settings.voiceTone')}
              value={getVoiceToneName()}
              onPress={() => {
                if (isPremium) {
                  navigation.navigate('ToneSelect');
                } else {
                  navigation.navigate('Premium');
                }
              }}
              isPremiumFeature={true}
            />
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: colors.textSecondary}]}>
            APP
          </Text>
          <View style={[styles.settingsGroup, {backgroundColor: colors.card}]}>
            <SettingsItem
              icon="theme-light-dark"
              title={t('settings.darkMode')}
              isSwitch={true}
              switchValue={isDarkMode}
              onSwitchChange={toggleDarkMode}
            />
          </View>
        </View>

        {/* Account */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: colors.textSecondary}]}>
            ACCOUNT
          </Text>
          <View style={[styles.settingsGroup, {backgroundColor: colors.card}]}>
            {user.isLoggedIn ? (
              <>
                <SettingsItem
                  icon="account"
                  title={user.displayName || user.email || 'Account'}
                  value={user.email}
                  showChevron={false}
                />
                <View style={[styles.divider, {backgroundColor: colors.divider}]} />
                <SettingsItem
                  icon="logout"
                  title={t('settings.logout')}
                  onPress={handleLogout}
                  showChevron={false}
                />
              </>
            ) : (
              <SettingsItem
                icon="login"
                title={t('settings.login')}
                value="Optional - Sign in with Google"
                onPress={() => {/* Implement Google Sign In */}}
              />
            )}
            <View style={[styles.divider, {backgroundColor: colors.divider}]} />
            <SettingsItem
              icon="restore"
              title={t('settings.restorePurchase')}
              onPress={handleRestorePurchase}
              showChevron={false}
            />
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: colors.textSecondary}]}>
            ABOUT
          </Text>
          <View style={[styles.settingsGroup, {backgroundColor: colors.card}]}>
            <SettingsItem
              icon="shield-check"
              title={t('settings.privacy')}
              onPress={() => Linking.openURL('https://nokk.app/privacy')}
            />
            <View style={[styles.divider, {backgroundColor: colors.divider}]} />
            <SettingsItem
              icon="file-document"
              title={t('settings.terms')}
              onPress={() => Linking.openURL('https://nokk.app/terms')}
            />
            <View style={[styles.divider, {backgroundColor: colors.divider}]} />
            <SettingsItem
              icon="information"
              title={t('settings.version')}
              value="1.0.0"
              showChevron={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING['2xl'],
  },
  header: {
    paddingVertical: SPACING.lg,
  },
  headerTitle: {
    fontSize: FONTS.sizes['3xl'],
    fontWeight: '700',
  },
  subscriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.xl,
  },
  subscriptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscriptionText: {
    marginLeft: SPACING.md,
  },
  subscriptionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
  },
  subscriptionSubtitle: {
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
  },
  settingsGroup: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  settingsContent: {
    flex: 1,
  },
  settingsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsTitle: {
    fontSize: FONTS.sizes.base,
    fontWeight: '500',
  },
  settingsValue: {
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  premiumBadge: {
    marginLeft: SPACING.sm,
    backgroundColor: COLORS.premium + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  divider: {
    height: 1,
    marginLeft: 60,
  },
});

export default SettingsScreen;
