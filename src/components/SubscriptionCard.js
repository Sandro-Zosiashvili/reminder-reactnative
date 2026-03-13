/**
 * SubscriptionCard — Displays a single subscription as a clean, interactive card.
 * Shows the service name, category, cost, and renewal date.
 * Highlighted border when renewal is imminent.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';
import { CATEGORIES } from '../constants/mockData';

const SubscriptionCard = ({ subscription, onPress, isUrgent = false }) => {
  const { name, category, monthlyCost, renewalDate, billingCycle, isOffline } = subscription;
  const categoryColor = CATEGORIES[category]?.color || COLORS.textTertiary;
  const iconName = CATEGORIES[category]?.icon || 'credit-card';

  /** Format the renewal date to a human-readable short string */
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  /** Calculate days until renewal from a fixed reference for consistent demo */
  const daysUntilRenewal = () => {
    const today = new Date('2026-03-13');
    const renewal = new Date(renewalDate);
    const diff = Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const days = daysUntilRenewal();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isUrgent && styles.urgentCard,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Left: Icon */}
      <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}>
        <MaterialCommunityIcons name={iconName} size={22} color={categoryColor} />
      </View>

      {/* Center: Name & details */}
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.category}>{category}</Text>
          {isOffline && (
            <View style={styles.offlineBadge}>
              <Text style={styles.offlineBadgeText}>Offline</Text>
            </View>
          )}
          {billingCycle === 'annual' && (
            <View style={styles.annualBadge}>
              <Text style={styles.annualBadgeText}>Annual</Text>
            </View>
          )}
        </View>
      </View>

      {/* Right: Cost & renewal info */}
      <View style={styles.costSection}>
        <Text style={styles.cost}>${monthlyCost.toFixed(2)}</Text>
        <Text style={[
          styles.renewalInfo,
          days <= 7 && days >= 0 && styles.urgentText,
        ]}>
          {days >= 0 ? `in ${days}d` : formatDate(renewalDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  urgentCard: {
    borderColor: COLORS.accent + '60',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.subtitle,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: SPACING.xs,
  },
  category: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.caption,
  },
  offlineBadge: {
    backgroundColor: COLORS.textTertiary + '30',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: BORDER_RADIUS.sm,
  },
  offlineBadgeText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: '600',
  },
  annualBadge: {
    backgroundColor: COLORS.success + '20',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: BORDER_RADIUS.sm,
  },
  annualBadgeText: {
    color: COLORS.success,
    fontSize: 10,
    fontWeight: '600',
  },
  costSection: {
    alignItems: 'flex-end',
  },
  cost: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.subtitle,
    fontWeight: '700',
  },
  renewalInfo: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.caption,
    marginTop: 2,
  },
  urgentText: {
    color: COLORS.accent,
  },
});

export default SubscriptionCard;
