# NOKK - Expo 설치 가이드

## Windows에서 iOS 앱 테스트하기

Expo를 사용하면 Windows 컴퓨터에서도 iPhone에 직접 앱을 설치해서 테스트할 수 있습니다!

---

## 1단계: 필수 프로그램 설치

### Node.js 설치
```powershell
# Node.js 18 이상 필요
node --version
```

아직 없다면: https://nodejs.org 에서 다운로드

---

## 2단계: 프로젝트 설정

```powershell
# 프로젝트 폴더로 이동
cd Desktop\Nokk

# 의존성 설치
npm install

# Expo CLI 글로벌 설치 (처음 한 번만)
npm install -g expo-cli eas-cli
```

---

## 3단계: 개발 서버 시작

```powershell
npm start
# 또는
expo start
```

터미널에 QR 코드가 나타납니다! 📱

---

## 4단계: iPhone에서 테스트

### iPhone에 Expo Go 설치
1. App Store에서 **"Expo Go"** 다운로드
2. 앱 열기

### 앱 실행
1. iPhone 카메라로 터미널의 **QR 코드 스캔**
2. Expo Go에서 자동으로 앱 실행!
3. 코드 수정하면 자동으로 리로드됩니다

---

## 5단계: Android에서 테스트 (선택)

### Android 폰에 Expo Go 설치
1. Play Store에서 **"Expo Go"** 다운로드
2. 앱 열기
3. QR 코드 스캔

---

## 실제 빌드 만들기 (EAS Build)

### 계정 생성
```powershell
# Expo 계정 만들기 (무료)
eas login
```

### iOS 빌드
```powershell
# 처음 한 번만 설정
eas build:configure

# iOS 빌드 (클라우드에서 자동 빌드)
eas build --platform ios --profile preview

# 완료되면 iPhone에 직접 설치할 수 있는 링크가 나옵니다!
```

### Android 빌드
```powershell
# Android APK 빌드
eas build --platform android --profile preview
```

**장점**: Mac 없이도 iOS 앱을 빌드할 수 있습니다! ✨

---

## 주요 명령어

```powershell
# 개발 서버 시작
npm start

# iOS 시뮬레이터 (Mac에서만)
npm run ios

# Android 에뮬레이터
npm run android

# 프로덕션 빌드
npm run build:ios
npm run build:android
```

---

## 문제 해결

### 1. "Metro bundler" 오류
```powershell
# 캐시 삭제
npm start -- --clear
```

### 2. 포트 충돌
```powershell
# 다른 포트 사용
npm start -- --port 8082
```

### 3. iPhone에서 연결 안됨
- iPhone과 PC가 **같은 Wi-Fi**에 연결되어 있는지 확인
- 방화벽에서 Node.js 허용

### 4. "Cannot find module" 오류
```powershell
# node_modules 재설치
rm -rf node_modules
npm install
```

---

## 개발 팁

### 1. 빠른 리로드
- 코드 저장하면 자동으로 앱 리로드
- `Ctrl + M` (Android) 또는 흔들기 (iOS)로 개발자 메뉴

### 2. 로그 확인
```powershell
# 터미널에서 로그 실시간 확인
npm start
```

### 3. 디버깅
- Chrome DevTools 사용 가능
- Expo Go에서 `Shake` → `Debug Remote JS`

---

## 스토어 배포

### App Store (iOS)
```powershell
# 프로덕션 빌드
eas build --platform ios --profile production

# 자동 업로드 (Apple Developer 계정 필요)
eas submit --platform ios
```

### Google Play (Android)
```powershell
# 프로덕션 빌드
eas build --platform android --profile production

# 자동 업로드
eas submit --platform android
```

---

## 추가 설정

### 1. AdMob 설정
`app.json`에서 AdMob App ID 수정:
```json
{
  "expo": {
    "android": {
      "config": {
        "googleMobileAdsAppId": "ca-app-pub-XXXXXXXX~YYYYYY"
      }
    },
    "ios": {
      "config": {
        "googleMobileAdsAppId": "ca-app-pub-XXXXXXXX~YYYYYY"
      }
    }
  }
}
```

### 2. In-App Purchase 설정
- App Store Connect에서 제품 ID 생성
- Google Play Console에서 제품 ID 생성
- `src/services/iapService.ts`의 PRODUCT_IDS 수정

### 3. 오디오 파일 추가
- `assets/audio/` 폴더에 MP3 파일 추가
- 파일명: `{phrase_id}_{language}_{tone}.mp3`

---

## 유용한 링크

- Expo 문서: https://docs.expo.dev
- EAS Build: https://docs.expo.dev/build/introduction/
- Expo Go 다운로드: https://expo.dev/client
- 커뮤니티: https://forums.expo.dev

---

## 도움이 필요하신가요?

문제가 생기면:
1. `npm start -- --clear` 로 캐시 삭제
2. `rm -rf node_modules && npm install` 로 재설치
3. Expo 문서 확인
4. Expo 포럼에서 검색

즐거운 개발 되세요! 🚀
