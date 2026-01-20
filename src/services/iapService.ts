/**
 * NOKK In-App Purchase Service
 * One-time purchase (Lifetime) only - No subscriptions
 * Works WITHOUT requiring login (uses Apple ID / Google Play account)
 */

import {Platform} from 'react-native';

// Product ID (must match App Store Connect and Google Play Console)
export const PRODUCT_ID = {
  LIFETIME: 'nokk_premium_lifetime',
};

/**
 * Initialize IAP connection
 * TODO: Implement with expo-in-app-purchases for production build
 */
export const initializeIAP = async (): Promise<boolean> => {
  try {
    console.log('IAP: Initializing...');
    // Will be implemented with expo-in-app-purchases in production build
    return true;
  } catch (error) {
    console.error('IAP: Failed to initialize', error);
    return false;
  }
};

/**
 * Get product info (price, etc.)
 * TODO: Implement with expo-in-app-purchases for production build
 */
export const getProductInfo = async (): Promise<{
  price: string;
  priceAmount: number;
  currency: string;
} | null> => {
  try {
    console.log('IAP: Getting product info...');
    // Will be implemented with expo-in-app-purchases in production build
    // Return placeholder for now (actual price from store)
    return {
      price: '$2.99',
      priceAmount: 2.99,
      currency: 'USD',
    };
  } catch (error) {
    console.error('IAP: Failed to get product info', error);
    return null;
  }
};

/**
 * Purchase premium (one-time, lifetime)
 * TODO: Implement with expo-in-app-purchases for production build
 */
export const purchasePremium = async (): Promise<boolean> => {
  try {
    console.log('IAP: Purchasing premium...');
    // Will be implemented with expo-in-app-purchases in production build
    // For testing in Expo Go, return true to simulate successful purchase
    return true;
  } catch (error) {
    console.error('IAP: Purchase failed', error);
    return false;
  }
};

/**
 * Restore previous purchase
 * Important for users who reinstall the app or switch devices
 */
export const restorePurchase = async (): Promise<boolean> => {
  try {
    console.log('IAP: Restoring purchase...');
    // Will be implemented with expo-in-app-purchases in production build
    return false;
  } catch (error) {
    console.error('IAP: Restore failed', error);
    return false;
  }
};

/**
 * Check if user has purchased premium
 * TODO: Implement with expo-in-app-purchases for production build
 */
export const checkPurchaseStatus = async (): Promise<boolean> => {
  try {
    console.log('IAP: Checking purchase status...');
    // Will be implemented with expo-in-app-purchases in production build
    return false;
  } catch (error) {
    console.error('IAP: Failed to check purchase status', error);
    return false;
  }
};

/**
 * Clean up IAP listeners
 */
export const cleanupIAP = async (): Promise<void> => {
  console.log('IAP: Cleanup');
};

export default {
  PRODUCT_ID,
  initializeIAP,
  getProductInfo,
  purchasePremium,
  restorePurchase,
  checkPurchaseStatus,
  cleanupIAP,
};
