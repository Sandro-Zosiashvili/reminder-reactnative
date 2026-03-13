/**
 * ManageScreen — Quick Management & Offline Memberships.
 *
 * Displays:
 * - Direct links to billing/payment pages for each online service
 * - Offline memberships section with manual entries
 * - Ability to add new offline costs
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';
import { SUBSCRIPTIONS, CATEGORIES } from '../constants/mockData';

import SectionHeader from '../components/SectionHeader';
import SkeletonLoader from '../components/SkeletonLoader';

const ManageScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [offlineName, setOfflineName] = useState('');
  const [offlineCost, setOfflineCost] = useState('');
  const [offlineEntries, setOfflineEntries] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const onlineSubscriptions = SUBSCRIPTIONS.filter((s) => !s.isOffline && s.billingUrl);
  const offlineSubscriptions = SUBSCRIPTIONS.filter((s) => s.isOffline);

  /** Open billing URL in the device browser */
  const handleOpenBilling = (url, name) => {
    if (url) {
      Linking.openURL(url).catch(() => {
        Alert.alert('Error', `Could not open billing page for ${name}`);
      });
    }
  };

  /** Add a new offline membership entry */
  const handleAddOffline = () => {
    if (!offlineName.trim() || !offlineCost.trim()) return;

    const cost = parseFloat(offlineCost);
    if (isNaN(cost) || cost <= 0) {
      Alert.alert('Invalid Cost', 'Please enter a valid amount.');
      return;
    }

    setOfflineEntries([
      ...offlineEntries,
      {
        id: `custom-${Date.now()}`,
        name: offlineName.trim(),
        monthlyCost: cost,
      },
    ]);
    setOfflineName('');
    setOfflineCost('');
    setShowAddForm(false);
  };

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
        <Text style={styles.screenTitle}>Manage</Text>
        <Text style={styles.screenSubtitle}>Quick access to billing & offline costs</Text>

        {/* Online Subscriptions — Billing Links */}
        <View style={styles.section}>
          <SectionHeader
            title="Billing Links"
            actionText={`${onlineSubscriptions.length} services`}
          />

          {onlineSubscriptions.map((sub) => {
            const categoryColor = CATEGORIES[sub.category]?.color || COLORS.textTertiary;
            const iconName = CATEGORIES[sub.category]?.icon || 'credit-card';

            return (
              <TouchableOpacity
                key={sub.id}
                style={styles.billingCard}
                onPress={() => handleOpenBilling(sub.billingUrl, sub.name)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}>
                  <MaterialCommunityIcons name={iconName} size={20} color={categoryColor} />
                </View>
                <View style={styles.billingInfo}>
                  <Text style={styles.billingName}>{sub.name}</Text>
                  <Text style={styles.billingUrl} numberOfLines={1}>
                    {sub.billingUrl?.replace('https://', '').replace('www.', '')}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="open-in-new"
                  size={18}
                  color={COLORS.textTertiary}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Offline Memberships */}
        <View style={styles.section}>
          <SectionHeader
            title="Offline Memberships"
            actionText="+ Add"
            onAction={() => setShowAddForm(!showAddForm)}
          />

          {/* Add Form */}
          {showAddForm && (
            <View style={styles.addForm}>
              <TextInput
                style={styles.input}
                placeholder="Service name (e.g., Gym)"
                placeholderTextColor={COLORS.textTertiary}
                value={offlineName}
                onChangeText={setOfflineName}
              />
              <TextInput
                style={styles.input}
                placeholder="Monthly cost ($)"
                placeholderTextColor={COLORS.textTertiary}
                value={offlineCost}
                onChangeText={setOfflineCost}
                keyboardType="numeric"
              />
              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowAddForm(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={handleAddOffline}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Existing offline subscriptions */}
          {offlineSubscriptions.map((sub) => (
            <View key={sub.id} style={styles.offlineCard}>
              <View style={styles.offlineIcon}>
                <MaterialCommunityIcons name="wallet" size={20} color={COLORS.textSecondary} />
              </View>
              <View style={styles.billingInfo}>
                <Text style={styles.billingName}>{sub.name}</Text>
                <Text style={styles.billingUrl}>Manual entry</Text>
              </View>
              <Text style={styles.offlineCost}>${sub.monthlyCost.toFixed(2)}/mo</Text>
            </View>
          ))}

          {/* User-added offline entries */}
          {offlineEntries.map((entry) => (
            <View key={entry.id} style={styles.offlineCard}>
              <View style={styles.offlineIcon}>
                <MaterialCommunityIcons name="plus-circle" size={20} color={COLORS.success} />
              </View>
              <View style={styles.billingInfo}>
                <Text style={styles.billingName}>{entry.name}</Text>
                <Text style={styles.billingUrl}>Added manually</Text>
              </View>
              <Text style={styles.offlineCost}>${entry.monthlyCost.toFixed(2)}/mo</Text>
            </View>
          ))}

          {offlineSubscriptions.length === 0 && offlineEntries.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="wallet-outline" size={40} color={COLORS.textTertiary} />
              <Text style={styles.emptyText}>No offline memberships yet</Text>
              <Text style={styles.emptySubtext}>
                Add gym, rent, or other recurring costs
              </Text>
            </View>
          )}
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
  section: {
    marginBottom: SPACING.lg,
  },
  billingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  billingInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  billingName: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.body,
    fontWeight: '600',
  },
  billingUrl: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.caption,
    marginTop: 2,
  },
  offlineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  offlineIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offlineCost: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.body,
    fontWeight: '700',
  },
  addForm: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.body,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  formButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  cancelButton: {
    flex: 1,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    backgroundColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.body,
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    backgroundColor: COLORS.accent,
  },
  addButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.body,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.body,
    marginTop: SPACING.sm,
  },
  emptySubtext: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.caption,
    marginTop: SPACING.xs,
  },
  bottomSpacer: {
    height: SPACING.xxl,
  },
});

export default ManageScreen;
