/**
 * NOKK Authentication Service - Expo Version
 * Optional Google Sign-In (NOT required for app functionality)
 */

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {useAppStore} from '../store/appStore';

// Complete the auth session
WebBrowser.maybeCompleteAuthSession();

// Configure Google Sign-In
export const configureGoogleSignIn = () => {
  // Configuration handled by expo-auth-session
  console.log('Google Sign-In configured');
};

/**
 * Sign in with Google (Optional)
 * Note: This needs to be implemented with useAuthRequest hook in component
 */
export const signInWithGoogle = async (): Promise<{
  success: boolean;
  user?: {
    id: string;
    email: string;
    displayName: string;
    photoUrl?: string;
  };
  error?: string;
}> => {
  // This is a placeholder - actual implementation should use Google.useAuthRequest hook in component
  console.log('Google Sign-In called - implement with useAuthRequest hook');
  return {success: false, error: 'Not implemented - use hook in component'};
};

/**
 * Sign out
 */
export const signOut = async (): Promise<boolean> => {
  try {
    // Update store
    useAppStore.getState().logout();
    return true;
  } catch (error) {
    console.error('Sign out error:', error);
    return false;
  }
};

/**
 * Check if user is signed in
 */
export const isSignedIn = async (): Promise<boolean> => {
  const user = useAppStore.getState().user;
  return user.isLoggedIn;
};

/**
 * Get current user (if signed in)
 */
export const getCurrentUser = async () => {
  const user = useAppStore.getState().user;
  return user.isLoggedIn ? user : null;
};

/**
 * Silent sign in (restore previous session)
 */
export const silentSignIn = async (): Promise<boolean> => {
  // Session is persisted in Zustand store
  const user = useAppStore.getState().user;
  return user.isLoggedIn;
};

export default {
  configureGoogleSignIn,
  signInWithGoogle,
  signOut,
  isSignedIn,
  getCurrentUser,
  silentSignIn,
};
