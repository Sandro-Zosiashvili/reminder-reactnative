/**
 * SubSense — Premium Subscription Management App
 *
 * A high-fidelity, dark-themed subscription tracker with:
 * - Central dashboard with total spend visibility
 * - Renewal shock warnings for payment clusters
 * - Category analytics with donut chart
 * - Budget cap tracking
 * - Monthly vs Annual optimization
 * - Quick billing management & offline memberships
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { COLORS } from './src/constants/theme';

/** Dark navigation theme matching our design system */
const navigationTheme = {
  dark: true,
  colors: {
    primary: COLORS.accent,
    background: COLORS.background,
    card: COLORS.card,
    text: COLORS.textPrimary,
    border: COLORS.border,
    notification: COLORS.accent,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '800' },
  },
};

const App = () => (
  <NavigationContainer theme={navigationTheme}>
    <TabNavigator />
  </NavigationContainer>
);

export default App;
