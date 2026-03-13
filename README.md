# SubSense — Premium Subscription Manager

A high-fidelity, dark-themed React Native (Expo) subscription management app.

## Features

- **Central Dashboard** — Total monthly & annual spend visibility with active subscription cards
- **Renewal Shock Warning** — Visual alert for clusters of payments within 7 days
- **Category Analytics** — Donut chart and progress bar breakdown by category (Streaming, AI, Gym, etc.)
- **Budget Cap Tracker** — Progress bar showing $ spent vs. monthly limit
- **Optimizer** — Monthly vs. Annual savings comparison
- **Quick Management** — Direct links to billing/payment pages for each service
- **Offline Memberships** — Manually add recurring offline costs (Gym, Rent, etc.)
- **Skeleton Loading** — Premium loading animations for a high-class feel

## Design

- **Theme:** Dark, minimalist, Apple-style premium aesthetic
- **Colors:** Primary Black (#000000), Deep Crimson Red (#E63946), Slate Gray (#1A1A1B)
- **Icons:** Material Community Icons
- **Architecture:** Modular folder structure (`/components`, `/screens`, `/constants`, `/navigation`)

## Getting Started

```bash
npm install
npx expo start
```

### Run on iOS (Simulator)

```bash
npm run ios
```

Or start the dev server and press `i` in the Expo CLI.

### Run on iOS (Xcode)

This project uses the Expo managed workflow, so there is no native `ios/` folder until you prebuild it.

```bash
npx expo prebuild -p ios
npx expo run:ios
```

Alternatively, open `ios/SubSense.xcworkspace` in Xcode and press **Run**. If Xcode complains about CocoaPods, run `cd ios && pod install` once.

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── BudgetProgressBar.js
│   ├── CategoryBar.js
│   ├── DonutChart.js
│   ├── RenewalWarning.js
│   ├── SectionHeader.js
│   ├── SkeletonLoader.js
│   └── SubscriptionCard.js
├── constants/         # Theme and mock data
│   ├── mockData.js
│   └── theme.js
├── navigation/        # Tab navigation
│   └── TabNavigator.js
└── screens/           # App screens
    ├── AnalyticsScreen.js
    ├── DashboardScreen.js
    ├── ManageScreen.js
    └── OptimizerScreen.js
```
