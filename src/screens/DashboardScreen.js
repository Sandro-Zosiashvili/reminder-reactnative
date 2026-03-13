/**
 * DashboardScreen — Central hub of SubSense.
 *
 * Displays:
 * - Total monthly & annual spend (the "Ouch" factor)
 * - Budget cap progress bar
 * - Renewal Shock warning for upcoming clusters
 * - Full list of active subscriptions
 *
 * Features a skeleton loading state for premium feel.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';
import {
  SUBSCRIPTIONS,
  MONTHLY_BUDGET,
  getTotalMonthlyCost,
  getTotalAnnualCost,
  getUpcomingRenewals,
} from '../constants/mockData';

import SubscriptionCard from '../components/SubscriptionCard';
import BudgetProgressBar from '../components/BudgetProgressBar';
import RenewalWarning from '../components/RenewalWarning';
import SectionHeader from '../components/SectionHeader';
import SkeletonLoader from '../components/SkeletonLoader';

const DashboardScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  /** Simulate data loading to showcase skeleton screens */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const totalMonthly = getTotalMonthlyCost();
  const totalAnnual = getTotalAnnualCost();
  const upcomingRenewals = getUpcomingRenewals(7);
  const subscriptionCount = SUBSCRIPTIONS.length;

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <StatusBar style="light" />
        <SkeletonLoader cardCount={5} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section — The "Ouch" Factor */}
        <View style={styles.heroSection}>
          <Text style={styles.heroLabel}>Total Annual Spend</Text>
          <Text style={styles.heroAmount}>${totalAnnual.toFixed(2)}</Text>
          <Text style={styles.heroSubtext}>
            ${totalMonthly.toFixed(2)}/mo across {subscriptionCount} subscriptions
          </Text>
        </View>

        {/* Budget Cap Tracker */}
        <View style={styles.section}>
          <BudgetProgressBar spent={totalMonthly} limit={MONTHLY_BUDGET} />
        </View>

        {/* Renewal Shock Warning */}
        {upcomingRenewals.length > 0 && (
          <View style={styles.section}>
            <RenewalWarning renewals={upcomingRenewals} />
          </View>
        )}

        {/* Active Subscriptions List */}
        <View style={styles.section}>
          <SectionHeader
            title="Active Subscriptions"
            actionText={`${subscriptionCount} total`}
          />
          {SUBSCRIPTIONS.map((sub) => {
            const isUrgent = upcomingRenewals.some((r) => r.id === sub.id);
            return (
              <SubscriptionCard
                key={sub.id}
                subscription={sub}
                isUrgent={isUrgent}
              />
            );
          })}
        </View>

        {/* Bottom spacer for tab bar */}
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
  heroSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  heroLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.body,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroAmount: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.hero,
    fontWeight: '800',
    marginTop: SPACING.xs,
    letterSpacing: -1,
  },
  heroSubtext: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.caption,
    marginTop: SPACING.xs,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  bottomSpacer: {
    height: SPACING.xxl,
  },
});

export default DashboardScreen;
