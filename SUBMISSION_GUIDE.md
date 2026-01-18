# NOKK App Store Submission Guide

## Pre-Submission Checklist

### 1. Developer Accounts
- [ ] Apple Developer Account ($99/year) - https://developer.apple.com
- [ ] Google Play Developer Account ($25 one-time) - https://play.google.com/console

### 2. Required Assets

#### App Icons
- iOS: 1024x1024 PNG (no alpha)
- Android: 512x512 PNG

#### Screenshots (Required sizes)
**iOS:**
- iPhone 6.7" (1290 x 2796)
- iPhone 6.5" (1284 x 2778)
- iPhone 5.5" (1242 x 2208)
- iPad 12.9" (2048 x 2732) - if supporting iPad

**Android:**
- Phone: 1080 x 1920 (minimum)
- 7" Tablet: 1200 x 1920
- 10" Tablet: 1800 x 2560

#### Feature Graphic (Android only)
- 1024 x 500 PNG or JPG

### 3. Audio Files
Record all voice phrases in 4 languages (en, ko, ja, es) × 3 tones (normal, firm, angry):
- Format: MP3 or AAC
- Sample rate: 44.1kHz
- Place in: `src/assets/audio/`
- Naming: `{phrase_id}_{language}_{tone}.mp3`

Example: `unknown_who_en_normal.mp3`

---

## App Store (iOS) Submission

### Step 1: App Store Connect Setup
1. Go to https://appstoreconnect.apple.com
2. Click "My Apps" → "+" → "New App"
3. Fill in:
   - Platform: iOS
   - Name: NOKK - Safety Voice
   - Primary Language: English
   - Bundle ID: com.nokk.app
   - SKU: NOKK001

### Step 2: App Information
1. **Category**: Lifestyle (Primary), Utilities (Secondary)
2. **Content Rights**: Confirm all content is original
3. **Age Rating**: Complete questionnaire (select "None" for all)

### Step 3: Pricing & Availability
1. Set Price: Free
2. Availability: All territories
3. Pre-Orders: Disabled

### Step 4: In-App Purchases
Create products in App Store Connect:

| Reference Name | Product ID | Type | Price |
|---------------|------------|------|-------|
| Premium Monthly | nokk_premium_monthly | Auto-Renewable | $2.99 |
| Premium Yearly | nokk_premium_yearly | Auto-Renewable | $19.99 |
| Premium Lifetime | nokk_premium_lifetime | Non-Consumable | $49.99 |

### Step 5: App Privacy
1. Data Collection: **None**
2. Tracking: **No**
3. Third-party data: AdMob (anonymized)

### Step 6: Build & Upload
```bash
# Install dependencies
cd ios && pod install && cd ..

# Build release
npx react-native build-ios --mode Release

# Or use Xcode
# 1. Open Nokk.xcworkspace
# 2. Select "Any iOS Device"
# 3. Product → Archive
# 4. Distribute App → App Store Connect
```

### Step 7: Submit for Review
1. Upload screenshots
2. Add description from `store/app-store/description.txt`
3. Fill in keywords, support URL, marketing URL
4. Submit for review

---

## Google Play Submission

### Step 1: Create App
1. Go to https://play.google.com/console
2. Click "Create app"
3. Fill in:
   - App name: NOKK - Safety Voice
   - Default language: English
   - App or game: App
   - Free or paid: Free

### Step 2: Store Listing
1. **Short description** (80 chars): 
   "Instant voice protection for home safety. One tap plays a strong male voice."
2. **Full description**: Use `store/google-play/description.txt`
3. Upload graphics:
   - App icon (512x512)
   - Feature graphic (1024x500)
   - Screenshots (min 2, max 8)

### Step 3: App Content
1. **Privacy policy**: https://nokk.app/privacy
2. **Ads**: Yes, contains ads (AdMob banner)
3. **Content rating**: Complete IARC questionnaire
4. **Target audience**: 18+ (safety app)
5. **News app**: No
6. **COVID-19**: No

### Step 4: In-App Products
1. Go to Monetize → Products → Subscriptions
2. Create subscription base plan
3. Add products matching App Store

### Step 5: Build & Upload
```bash
# Generate release keystore (first time only)
keytool -genkey -v -keystore nokk-release.keystore -alias nokk -keyalg RSA -keysize 2048 -validity 10000

# Build release APK
cd android
./gradlew assembleRelease

# Or build AAB (recommended)
./gradlew bundleRelease

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### Step 6: Release
1. Go to Release → Production
2. Create new release
3. Upload AAB file
4. Add release notes
5. Review and roll out

---

## Post-Launch Checklist

- [ ] Monitor crash reports (Firebase Crashlytics)
- [ ] Respond to user reviews
- [ ] Track analytics
- [ ] Plan update roadmap
- [ ] A/B test screenshots
- [ ] Localize for more languages

---

## Support

- Website: https://nokk.app
- Email: support@nokk.app
- Privacy: https://nokk.app/privacy
- Terms: https://nokk.app/terms
