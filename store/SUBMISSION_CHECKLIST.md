# 앱 스토어 제출 체크리스트

## ✅ 완료된 항목

### 빌드
- [x] Android AAB 파일 생성 완료
  - URL: https://expo.dev/artifacts/eas/oXzYxnxujKxE41eueVgrdt.aab
  - Version: 1.0.0
  - Build ID: b9ebe546-bc95-428b-8d84-c8020cc6669f

### 문서
- [x] 개인정보 처리방침 작성 (docs/privacy.html)
- [x] 서비스 이용약관 작성 (docs/terms.html)
- [x] 홈페이지 작성 (docs/index.html)
- [x] EAS 설정 최적화 (appVersionSource)

### 스토어 리스팅
- [x] 앱 설명 작성 (store/google-play/description.txt)
- [x] 메타데이터 작성 (store/google-play/metadata.json)

---

## ⏳ 준비 필요 항목

### Google Play Console
- [ ] Google Play Developer 계정 생성 ($25 one-time fee)
  - 링크: https://play.google.com/console
- [ ] 앱 생성 및 기본 정보 입력

### 스크린샷 (필수)
- [ ] 최소 2개, 최대 8개의 스크린샷
  - 권장 크기: 1080 x 1920 px (또는 1080 x 2400 px)
  - PNG 또는 JPEG
  - 주요 기능을 보여주는 화면들

### Feature Graphic (필수)
- [ ] 1024 x 500 px 이미지
  - PNG 또는 JPEG
  - Google Play 상단 배너에 표시됨

### 앱 아이콘
- [x] 현재 assets/icon.png 있음
- [ ] Google Play용 512 x 512 px 아이콘 (투명 배경 없이)

### 웹 호스팅 (필수)
- [ ] 개인정보 처리방침 웹페이지 공개
  - 현재 위치: Desktop/Nokk/docs/privacy.html
  - 필요: 공개 URL (예: https://nokk.app/privacy 또는 GitHub Pages)
- [ ] 서비스 약관 웹페이지 공개
  - 현재 위치: Desktop/Nokk/docs/terms.html
  - 필요: 공개 URL

---

## 📱 Google Play 제출 단계

### 1단계: 계정 및 앱 생성
1. Google Play Console 접속
2. 개발자 계정 생성 ($25)
3. "앱 만들기" 클릭
4. 앱 이름, 기본 언어, 앱 유형 설정

### 2단계: 스토어 설정
1. **앱 카테고리**: 라이프스타일 또는 도구
2. **콘텐츠 등급**: 설문지 작성
3. **타겟 오디언스**: 18세 이상
4. **개인정보처리방침 URL**: (웹 호스팅 후 입력)

### 3단계: 스토어 리스팅
1. 앱 이름: NOKK
2. 간단한 설명 (최대 80자)
3. 자세한 설명 (description.txt 사용)
4. 앱 아이콘 (512 x 512)
5. Feature Graphic (1024 x 500)
6. 스크린샷 업로드

### 4단계: 프로덕션 릴리스
1. "프로덕션" 탭 선택
2. "새 릴리스 만들기" 클릭
3. AAB 파일 업로드
4. 릴리스 노트 작성
5. 검토 및 제출

---

## 🍎 Apple App Store 준비

### iOS 빌드 필요
```bash
npx eas-cli build --platform ios --profile production
```

### 필수 항목
- [ ] Apple Developer 계정 ($99/year)
- [ ] 앱 아이콘 (1024 x 1024 px)
- [ ] 스크린샷 (다양한 iPhone 크기별)
  - 6.7": 1290 x 2796 px
  - 6.5": 1242 x 2688 px
  - 5.5": 1242 x 2208 px
- [ ] App Store 설명
- [ ] 개인정보처리방침 URL
- [ ] 지원 URL

---

## 🌐 웹 호스팅 옵션

### Option 1: GitHub Pages (무료, 권장)
1. GitHub 저장소 생성
2. docs 폴더를 gh-pages에 배포
3. Settings > Pages에서 활성화
4. URL 예: https://username.github.io/nokk/privacy.html

### Option 2: Netlify/Vercel (무료)
1. docs 폴더를 배포
2. 커스텀 도메인 설정 가능

### Option 3: 자체 도메인
1. nokk.app 도메인 구매
2. 웹 호스팅 서비스 사용

---

## 📋 다음 단계

1. **즉시 가능**:
   - 앱 스크린샷 생성 (개발 빌드 실행해서 캡처)
   - Feature Graphic 디자인
   - 512x512 앱 아이콘 준비

2. **웹 호스팅 필요**:
   - GitHub Pages로 docs 배포
   - 또는 임시로 다른 호스팅 서비스 사용

3. **계정 생성 대기**:
   - Google Play Developer 계정
   - Apple Developer 계정

4. **제출**:
   - AAB 파일 업로드
   - 모든 메타데이터 입력
   - 검토 제출

---

## 📞 문의처 설정

metadata.json에 설정된 연락처:
- Website: https://nokk.app
- Email: support@nokk.app
- Privacy: https://nokk.app/privacy
- Terms: https://nokk.app/terms

이 URL들이 실제로 작동해야 Google Play 승인을 받을 수 있습니다.
