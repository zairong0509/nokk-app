/**
 * NOKK - Personal Safety Voice App
 * Main Application Entry Point
 */

import React, {useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/navigation/RootNavigator';
import {useAppStore} from './src/store/appStore';
import {initializeAudio} from './src/services/audioService';
import {initializeI18n} from './src/i18n';
import {COLORS} from './src/constants/theme';

const App: React.FC = () => {
  const {initializeApp, isDarkMode} = useAppStore();

  useEffect(() => {
    const init = async () => {
      await initializeI18n();
      await initializeAudio();
      await initializeApp();
    };
    init();
  }, []);

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
