# 🍎 Apple App Store 제출 완벽 가이드

## 📋 제출 전 체크리스트

### ✅ 필수 준비물
- [ ] iOS 빌드 (IPA 파일)
- [ ] Apple Developer 계정 ($99/year)
- [ ] 앱 아이콘 1024 x 1024 px
- [ ] 스크린샷 (다양한 기기 크기)
- [ ] 앱 설명 (영어 + 한국어)
- [ ] 개인정보처리방침 URL
- [ ] 지원 URL
- [ ] 마케팅 URL (선택)

---

## 🔐 1단계: Apple Developer 계정

### 1.1 계정 등록
1. https://developer.apple.com/programs/ 접속
2. "Enroll" 클릭
3. Apple ID로 로그인
4. 개인 또는 조직 선택
5. **연간 $99 결제** (자동 갱신)
6. 약관 동의

### 1.2 승인 대기
- 개인: 보통 24시간 이내
- 조직: 영업일 기준 최대 5일
- 이메일로 승인 알림

---

## 📱 2단계: iOS 빌드 생성

### 2.1 EAS Build로 iOS 빌드
```bash
cd Desktop/Nokk
npx eas-cli build --platform ios --profile production
```

### 2.2 빌드 옵션
EAS가 자동으로:
- Provisioning Profile 생성
- Distribution Certificate 관리
- IPA 파일 생성

### 2.3 빌드 완료 후
- IPA 파일 다운로드 링크 제공
- TestFlight 자동 업로드 가능

---

## 🎨 3단계: App Store Connect 설정

### 3.1 새 앱 생성
1. https://appstoreconnect.apple.com/ 접속
2. "나의 앱" → "+" → "새로운 앱"
3. 앱 정보 입력:

**플랫폼**
- ✅ iOS

**이름**
```
NOKK
```

**기본 언어**
```
한국어 (Korean)
```

**번들 ID**
```
com.nokk.app
```
(app.json의 ios.bundleIdentifier와 일치)

**SKU**
```
NOKK-001
```
(고유 식별자, 임의로 설정)

**사용자 액세스**
```
전체 액세스
```

---

### 3.2 앱 정보

#### 이름
```
NOKK
```

#### 부제 (최대 30자)
```
안전한 귀가를 위한 동반자
```

#### 카테고리
- **기본 카테고리**: 라이프스타일
- **보조 카테고리**: 유틸리티

---

### 3.3 가격 및 사용 가능 여부

**가격**
```
무료
```

**사용 가능 국가**
- ✅ 대한민국
- ✅ 미국
- ✅ 일본
- ✅ 중국
- 또는 "모든 국가" 선택

---

## 📸 4단계: 스크린샷 준비

### 필수 크기 (우선순위별)

#### 1. 6.7" Display (iPhone 15 Pro Max, 14 Pro Max, 13 Pro Max, 12 Pro Max)
- **크기**: 1290 x 2796 px
- **필수**: ✅ 최소 3개, 최대 10개

#### 2. 6.5" Display (iPhone 11 Pro Max, XS Max)
- **크기**: 1242 x 2688 px
- **필수**: ✅ 최소 3개, 최대 10개

#### 3. 5.5" Display (iPhone 8 Plus)
- **크기**: 1242 x 2208 px
- **권장**: 하위 호환용

### iPad (선택 사항)
#### 12.9" iPad Pro (3rd gen)
- **크기**: 2048 x 2732 px

#### 11" iPad Pro (2nd gen)
- **크기**: 1668 x 2388 px

---

### 스크린샷 가이드라인
- 형식: PNG 또는 JPEG
- 색 공간: sRGB 또는 P3
- 최소 3개, 최대 10개
- 텍스트 오버레이 가능 (앱 기능 설명)
- 실제 기기 또는 시뮬레이터 사용

---

## 🖼️ 5단계: 앱 아이콘

### 요구사항
- **크기**: 1024 x 1024 px
- **형식**: PNG (투명도 없음)
- **색 공간**: sRGB 또는 P3
- **해상도**: 72 DPI 이상

### 주의사항
- ❌ 알파 채널 또는 투명도 사용 금지
- ❌ 둥근 모서리 불필요 (iOS가 자동 처리)
- ✅ 단순하고 인식 가능한 디자인

---

## 📝 6단계: 앱 설명 작성

### 한국어 버전

#### 앱 설명
```
집에 혼자 있는 여성이나 아이들을 위한 홈 안전 음성 앱입니다.

주요 기능:
• 다양한 톤의 안전 사운드 (밝은, 차분한, 강한)
• 4개 언어 지원 (한국어, English, 日本語, 中文)
• 다크 모드 지원
• 오프라인 사용 가능
• 개인정보 수집 없음

NOKK와 함께 안전한 귀가를 경험하세요. 🛡️

특징:
✓ 회원가입 불필요
✓ 광고 없음
✓ 인앱 구매 없음
✓ 완전 무료

집에 혼자 있을 때 당신의 안전을 지킵니다.
```

#### 키워드 (최대 100자, 쉼표로 구분)
```
안전,홈안전,여성안전,혼자집,배달,방문자,보안,안심,음성,남자목소리
```

#### 지원 URL
```
https://[GitHub-Pages-URL]/
```

#### 마케팅 URL (선택)
```
https://nokk.app
```

#### 개인정보처리방침 URL (필수)
```
https://[GitHub-Pages-URL]/privacy.html
```

---

### 영어 버전

#### App Description
```
A safety companion app for those who feel anxious walking alone.

Key Features:
• Safety sounds with various tones (Bright, Calm, Strong)
• 4 language support (Korean, English, Japanese, Chinese)
• Dark mode support
• Offline usage
• No personal data collection

Experience safe walks with NOKK. 🛡️

Features:
✓ No sign-up required
✓ Ad-free
✓ No in-app purchases
✓ Completely free

Your companion for safe night walks.
```

#### Keywords
```
safety,walk,night,security,alone,personal safety,women safety,companion,protection
```

---

## 🔒 7단계: 앱 개인정보 보호

### 데이터 수집
Apple의 "App Privacy" 섹션:

**질문: 이 앱은 사용자 데이터를 수집하나요?**
```
아니요
```

**설명**:
```
NOKK는 어떠한 개인정보도 수집하지 않습니다. 
모든 설정은 기기에 로컬로 저장되며, 외부 서버와 통신하지 않습니다.
```

---

## 📦 8단계: 빌드 업로드

### 8.1 EAS Submit 사용 (권장)
```bash
npx eas-cli submit --platform ios
```

EAS가 자동으로:
- IPA를 App Store Connect에 업로드
- TestFlight에서 사용 가능하게 설정

### 8.2 수동 업로드
Xcode의 Transporter 앱 사용

---

## 🚀 9단계: 심사 제출

### 9.1 버전 정보
**버전**
```
1.0.0
```

**저작권**
```
© 2026 NOKK
```

### 9.2 앱 심사 정보

**연락처 정보**
- 이름: [본인 이름]
- 전화번호: [연락처]
- 이메일: support@nokk.app

**데모 계정** (필요시)
- ❌ 필요 없음 (로그인 불필요)

**참고사항**
```
이 앱은 회원가입이나 로그인이 필요하지 않으며, 
모든 기능이 즉시 사용 가능합니다.

테스트 방법:
1. 앱 실행
2. 언어 선택 (한국어, English, 日本語, 中文)
3. 톤 선택 (밝은, 차분한, 강한)
4. 메인 화면에서 카테고리 탐색
5. 사운드 재생 테스트
```

### 9.3 버전 출시 옵션
- **자동 출시**: 승인 즉시 App Store에 출시
- **수동 출시**: 승인 후 개발자가 원하는 시점에 출시

권장: **자동 출시**

### 9.4 제출!
"심사 제출" 버튼 클릭

---

## ⏰ 10단계: 심사 대기

### 심사 기간
- **평균**: 1-2일
- **첫 출시**: 3-5일 가능
- **휴일**: 더 오래 걸릴 수 있음

### 심사 상태
- **대기 중**: 심사 대기열에 있음
- **심사 중**: Apple 심사팀이 검토 중
- **승인됨**: 출시 준비 완료
- **거부됨**: 문제 해결 후 재제출

---

## ❌ 일반적인 거부 사유

### 1. 개인정보처리방침 링크 오류
- **문제**: URL 404 또는 접근 불가
- **해결**: GitHub Pages 활성화

### 2. 메타데이터 불일치
- **문제**: 설명과 실제 앱 기능 다름
- **해결**: 설명 수정 또는 기능 추가

### 3. 최소 기능 요구사항
- **문제**: 앱이 너무 단순함
- **해결**: NOKK는 충분한 기능 제공 (4개 언어, 3개 톤)

### 4. 스크린샷 문제
- **문제**: 실제 앱과 다름
- **해결**: 실제 앱 화면 재촬영

### 5. 저작권 침해
- **문제**: 오디오 또는 이미지 저작권
- **해결**: 모든 에셋이 자체 제작임을 증명

---

## ✅ 승인 후

### 1. App Store URL
```
https://apps.apple.com/app/id[APP-ID]
```

### 2. 프로모션
- App Store 배지 다운로드
- 소셜 미디어 공유
- 웹사이트에 링크 추가

### 3. 업데이트
버전 업데이트 시:
```bash
# app.json 버전 수정
"version": "1.0.1"

# iOS 빌드
npx eas-cli build --platform ios --profile production

# 제출
npx eas-cli submit --platform ios
```

---

## 📊 TestFlight 배포 (선택)

### TestFlight란?
- Apple의 베타 테스트 플랫폼
- App Store 출시 전 테스트 가능
- 최대 10,000명의 외부 테스터

### TestFlight 사용
```bash
# 빌드 후 자동으로 TestFlight에 업로드됨
npx eas-cli build --platform ios --profile production
```

### 베타 테스터 초대
1. App Store Connect > TestFlight
2. "외부 테스터" 추가
3. 이메일로 초대 발송

---

## 🌍 다국어 지원

### 지원 언어 추가
App Store Connect에서:
1. "앱 정보" → "언어 추가"
2. 영어, 일본어, 중국어 추가
3. 각 언어별 설명, 키워드, 스크린샷 추가

### NOKK 지원 언어
- 한국어 (기본)
- English
- 日本語
- 中文 (简体)

---

## 💰 수익화 (미래)

### 인앱 구매 설정
현재는 무료지만, 향후 프리미엄 기능 추가 시:

1. App Store Connect > 기능 > 인앱 구매
2. 새 제품 추가
3. 제품 ID: `com.nokk.app.premium`
4. 가격 설정

### 구독 모델
- 월간: ₩2,900
- 연간: ₩29,000 (17% 할인)

---

## 📞 도움 받기

### Apple 지원
- App Store Connect 도움말
- https://developer.apple.com/support/

### 커뮤니티
- Apple Developer Forums
- Stack Overflow

---

## 🎉 최종 체크리스트

제출 전 확인:
- [ ] Apple Developer 계정 활성화
- [ ] iOS 빌드 완료 (IPA)
- [ ] 앱 아이콘 1024x1024 업로드
- [ ] 스크린샷 3개 이상 (6.7", 6.5")
- [ ] 앱 설명 작성 (한국어 + 영어)
- [ ] 개인정보처리방침 URL 작동 확인
- [ ] 지원 URL 설정
- [ ] 키워드 설정
- [ ] 앱 개인정보 보호 섹션 완료
- [ ] 심사 정보 작성
- [ ] 심사 제출!

---

## 🔄 Android vs iOS 비교

| 항목 | Google Play | Apple App Store |
|------|-------------|-----------------|
| **계정 비용** | $25 (일회성) | $99/year |
| **승인 시간** | 1-3일 | 1-2일 |
| **심사 엄격도** | 보통 | 엄격 |
| **최소 스크린샷** | 2개 | 3개 |
| **업데이트 속도** | 빠름 (몇 시간) | 느림 (1-2일) |
| **베타 테스트** | Google Play Console | TestFlight |

---

생성일: 2026-01-19
버전: 1.0
