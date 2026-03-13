/**
 * SectionHeader — Reusable section title with optional action.
 * Keeps the visual hierarchy consistent throughout the app.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

const SectionHeader = ({ title, actionText, onAction }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {actionText && (
      <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
        <Text style={styles.action}>{actionText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.title,
    fontWeight: '700',
  },
  action: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.body,
  },
});

export default SectionHeader;
