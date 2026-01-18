# 📦 스토어 제출 자료

이 폴더에는 Google Play Store와 Apple App Store 제출에 필요한 모든 자료가 포함되어 있습니다.

## 📁 폴더 구조

```
store/
├── google-play/           # Google Play 전용
│   ├── description.txt    # 앱 설명
│   └── metadata.json      # 메타데이터 (URL, 연락처)
├── screenshots/           # 스크린샷
│   ├── android/          # Android 스크린샷 (1080x1920)
│   └── ios/              # iOS 스크린샷 (다양한 크기)
├── graphics/             # Feature Graphic 및 기타 그래픽
├── SUBMISSION_CHECKLIST.md      # 제출 전 체크리스트
├── FINAL_CHECKLIST.md           # 최종 종합 체크리스트
├── GOOGLE_PLAY_GUIDE.md         # Google Play 제출 가이드
├── APPLE_APPSTORE_GUIDE.md      # Apple App Store 제출 가이드
├── SCREENSHOT_GUIDE.md          # 스크린샷 생성 가이드
└── GITHUB_PAGES_SETUP.md        # GitHub Pages 설정 가이드
```

## 🚀 빠른 시작

### 1. 빌드 확인
- **Android**: ✅ 완료 (Build ID: b9ebe546-bc95-428b-8d84-c8020cc6669f)
- **iOS**: 대기 중 (Apple Developer 계정 필요)

### 2. GitHub Pages 배포
```bash
# 저장소 원격 추가
git remote add origin https://github.com/[YOUR-USERNAME]/nokk-app.git

# 푸시
git push -u origin main

# GitHub > Settings > Pages 에서 활성화
# Source: main branch, /docs folder
```

### 3. 스크린샷 생성
```bash
# 앱 실행
npx expo start

# 'a' 키로 Android 에뮬레이터
# 각 화면 캡처 후 screenshots/android/ 저장
```

### 4. 계정 생성
- Google Play: https://play.google.com/console ($25)
- Apple Developer: https://developer.apple.com/programs/ ($99/year)

### 5. 제출
- Google Play: GOOGLE_PLAY_GUIDE.md 참고
- Apple App Store: APPLE_APPSTORE_GUIDE.md 참고

## 📝 필수 준비물

### Google Play
- [x] AAB 파일
- [ ] 2-8개 스크린샷 (1080 x 1920)
- [ ] Feature Graphic (1024 x 500)
- [ ] 앱 아이콘 (512 x 512)
- [ ] 개인정보처리방침 URL

### Apple App Store
- [ ] IPA 파일
- [ ] 3-10개 스크린샷 (6.7": 1290 x 2796, 6.5": 1242 x 2688)
- [ ] 앱 아이콘 (1024 x 1024)
- [ ] 개인정보처리방침 URL

## 🌐 URL 정보

배포 후 다음 URL을 스토어에 입력:
```
홈페이지: https://[USERNAME].github.io/nokk-app/
개인정보처리방침: https://[USERNAME].github.io/nokk-app/privacy.html
서비스 약관: https://[USERNAME].github.io/nokk-app/terms.html
이메일: support@nokk.app
```

## 📚 가이드 읽는 순서

1. **FINAL_CHECKLIST.md** - 전체 프로세스 개요
2. **GITHUB_PAGES_SETUP.md** - 웹 호스팅 설정
3. **SCREENSHOT_GUIDE.md** - 스크린샷 생성
4. **GOOGLE_PLAY_GUIDE.md** - Google Play 제출
5. **APPLE_APPSTORE_GUIDE.md** - Apple 제출

## ⏰ 예상 타임라인

| 작업 | 시간 |
|------|------|
| GitHub Pages 배포 | 10분 |
| 스크린샷 생성 | 30분 |
| Feature Graphic | 1시간 |
| Google Play 계정 승인 | 1-2일 |
| Apple 계정 승인 | 1-5일 |
| Google Play 심사 | 1-3일 |
| Apple 심사 | 1-2일 |
| **총합** | **7-14일** |

## 📞 문의

- 이메일: support@nokk.app
- 문서 문제: GitHub Issues

---

마지막 업데이트: 2026-01-19
