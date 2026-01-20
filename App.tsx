/**
 * NOKK - Personal Safety Voice App
 * Main Application Entry Point
 */

import React, {useEffect} from 'react';
import {StatusBar, Platform, View, ActivityIndicator} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/navigation/RootNavigator';
import {useAppStore} from './src/store/appStore';
import {initializeAudio} from './src/services/audioService';
import {initializeI18n} from './src/i18n';
import {COLORS} from './src/constants/theme';
import OnboardingScreen from './src/screens/OnboardingScreen';

const App: React.FC = () => {
  const {initializeApp, isDarkMode, hasSeenOnboarding, completeOnboarding, isInitialized} = useAppStore();

  useEffect(() => {
    const init = async () => {
      await initializeI18n();
      await initializeAudio();
      await initializeApp();
    };
    init();
  }, []);

  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  // Show loading screen while initializing
  if (!isInitialized) {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </GestureHandlerRootView>
    );
  }

  // Show onboarding for first-time users
  if (!hasSeenOnboarding) {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={colors.background}
            translucent={Platform.OS === 'android'}
          />
          <OnboardingScreen onComplete={completeOnboarding} />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? COLORS.dark.background : COLORS.light.background}
          translucent={Platform.OS === 'android'}
        />
        <NavigationContainer
          theme={{
            dark: isDarkMode,
            colors: {
              primary: COLORS.primary,
              background: isDarkMode ? COLORS.dark.background : COLORS.light.background,
              card: isDarkMode ? COLORS.dark.card : COLORS.light.card,
              text: isDarkMode ? COLORS.dark.text : COLORS.light.text,
              border: isDarkMode ? COLORS.dark.border : COLORS.light.border,
              notification: COLORS.primary,
            },
          }}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
