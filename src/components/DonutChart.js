/**
 * DonutChart — Lightweight SVG-based donut chart for category breakdown.
 * Renders a clean circular chart with category colors and a center total.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

const CHART_SIZE = 180;
const STROKE_WIDTH = 18;
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const DonutChart = ({ data, totalLabel = 'Monthly' }) => {
  const total = data.reduce((sum, item) => sum + item.total, 0);

  /** Build the segment offsets so each arc follows the previous one */
  let cumulativeOffset = 0;
  const segments = data.map((item) => {
    const segmentLength = (item.total / total) * CIRCUMFERENCE;
    const segment = {
      ...item,
      strokeDasharray: `${segmentLength} ${CIRCUMFERENCE - segmentLength}`,
      strokeDashoffset: -cumulativeOffset,
    };
    cumulativeOffset += segmentLength;
    return segment;
  });

  return (
    <View style={styles.container}>
      <Svg width={CHART_SIZE} height={CHART_SIZE}>
        {/* Background ring */}
        <Circle
          cx={CHART_SIZE / 2}
          cy={CHART_SIZE / 2}
          r={RADIUS}
          stroke={COLORS.border}
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        {/* Category segments */}
        {segments.map((seg, index) => (
          <Circle
            key={index}
            cx={CHART_SIZE / 2}
            cy={CHART_SIZE / 2}
            r={RADIUS}
            stroke={seg.color}
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeDasharray={seg.strokeDasharray}
            strokeDashoffset={seg.strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${CHART_SIZE / 2}, ${CHART_SIZE / 2}`}
          />
        ))}
      </Svg>

      {/* Center label */}
      <View style={styles.centerLabel}>
        <Text style={styles.centerAmount}>${total.toFixed(0)}</Text>
        <Text style={styles.centerSubtitle}>{totalLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerLabel: {
    position: 'absolute',
    alignItems: 'center',
  },
  centerAmount: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.heading,
    fontWeight: '800',
  },
  centerSubtitle: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.caption,
    marginTop: 2,
  },
});

export default DonutChart;
