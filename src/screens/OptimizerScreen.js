/**
 * OptimizerScreen — Monthly vs Annual savings comparison.
 *
 * Shows users how much they could save by switching from monthly
 * to annual billing on eligible subscriptions.
 * Clean comparison cards with potential savings highlighted.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';
import { getOptimizationSavings } from '../constants/mockData';

import SectionHeader from '../components/SectionHeader';
import SkeletonLoader from '../components/SkeletonLoader';

const OptimizerScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const optimizations = getOptimizationSavings();
  const totalAnnualSavings = optimizations.reduce((sum, o) => sum + o.annualSavings, 0);
  const totalMonthlySavings = optimizations.reduce((sum, o) => sum + o.monthlySavings, 0);

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <SkeletonLoader cardCount={5} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Title */}
        <Text style={styles.screenTitle}>Optimizer</Text>
        <Text style={styles.screenSubtitle}>Switch to annual & save</Text>

        {/* Total Savings Hero */}
        <View style={styles.savingsHero}>
          <MaterialCommunityIcons name="piggy-bank" size={32} color={COLORS.success} />
          <Text style={styles.savingsAmount}>${totalAnnualSavings.toFixed(2)}</Text>
          <Text style={styles.savingsLabel}>potential annual savings</Text>
          <Text style={styles.savingsSubtext}>
            That's ${totalMonthlySavings.toFixed(2)} less per month
          </Text>
        </View>

        {/* Comparison Cards */}
        <View style={styles.section}>
          <SectionHeader
            title="Eligible Subscriptions"
            actionText={`${optimizations.length} services`}
          />

          {optimizations.map((item) => (
            <View key={item.id} style={styles.comparisonCard}>
              <Text style={styles.serviceName}>{item.name}</Text>

              <View style={styles.comparisonRow}>
                {/* Monthly cost */}
                <View style={styles.planBox}>
                  <Text style={styles.planLabel}>Monthly</Text>
                  <Text style={styles.planCost}>${item.monthlyCost.toFixed(2)}/mo</Text>
                  <Text style={styles.planAnnual}>
                    ${(item.monthlyCost * 12).toFixed(2)}/yr
                  </Text>
                </View>

                {/* Arrow */}
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={20}
                  color={COLORS.textTertiary}
                />

                {/* Annual cost */}
                <View style={[styles.planBox, styles.annualBox]}>
                  <Text style={styles.planLabel}>Annual</Text>
                  <Text style={[styles.planCost, styles.annualCost]}>
                    ${(item.annualCost / 12).toFixed(2)}/mo
                  </Text>
                  <Text style={styles.planAnnual}>
                    ${item.annualCost.toFixed(2)}/yr
                  </Text>
                </View>
              </View>

              {/* Savings badge */}
              <View style={styles.savingsBadge}>
                <MaterialCommunityIcons name="tag" size={14} color={COLORS.success} />
                <Text style={styles.savingsBadgeText}>
                  Save ${item.annualSavings.toFixed(2)}/yr (${item.monthlySavings.toFixed(2)}/mo)
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl + SPACING.lg,
  },
  screenTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.heading,
    fontWeight: '800',
  },
  screenSubtitle: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.body,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xl,
  },
  savingsHero: {
    backgroundColor: COLORS.success + '10',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.success + '30',
  },
  savingsAmount: {
    color: COLORS.success,
    fontSize: FONT_SIZE.hero,
    fontWeight: '800',
    marginTop: SPACING.sm,
  },
  savingsLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.body,
    marginTop: SPACING.xs,
  },
  savingsSubtext: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.caption,
    marginTop: SPACING.xs,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  comparisonCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  serviceName: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.subtitle,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  comparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  planBox: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  annualBox: {
    backgroundColor: COLORS.success + '10',
  },
  planLabel: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.caption,
    marginBottom: 2,
  },
  planCost: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.subtitle,
    fontWeight: '700',
  },
  annualCost: {
    color: COLORS.success,
  },
  planAnnual: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.caption,
    marginTop: 2,
  },
  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  savingsBadgeText: {
    color: COLORS.success,
    fontSize: FONT_SIZE.caption,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: SPACING.xxl,
  },
});

export default OptimizerScreen;
