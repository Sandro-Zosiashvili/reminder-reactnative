/**
 * CategoryBar — Horizontal progress bar for category spend breakdown.
 * Used in the Analytics screen to visualize spend per category.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';

const CategoryBar = ({ category, total, maxTotal, color }) => {
  const percentage = maxTotal > 0 ? (total / maxTotal) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.amount}>${total.toFixed(2)}/mo</Text>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: BORDER_RADIUS.round,
    marginRight: SPACING.sm,
  },
  category: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.body,
    fontWeight: '500',
  },
  amount: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.body,
    fontWeight: '600',
  },
  track: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginLeft: 18,
  },
  fill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.round,
  },
});

export default CategoryBar;
