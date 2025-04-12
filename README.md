# Expense Tracker

A modern mobile application built with React Native and Firebase for tracking personal expenses efficiently and securely.

## Features

- User Authentication (Sign up/Sign in)
- Expense Tracking and Management
- Wallet Management
- Statistical Analysis
- Profile Management
- Dark/Light Theme Support
- Secure Data Storage with Firebase

## Tech Stack

- React Native with Expo
- Firebase Authentication
- Cloud Firestore
- React Navigation
- Expo Router
- AsyncStorage for Local Data Persistence
- React Native Reanimated for Smooth Animations

## Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo CLI + Expo account
- iOS Simulator/iPhone (for Mac users) or Android Studio/Android (for Android development)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Folks-of-Devx/expenseTracker.git
cd expenseTracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:

- For android:
```bash
npm run android
# or
yarn android
```
- For ios:
```bash
npm run ios
# or
yarn ios
```

## Environment Setup

The application uses Firebase for backend services. You'll need to set up your own Firebase project and update the configuration in `config/firebase.ts`.

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser
- `npm run test` - Run tests
- `npm run lint` - Run linting

## Project Structure

```
├── app/                # Main application screens and navigation
├── assets/            # Images, fonts, and other static files
├── components/        # Reusable UI components
├── config/            # Configuration files (Firebase, etc.)
├── constants/         # App constants and theme
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.