# Windows에서 iOS 앱 개발하기 (NOKK 프로젝트)

## 🎉 이제 Mac 없이도 iOS 앱을 만들 수 있습니다!

Expo 덕분에 Windows 컴퓨터만으로도:
- ✅ iPhone에서 앱 테스트
- ✅ iOS 앱 빌드
- ✅ App Store에 제출

가능합니다!

---

## 📱 1단계: 즉시 테스트하기 (개발 모드)

### 필요한 것
- Windows 컴퓨터
- iPhone (iOS 13 이상)
- 같은 Wi-Fi 네트워크

### 실행 방법

```powershell
# 1. 프로젝트 폴더로 이동
cd Desktop\Nokk

# 2. 의존성 설치 (처음 한 번만)
npm install

# 3. Expo 개발 서버 시작
npm start
```

터미널에 QR 코드가 나타납니다!

### iPhone에서 실행

1. **App Store에서 "Expo Go" 설치**
   - 무료 앱입니다

2. **QR 코드 스캔**
   - iPhone 카메라로 터미널의 QR 코드 스캔
   - 또는 Expo Go 앱에서 "Scan QR Code" 탭

3. **앱 실행!**
   - 자동으로 NOKK 앱이 실행됩니다
   - 코드 수정하면 실시간으로 업데이트됩니다

---

## 🏗️ 2단계: 실제 앱 빌드하기 (EAS Build)

Mac 없이 클라우드에서 iOS 앱을 빌드할 수 있습니다!

### 준비물
1. **Expo 계정** (무료)
   - https://expo.dev 에서 가입

2. **Apple Developer 계정** ($99/년)
   - iOS 앱 배포를 위해 필요
   - https://developer.apple.com

### EAS CLI 설치

```powershell
npm install -g eas-cli
```

### Expo 로그인

```powershell
eas login
```

이메일과 비밀번호 입력

### 프로젝트 설정 (처음 한 번만)

```powershell
cd Desktop\Nokk
eas build:configure
```

질문이 나오면:
- Platform: **iOS**
- Bundle identifier: **com.nokk.app** (그대로 사용)

### iOS 빌드 시작!

```powershell
# 테스트용 빌드 (TestFlight)
eas build --platform ios --profile preview

# 프로덕션 빌드 (App Store)
eas build --platform ios --profile production
```

### 빌드 과정

1. **코드 업로드**: 프로젝트가 Expo 서버로 업로드됩니다
2. **클라우드 빌드**: Expo의 Mac 서버에서 자동으로 빌드
3. **다운로드 링크**: 15-30분 후 IPA 파일 다운로드 링크 제공

---

## 📲 3단계: iPhone에 설치하기

### 방법 1: TestFlight (권장)

```powershell
# 빌드 완료 후 자동으로 TestFlight에 업로드
eas submit --platform ios --latest
```

1. Apple Developer Portal에서 TestFlight 설정
2. 테스터 이메일 추가
3. 테스터가 이메일로 초대장 받음
4. TestFlight 앱으로 설치

### 방법 2: 직접 설치 (개발 중)

빌드 완료 후 제공되는 링크로 iPhone에서 직접 설치 가능

---

## 🔧 자주 묻는 질문

### Q1: Mac이 정말 필요 없나요?
**A:** 네! Expo는 클라우드에서 빌드하므로 Mac이 전혀 필요 없습니다.

### Q2: 비용이 얼마나 드나요?
**A:**
- Expo 계정: **무료**
- EAS Build: **무료** (월 30회 빌드까지)
- Apple Developer: **$99/년** (App Store 배포용)

### Q3: Expo Go와 EAS Build의 차이는?
**A:**
- **Expo Go**: 개발/테스트용, 코드 수정 시 즉시 반영
- **EAS Build**: 실제 앱 파일(.ipa), App Store 제출 가능

### Q4: 오디오 파일은 어떻게 넣나요?
**A:**
```
assets/audio/ 폴더에 MP3 파일 추가
파일명: unknown_who_en_normal.mp3
```

### Q5: 빌드가 실패하면?
**A:**
```powershell
# 로그 확인
eas build:list

# 캐시 삭제 후 재빌드
eas build --platform ios --clear-cache
```

---

## 🚀 전체 워크플로우

```
1. 개발
   ├── npm start (Expo Go로 테스트)
   ├── 코드 수정
   └── 실시간 리로드
   
2. 빌드
   ├── eas build --platform ios --profile preview
   ├── 클라우드에서 자동 빌드 (15-30분)
   └── IPA 파일 다운로드
   
3. 테스트
   ├── TestFlight에 업로드
   ├── 테스터 초대
   └── 피드백 수집
   
4. 배포
   ├── eas build --platform ios --profile production
   ├── eas submit --platform ios
   └── App Store 심사 대기
```

---

## 💡 개발 팁

### 빠른 개발 사이클

```powershell
# 터미널 1: 개발 서버
npm start

# 터미널 2: 로그 확인
npm start
```

iPhone에서 Expo Go로 앱을 열어두고 코드를 수정하세요.
저장하면 바로 업데이트됩니다!

### 디버깅

1. **콘솔 로그**: 터미널에 실시간으로 표시
2. **에러 화면**: 앱에서 빨간 화면으로 에러 표시
3. **Chrome DevTools**: Expo Go에서 "Debug Remote JS" 선택

### 성능 최적화

```powershell
# 프로덕션 모드로 테스트
npm start -- --no-dev --minify
```

---

## 🎯 다음 단계

1. **로컬 개발**
   ```powershell
   npm start
   ```

2. **기능 추가/수정**
   - 코드 수정 → 자동 리로드

3. **테스트 빌드**
   ```powershell
   eas build --platform ios --profile preview
   ```

4. **프로덕션 빌드 & 제출**
   ```powershell
   eas build --platform ios --profile production
   eas submit --platform ios
   ```

---

## 📚 유용한 자료

- **Expo 문서**: https://docs.expo.dev
- **EAS Build 가이드**: https://docs.expo.dev/build/introduction/
- **Expo 포럼**: https://forums.expo.dev
- **Apple Developer**: https://developer.apple.com

---

## 🆘 도움말

문제가 생기면:

1. **캐시 삭제**
   ```powershell
   npm start -- --clear
   ```

2. **재설치**
   ```powershell
   rm -rf node_modules
   npm install
   ```

3. **Expo 포럼에서 검색**
   - https://forums.expo.dev

---

**축하합니다! 이제 Windows에서 iOS 앱을 만들 수 있습니다! 🎊**
