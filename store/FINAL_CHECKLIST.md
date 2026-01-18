# ✅ 앱 스토어 출시 최종 체크리스트

## 📱 빌드 상태

### Android
- [x] **EAS 빌드 완료**
  - Build ID: `b9ebe546-bc95-428b-8d84-c8020cc6669f`
  - Version: 1.0.0
  - AAB 다운로드: https://expo.dev/artifacts/eas/oXzYxnxujKxE41eueVgrdt.aab
  - 상태: ✅ 성공

### iOS
- [ ] **EAS 빌드 필요**
  ```bash
  npx eas-cli build --platform ios --profile production
  ```
  - Apple Developer 계정 필요 ($99/year)
  - 예상 시간: 15-20분

---

## 📄 문서 준비 상태

### 완료된 문서 ✅
- [x] 개인정보 처리방침 (docs/privacy.html)
- [x] 서비스 이용약관 (docs/terms.html)
- [x] 홈페이지 (docs/index.html)
- [x] Google Play 제출 가이드 (store/GOOGLE_PLAY_GUIDE.md)
- [x] Apple App Store 제출 가이드 (store/APPLE_APPSTORE_GUIDE.md)
- [x] 스크린샷 가이드 (store/SCREENSHOT_GUIDE.md)
- [x] GitHub Pages 설정 가이드 (store/GITHUB_PAGES_SETUP.md)
- [x] 제출 체크리스트 (store/SUBMISSION_CHECKLIST.md)

### 스토어 리스팅 ✅
- [x] 앱 설명 (store/google-play/description.txt)
- [x] 메타데이터 (store/google-play/metadata.json)

---

## 🌐 웹 호스팅

### GitHub Pages
- [ ] GitHub 저장소 생성
- [ ] 코드 푸시
- [ ] GitHub Pages 활성화 (Settings > Pages)
- [ ] 배포 확인
- [ ] URL 테스트:
  - [ ] https://[USERNAME].github.io/nokk-app/
  - [ ] https://[USERNAME].github.io/nokk-app/privacy.html
  - [ ] https://[USERNAME].github.io/nokk-app/terms.html
- [ ] HTTPS 강제 적용

**다음 명령어 실행:**
```bash
cd Desktop/Nokk
git remote add origin https://github.com/[YOUR-USERNAME]/nokk-app.git
git add .
git commit -m "Prepare for app store submission"
git push -u origin main
```

---

## 📸 스크린샷 & 그래픽

### Android (Google Play)
- [ ] 최소 2개, 최대 8개 스크린샷 (1080 x 1920 px)
  - [ ] 01-home-screen.png
  - [ ] 02-tone-select.png
  - [ ] 03-language-select.png
  - [ ] 04-settings.png
  - [ ] (선택) 05-search.png
- [ ] Feature Graphic (1024 x 500 px)
- [ ] 앱 아이콘 (512 x 512 px)

### iOS (Apple App Store)
- [ ] 6.7" Display: 1290 x 2796 px (최소 3개)
- [ ] 6.5" Display: 1242 x 2688 px (최소 3개)
- [ ] 앱 아이콘 (1024 x 1024 px)

**스크린샷 생성:**
```bash
cd Desktop/Nokk
npx expo start
# 'a' 키로 Android 에뮬레이터 실행
# 각 화면 캡처 후 store/screenshots/android/ 저장
```

---

## 🔑 계정 상태

### Google Play
- [ ] Google Play Developer 계정 생성
- [ ] $25 등록비 결제
- [ ] 계정 승인 대기 (24-48시간)
- [ ] Console 접근 확인: https://play.google.com/console

### Apple
- [ ] Apple Developer 계정 생성
- [ ] $99/year 결제
- [ ] 계정 승인 대기 (24시간-5일)
- [ ] App Store Connect 접근: https://appstoreconnect.apple.com/

---

## 📝 Google Play 제출 단계

### 1. 스토어 설정
- [ ] 앱 생성
- [ ] 앱 이름: **NOKK**
- [ ] 카테고리: **라이프스타일**
- [ ] 이메일: support@nokk.app
- [ ] 개인정보처리방침 URL 입력

### 2. 콘텐츠 등급
- [ ] 설문지 작성
- [ ] 등급 확인: **모든 연령** 또는 **12+**

### 3. 타겟 오디언스
- [ ] 18세 이상 설정
- [ ] 어린이 대상 아니요

### 4. 데이터 보안
- [ ] 데이터 수집 없음 선택
- [ ] 개인정보처리방침 URL 확인

### 5. 스토어 리스팅
- [ ] 앱 설명 입력
- [ ] 스크린샷 업로드
- [ ] Feature Graphic 업로드
- [ ] 앱 아이콘 업로드

### 6. 프로덕션 릴리스
- [ ] AAB 파일 업로드
- [ ] 릴리스 노트 작성
- [ ] 국가 선택 (한국, 미국, 일본, 중국)
- [ ] 검토 및 제출

### 7. 심사 대기
- [ ] 제출 완료
- [ ] 1-3일 대기
- [ ] 승인 알림 수신

---

## 🍎 Apple App Store 제출 단계

### 1. App Store Connect 설정
- [ ] 새 앱 생성
- [ ] 앱 이름: **NOKK**
- [ ] 번들 ID: com.nokk.app
- [ ] SKU: NOKK-001
- [ ] 카테고리: **라이프스타일**

### 2. 앱 정보
- [ ] 부제: "안전한 귀가를 위한 동반자"
- [ ] 키워드 입력
- [ ] 지원 URL
- [ ] 개인정보처리방침 URL

### 3. 가격 및 사용 가능 여부
- [ ] 무료 설정
- [ ] 국가 선택

### 4. 앱 개인정보 보호
- [ ] 데이터 수집 없음 선택

### 5. 빌드 업로드
- [ ] iOS 빌드 생성
- [ ] EAS Submit 또는 Transporter로 업로드
- [ ] TestFlight 확인

### 6. 스크린샷 & 아이콘
- [ ] 6.7" 스크린샷 업로드
- [ ] 6.5" 스크린샷 업로드
- [ ] 앱 아이콘 1024x1024 업로드

### 7. 심사 제출
- [ ] 심사 정보 작성
- [ ] 연락처 정보 입력
- [ ] 심사 제출

### 8. 심사 대기
- [ ] 제출 완료
- [ ] 1-2일 대기
- [ ] 승인 알림 수신

---

## 🚀 출시 후 할 일

### 즉시
- [ ] App Store URL 확인
- [ ] 설치 테스트
- [ ] 스크린샷이 올바르게 표시되는지 확인

### 1주일 내
- [ ] 사용자 리뷰 모니터링
- [ ] 충돌 보고서 확인
- [ ] 분석 데이터 검토

### 지속적
- [ ] 사용자 피드백 수집
- [ ] 버그 수정
- [ ] 새 기능 계획

---

## 📊 현재 진행 상태

### 완료됨 ✅ (6/8)
1. ✅ Android 빌드 완료
2. ✅ 문서 작성 (개인정보처리방침, 약관)
3. ✅ 스토어 리스팅 텍스트 작성
4. ✅ 제출 가이드 작성
5. ✅ 폴더 구조 준비
6. ✅ EAS 설정 최적화

### 진행 중 🔄 (2/8)
7. 🔄 스크린샷 생성
8. 🔄 Feature Graphic 디자인

### 대기 중 ⏳
- ⏳ GitHub Pages 배포
- ⏳ Google Play Developer 계정 승인
- ⏳ Apple Developer 계정 승인
- ⏳ iOS 빌드 생성

---

## 💡 다음 단계 (우선순위)

### 즉시 가능 ✨
1. **GitHub Pages 배포** (10분)
   - 저장소 생성
   - 코드 푸시
   - Pages 활성화

2. **스크린샷 생성** (30분)
   - 앱 실행
   - 각 화면 캡처
   - 리사이즈

3. **Feature Graphic 디자인** (1시간)
   - Figma/Canva 사용
   - 1024 x 500 px
   - 로고 + 텍스트

### 계정 생성 후
4. **Google Play Developer 등록** ($25, 1-2일)
5. **Apple Developer 등록** ($99/year, 1-5일)

### 계정 승인 후
6. **Google Play 제출** (1시간)
7. **iOS 빌드 & Apple 제출** (2시간)

### 심사 완료 후
8. **출시! 🎉**

---

## 📞 연락처 정보

앱 관련 모든 문의:
- **이메일**: support@nokk.app
- **웹사이트**: https://[USERNAME].github.io/nokk-app/
- **개인정보**: https://[USERNAME].github.io/nokk-app/privacy.html
- **약관**: https://[USERNAME].github.io/nokk-app/terms.html

---

## 🎯 예상 타임라인

| 단계 | 예상 시간 |
|------|----------|
| GitHub Pages 배포 | 10분 |
| 스크린샷 생성 | 30분 |
| Feature Graphic | 1시간 |
| Google Play 계정 | 1-2일 |
| Apple Developer 계정 | 1-5일 |
| Google Play 제출 | 1시간 |
| iOS 빌드 & 제출 | 2시간 |
| Google Play 심사 | 1-3일 |
| Apple 심사 | 1-2일 |
| **총 예상 시간** | **7-14일** |

---

최종 업데이트: 2026-01-19
빌드 버전: 1.0.0
