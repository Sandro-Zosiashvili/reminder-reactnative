/**
 * TabNavigator — Bottom tab navigation for SubSense.
 * Four tabs: Dashboard, Analytics, Optimizer, Manage
 * Dark-themed with subtle icon styling matching the premium aesthetic.
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONT_SIZE } from '../constants/theme';

import DashboardScreen from '../screens/DashboardScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import OptimizerScreen from '../screens/OptimizerScreen';
import ManageScreen from '../screens/ManageScreen';

const Tab = createBottomTabNavigator();

/** Tab icon configuration — maps tab names to icon names */
const TAB_ICONS = {
  Dashboard: { focused: 'view-dashboard', unfocused: 'view-dashboard-outline' },
  Analytics: { focused: 'chart-donut', unfocused: 'chart-donut' },
  Optimizer: { focused: 'swap-horizontal-bold', unfocused: 'swap-horizontal' },
  Manage: { focused: 'cog', unfocused: 'cog-outline' },
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        const iconConfig = TAB_ICONS[route.name];
        const iconName = focused ? iconConfig.focused : iconConfig.unfocused;
        return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
      },
      tabBarActiveTintColor: COLORS.textPrimary,
      tabBarInactiveTintColor: COLORS.textTertiary,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabLabel,
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Analytics" component={AnalyticsScreen} />
    <Tab.Screen name="Optimizer" component={OptimizerScreen} />
    <Tab.Screen name="Manage" component={ManageScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.card,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    height: 70,
  },
  tabLabel: {
    fontSize: FONT_SIZE.caption - 1,
    fontWeight: '600',
    marginTop: 2,
  },
});

export default TabNavigator;
