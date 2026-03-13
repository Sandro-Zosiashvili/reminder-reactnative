/**
 * SkeletonLoader — Premium loading placeholder
 * Displays animated shimmer blocks to indicate content is loading.
 * Gives the app a "high-class" feel during data transitions.
 */

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING } from '../constants/theme';

const SkeletonBlock = ({ width, height, style }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [shimmerAnim]);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.skeletonBase, COLORS.skeletonHighlight],
  });

  return (
    <Animated.View
      style={[
        styles.block,
        { width, height, backgroundColor },
        style,
      ]}
    />
  );
};

const SkeletonCard = () => (
  <View style={styles.card}>
    <View style={styles.cardRow}>
      <SkeletonBlock width={44} height={44} style={styles.circle} />
      <View style={styles.cardText}>
        <SkeletonBlock width="60%" height={14} />
        <SkeletonBlock width="40%" height={12} style={styles.lineSpacing} />
      </View>
      <SkeletonBlock width={60} height={20} />
    </View>
  </View>
);

const SkeletonLoader = ({ cardCount = 4 }) => (
  <View style={styles.container}>
    {/* Hero section skeleton */}
    <View style={styles.heroSection}>
      <SkeletonBlock width={140} height={14} />
      <SkeletonBlock width={200} height={36} style={styles.lineSpacing} />
      <SkeletonBlock width={160} height={12} style={styles.lineSpacing} />
    </View>

    {/* Card skeletons */}
    {Array.from({ length: cardCount }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  heroSection: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  block: {
    borderRadius: BORDER_RADIUS.sm,
  },
  circle: {
    borderRadius: BORDER_RADIUS.round,
  },
  lineSpacing: {
    marginTop: SPACING.sm,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
    marginLeft: SPACING.md,
  },
});

export default SkeletonLoader;
