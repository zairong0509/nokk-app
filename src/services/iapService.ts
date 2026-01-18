/**
 * NOKK In-App Purchase Service - TEMPORARILY DISABLED
 * TODO: Re-enable with Development Build (see TODO_ADMOB.md)
 * Works WITHOUT requiring login (uses Apple ID / Google Play account)
 */

import {Platform} from 'react-native';

// Placeholder for InAppPurchases - will be enabled in Development Build
const InAppPurchases = {
  IAPResponseCode: {
    OK: 0,
    USER_CANCELED: 1,
  },
};

// Product IDs (must match App Store Connect and Google Play Console)
export const PRODUCT_IDS = {
  MONTHLY: 'nokk_premium_monthly',
  YEARLY: 'nokk_premium_yearly',
  LIFETIME: 'nokk_premium_lifetime',
};

const productIds = [PRODUCT_IDS.MONTHLY, PRODUCT_IDS.YEARLY, PRODUCT_IDS.LIFETIME];

let purchaseListener: any = null;

/**
 * Initialize IAP connection
 * TODO: Re-enable with Development Build
 */
export const initializeIAP = async (): Promise<boolean> => {
  console.log('IAP disabled in Expo Go - will work in Development Build');
  return true;
};

/**
 * Get available products
 * TODO: Re-enable with Development Build
 */
export const getAvailableProducts = async () => {
  console.log('IAP disabled in Expo Go');
  return [];
};

/**
 * Purchase premium subscription
 * TODO: Re-enable with Development Build
 */
export const purchasePremium = async (
  planType: 'monthly' | 'yearly' | 'lifetime',
): Promise<boolean> => {
  console.log('IAP disabled in Expo Go - planType:', planType);
  // For testing, return true to simulate successful purchase
  return false;
};

/**
 * Restore previous purchases
 * TODO: Re-enable with Development Build
 */
export const restorePurchases = async (): Promise<boolean> => {
  console.log('IAP disabled in Expo Go');
  return false;
};

/**
 * Check subscription status
 * TODO: Re-enable with Development Build
 */
export const checkSubscriptionStatus = async (): Promise<{
  isActive: boolean;
  expiryDate?: Date;
  productId?: string;
}> => {
  console.log('IAP disabled in Expo Go');
  return {isActive: false};
};

/**
 * Clean up IAP listeners
 * TODO: Re-enable with Development Build
 */
export const cleanupIAP = async () => {
  purchaseListener = null;
  console.log('IAP cleanup - disabled in Expo Go');
};

export default {
  initializeIAP,
  getAvailableProducts,
  purchasePremium,
  restorePurchases,
  checkSubscriptionStatus,
  cleanupIAP,
};
