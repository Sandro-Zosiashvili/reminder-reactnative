/**
 * RenewalWarning — "Renewal Shock" alert section.
 * Highlights a cluster of upcoming payments within 7 days.
 * The red accent is used deliberately here to signal urgency.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';

const RenewalWarning = ({ renewals }) => {
  if (!renewals || renewals.length === 0) return null;

  const totalUpcoming = renewals.reduce((sum, sub) => sum + sub.monthlyCost, 0);

  /** Format date as "Mar 16" */
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <View style={styles.container}>
      {/* Header with warning icon */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="alert-circle" size={20} color={COLORS.accent} />
        <Text style={styles.title}>Renewal Shock</Text>
        <Text style={styles.totalBadge}>${totalUpcoming.toFixed(2)}</Text>
      </View>

      <Text style={styles.subtitle}>
        {renewals.length} payment{renewals.length > 1 ? 's' : ''} due within 7 days
      </Text>

      {/* List of upcoming renewals */}
      <View style={styles.list}>
        {renewals.map((sub) => (
          <View key={sub.id} style={styles.item}>
            <View style={styles.itemDot} />
            <Text style={styles.itemName}>{sub.name}</Text>
            <Text style={styles.itemDate}>{formatDate(sub.renewalDate)}</Text>
            <Text style={styles.itemCost}>${sub.monthlyCost.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.accent + '10',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.accent + '30',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  title: {
    flex: 1,
    color: COLORS.accent,
    fontSize: FONT_SIZE.subtitle,
    fontWeight: '700',
  },
  totalBadge: {
    color: COLORS.accent,
    fontSize: FONT_SIZE.subtitle,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.caption,
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  list: {
    gap: SPACING.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDot: {
    width: 6,
    height: 6,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.accent,
    marginRight: SPACING.sm,
  },
  itemName: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.body,
  },
  itemDate: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.caption,
    marginRight: SPACING.md,
  },
  itemCost: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.body,
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'right',
  },
});

export default RenewalWarning;
