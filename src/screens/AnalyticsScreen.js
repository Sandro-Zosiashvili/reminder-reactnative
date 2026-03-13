/**
 * AnalyticsScreen — Category spending breakdown.
 *
 * Displays:
 * - Donut chart with total monthly spend
 * - Category progress bars sorted by spend
 * - Color-coded legend matching the chart
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';
import { getCategoryBreakdown, getTotalMonthlyCost } from '../constants/mockData';

import DonutChart from '../components/DonutChart';
import CategoryBar from '../components/CategoryBar';
import SectionHeader from '../components/SectionHeader';
import SkeletonLoader from '../components/SkeletonLoader';

const AnalyticsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const categoryData = getCategoryBreakdown();
  const totalMonthly = getTotalMonthlyCost();
  const maxCategorySpend = categoryData.length > 0 ? categoryData[0].total : 0;

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <SkeletonLoader cardCount={6} />
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
        <Text style={styles.screenTitle}>Analytics</Text>
        <Text style={styles.screenSubtitle}>Where your money goes</Text>

        {/* Donut Chart */}
        <View style={styles.chartContainer}>
          <DonutChart data={categoryData} totalLabel="Monthly" />
        </View>

        {/* Category Breakdown Bars */}
        <View style={styles.section}>
          <SectionHeader title="By Category" />
          <View style={styles.breakdownCard}>
            {categoryData.map((item) => (
              <CategoryBar
                key={item.category}
                category={item.category}
                total={item.total}
                maxTotal={maxCategorySpend}
                color={item.color}
              />
            ))}
          </View>
        </View>

        {/* Summary Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{categoryData.length}</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${(totalMonthly / categoryData.length).toFixed(0)}</Text>
            <Text style={styles.statLabel}>Avg / Category</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${maxCategorySpend.toFixed(0)}</Text>
            <Text style={styles.statLabel}>Top Category</Text>
          </View>
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
  chartContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  breakdownCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.title,
    fontWeight: '800',
  },
  statLabel: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.caption,
    marginTop: SPACING.xs,
  },
  bottomSpacer: {
    height: SPACING.xxl,
  },
});

export default AnalyticsScreen;
