# TODO: AdMob 추가하기

## 현재 상태
AdMob이 **임시로 비활성화**되어 있습니다.
- Expo Go로 개발하기 위해 제거
- 플레이스홀더 "Ad Space" 표시 중

## 나중에 추가하는 방법

### 1단계: Development Build 생성

```powershell
# EAS CLI 로그인
eas login

# Development Build 설정
eas build:configure

# iOS Development Build
eas build --profile development --platform ios

# Android Development Build  
eas build --profile development --platform android
```

빌드 완료되면 (15-30분) iPhone에 설치할 수 있는 링크가 제공됩니다.

### 2단계: app.json에 AdMob 플러그인 다시 추가

```json
"plugins": [
  // ... 기존 플러그인들 ...
  [
    "react-native-google-mobile-ads",
    {
      "androidAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY",
      "iosAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"
    }
  ]
]
```

### 3단계: AdBanner.tsx 복원

`src/components/AdBanner.tsx`에서:
- 임시 플레이스홀더 코드 제거
- 실제 AdMob BannerAd 코드로 교체

### 4단계: Development Client로 실행

```powershell
expo start --dev-client
```

이제 AdMob이 작동합니다!

---

## AdMob App ID 받는 방법

1. https://admob.google.com 로그인
2. "앱" → "앱 추가"
3. iOS/Android 앱 등록
4. App ID 복사 (ca-app-pub-XXXXXXXX~YYYYYY)
5. `app.json`에 붙여넣기

## 광고 단위 ID 받기

1. AdMob에서 앱 선택
2. "광고 단위" → "광고 단위 추가"
3. "배너" 선택
4. 광고 단위 ID 복사
5. `src/components/AdBanner.tsx`의 `AD_UNIT_ID`에 붙여넣기

---

**나중에 이 파일을 참고하세요!**
