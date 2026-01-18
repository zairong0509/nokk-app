/**
 * NOKK Root Navigation - Single Screen Structure (No Bottom Tabs)
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import {RootStackParamList} from '../types';
import {COLORS} from '../constants/theme';
import {useIsDarkMode} from '../store/appStore';

// Screens
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PremiumScreen from '../screens/PremiumScreen';
import LanguageSelectScreen from '../screens/LanguageSelectScreen';
import ToneSelectScreen from '../screens/ToneSelectScreen';
import CustomizeQuickActionsScreen from '../screens/CustomizeQuickActionsScreen';

const Stack = createStackNavigator<RootStackParamList>();

// Root Navigator - No Bottom Tabs
export const RootNavigator: React.FC = () => {
  const isDarkMode = useIsDarkMode();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        cardStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen
        name="Main"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Premium"
        component={PremiumScreen}
        options={{
          title: '',
          headerTransparent: true,
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name="LanguageSelect"
        component={LanguageSelectScreen}
        options={{
          title: 'Language',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="ToneSelect"
        component={ToneSelectScreen}
        options={{
          title: 'Voice Tone',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="CustomizeQuickActions"
        component={CustomizeQuickActionsScreen}
        options={{
          title: 'Customize Quick Actions',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};
