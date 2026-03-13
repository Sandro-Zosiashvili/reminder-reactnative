/**
 * BudgetProgressBar — Visual indicator for budget consumption.
 * Shows a smooth progress bar with $ spent vs. monthly limit.
 * Turns red when the user is over-budget.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';

const BudgetProgressBar = ({ spent, limit }) => {
  const percentage = Math.min((spent / limit) * 100, 100);
  const isOverBudget = spent > limit;
  const barColor = isOverBudget ? COLORS.accent : COLORS.success;
  const overAmount = spent - limit;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Budget Cap</Text>
        <Text style={[styles.amount, isOverBudget && styles.overBudgetText]}>
          ${spent.toFixed(2)} / ${limit.toFixed(2)}
        </Text>
      </View>

      {/* Progress bar track */}
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percentage}%`, backgroundColor: barColor },
          ]}
        />
      </View>

      {/* Status message */}
      <Text style={[styles.status, isOverBudget && styles.overBudgetText]}>
        {isOverBudget
          ? `⚠ Over budget by $${overAmount.toFixed(2)}`
          : `$${(limit - spent).toFixed(2)} remaining`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.body,
    fontWeight: '500',
  },
  amount: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.body,
    fontWeight: '700',
  },
  track: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.round,
  },
  status: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.caption,
    marginTop: SPACING.xs,
  },
  overBudgetText: {
    color: COLORS.accent,
  },
});

export default BudgetProgressBar;
