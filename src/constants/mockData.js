/**
 * SubSense Mock Data
 * Realistic subscription data to populate the UI for a convincing demo experience.
 */

/** Subscription categories with associated colors for the analytics view */
export const CATEGORIES = {
  Streaming: { color: '#E63946', icon: 'monitor-play' },
  AI: { color: '#8338EC', icon: 'cpu' },
  Music: { color: '#06D6A0', icon: 'music' },
  Productivity: { color: '#118AB2', icon: 'briefcase' },
  Fitness: { color: '#FF9800', icon: 'dumbbell' },
  Storage: { color: '#3A86FF', icon: 'hard-drive' },
  News: { color: '#FFD166', icon: 'newspaper' },
  Offline: { color: '#A0A0A0', icon: 'wallet' },
};

/**
 * Mock subscriptions — each entry represents a real-world service.
 * `renewalDate` is intentionally clustered for some entries to trigger
 * the "Renewal Shock" warning when multiple renewals fall within 7 days.
 */
export const SUBSCRIPTIONS = [
  {
    id: '1',
    name: 'Netflix',
    category: 'Streaming',
    monthlyCost: 15.99,
    annualCost: 155.88,
    billingCycle: 'monthly',
    renewalDate: '2026-03-16',
    billingUrl: 'https://www.netflix.com/account',
    icon: 'monitor-play',
    isOffline: false,
  },
  {
    id: '2',
    name: 'Spotify',
    category: 'Music',
    monthlyCost: 10.99,
    annualCost: 109.99,
    billingCycle: 'monthly',
    renewalDate: '2026-03-17',
    billingUrl: 'https://www.spotify.com/account',
    icon: 'music',
    isOffline: false,
  },
  {
    id: '3',
    name: 'ChatGPT Plus',
    category: 'AI',
    monthlyCost: 20.0,
    annualCost: 200.0,
    billingCycle: 'monthly',
    renewalDate: '2026-03-18',
    billingUrl: 'https://chat.openai.com/settings',
    icon: 'cpu',
    isOffline: false,
  },
  {
    id: '4',
    name: 'YouTube Premium',
    category: 'Streaming',
    monthlyCost: 13.99,
    annualCost: 139.99,
    billingCycle: 'monthly',
    renewalDate: '2026-03-22',
    billingUrl: 'https://www.youtube.com/paid_memberships',
    icon: 'play-circle',
    isOffline: false,
  },
  {
    id: '5',
    name: 'iCloud+',
    category: 'Storage',
    monthlyCost: 2.99,
    annualCost: 35.88,
    billingCycle: 'monthly',
    renewalDate: '2026-03-25',
    billingUrl: 'https://support.apple.com/icloud',
    icon: 'cloud',
    isOffline: false,
  },
  {
    id: '6',
    name: 'Notion',
    category: 'Productivity',
    monthlyCost: 10.0,
    annualCost: 96.0,
    billingCycle: 'monthly',
    renewalDate: '2026-04-01',
    billingUrl: 'https://www.notion.so/my-account',
    icon: 'file-text',
    isOffline: false,
  },
  {
    id: '7',
    name: 'Gym Membership',
    category: 'Fitness',
    monthlyCost: 49.99,
    annualCost: 499.99,
    billingCycle: 'monthly',
    renewalDate: '2026-04-01',
    billingUrl: null,
    icon: 'dumbbell',
    isOffline: true,
  },
  {
    id: '8',
    name: 'NYT Digital',
    category: 'News',
    monthlyCost: 4.25,
    annualCost: 51.0,
    billingCycle: 'monthly',
    renewalDate: '2026-03-28',
    billingUrl: 'https://myaccount.nytimes.com',
    icon: 'newspaper',
    isOffline: false,
  },
  {
    id: '9',
    name: 'Claude Pro',
    category: 'AI',
    monthlyCost: 20.0,
    annualCost: 200.0,
    billingCycle: 'monthly',
    renewalDate: '2026-03-15',
    billingUrl: 'https://console.anthropic.com',
    icon: 'sparkles',
    isOffline: false,
  },
  {
    id: '10',
    name: 'Figma',
    category: 'Productivity',
    monthlyCost: 15.0,
    annualCost: 144.0,
    billingCycle: 'annual',
    renewalDate: '2026-09-10',
    billingUrl: 'https://www.figma.com/settings',
    icon: 'pen-tool',
    isOffline: false,
  },
  {
    id: '11',
    name: 'Parking Spot',
    category: 'Offline',
    monthlyCost: 75.0,
    annualCost: 900.0,
    billingCycle: 'monthly',
    renewalDate: '2026-04-01',
    billingUrl: null,
    icon: 'car',
    isOffline: true,
  },
  {
    id: '12',
    name: 'Disney+',
    category: 'Streaming',
    monthlyCost: 7.99,
    annualCost: 79.99,
    billingCycle: 'annual',
    renewalDate: '2026-06-15',
    billingUrl: 'https://www.disneyplus.com/account',
    icon: 'star',
    isOffline: false,
  },
];

/** User's monthly budget cap for subscriptions */
export const MONTHLY_BUDGET = 200;

/**
 * Compute derived data from subscriptions.
 * These helpers keep the screens free from business logic.
 */
export const getTotalMonthlyCost = () =>
  SUBSCRIPTIONS.reduce((sum, sub) => sum + sub.monthlyCost, 0);

export const getTotalAnnualCost = () =>
  SUBSCRIPTIONS.reduce((sum, sub) => sum + sub.monthlyCost * 12, 0);

/**
 * Get subscriptions renewing within the next N days from a reference date.
 * Used to power the "Renewal Shock" warning on the dashboard.
 */
export const getUpcomingRenewals = (withinDays = 7, referenceDate = new Date('2026-03-13')) => {
  const endDate = new Date(referenceDate);
  endDate.setDate(endDate.getDate() + withinDays);

  return SUBSCRIPTIONS.filter((sub) => {
    const renewal = new Date(sub.renewalDate);
    return renewal >= referenceDate && renewal <= endDate;
  }).sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate));
};

/** Group subscriptions by category and sum monthly costs */
export const getCategoryBreakdown = () => {
  const breakdown = {};
  SUBSCRIPTIONS.forEach((sub) => {
    if (!breakdown[sub.category]) {
      breakdown[sub.category] = 0;
    }
    breakdown[sub.category] += sub.monthlyCost;
  });
  return Object.entries(breakdown)
    .map(([category, total]) => ({
      category,
      total: parseFloat(total.toFixed(2)),
      color: CATEGORIES[category]?.color || '#A0A0A0',
    }))
    .sort((a, b) => b.total - a.total);
};

/** Calculate potential savings by switching all monthly plans to annual */
export const getOptimizationSavings = () =>
  SUBSCRIPTIONS.filter((sub) => sub.billingCycle === 'monthly' && !sub.isOffline).map((sub) => ({
    ...sub,
    monthlySavings: parseFloat((sub.monthlyCost - sub.annualCost / 12).toFixed(2)),
    annualSavings: parseFloat((sub.monthlyCost * 12 - sub.annualCost).toFixed(2)),
  }));
