# 🚀 NOKK 앱 출시 - 단계별 실행 가이드

## 현재 상태
- ✅ 모든 파일 준비 완료
- ✅ Git 저장소 연결됨 (https://github.com/zairong0509/nokk-app.git)
- ⏳ GitHub에 푸시 필요

---

## 📝 지금 바로 실행할 명령어

### 1단계: GitHub에 푸시 (30초)
터미널을 열고 다음 명령어를 순서대로 실행:

```bash
cd C:\Users\jycho\Desktop\Nokk
git push -u origin main
```

만약 브랜치 이름이 다르다면:
```bash
git branch -M main
git push -u origin main
```

**예상 결과:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
...
To https://github.com/zairong0509/nokk-app.git
 * [new branch]      main -> main
```

---

### 2단계: GitHub Pages 활성화 (1분)

#### A. 웹 브라우저에서:
1. https://github.com/zairong0509/nokk-app 열기
2. 상단 탭에서 **Settings** 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭 (아래쪽에 있음)

#### B. Source 설정:
```
Branch: main
Folder: /docs
```
**Save** 버튼 클릭

#### C. 배포 대기 (1-3분)
페이지 새로고침하면 상단에 다음 메시지 표시:
```
✅ Your site is live at https://zairong0509.github.io/nokk-app/
```

---

### 3단계: 배포 확인 (30초)

다음 URL들을 브라우저에서 열어 확인:

1. **홈페이지**: https://zairong0509.github.io/nokk-app/
   - NOKK 로고와 앱 설명이 보여야 함

2. **개인정보처리방침**: https://zairong0509.github.io/nokk-app/privacy.html
   - "개인정보 처리방침" 제목이 보여야 함

3. **서비스 약관**: https://zairong0509.github.io/nokk-app/terms.html
   - "서비스 이용약관" 제목이 보여야 함

**모든 페이지가 잘 보이면 ✅ 성공!**

---

### 4단계: 스크린샷 생성 (30분)

#### A. 앱 실행
터미널에서:
```bash
cd C:\Users\jycho\Desktop\Nokk
npx expo start
```

#### B. Android 에뮬레이터 실행
Expo 개발 서버가 시작되면 키보드에서 **'a'** 키 누르기

#### C. 다음 화면들을 캡처:

1. **홈 화면** (HomeScreen)
   - 카테고리 목록이 보이는 메인 화면
   - 파일명: `01-home-screen.png`

2. **톤 선택 화면** (ToneSelectScreen)
   - 밝은, 차분한, 강한 톤 선택
   - 파일명: `02-tone-select.png`

3. **언어 선택 화면** (LanguageSelectScreen)
   - 한국어, English, 日本語, 中文
   - 파일명: `03-language-select.png`

4. **설정 화면** (SettingsScreen)
   - 다크 모드, 언어, 톤 설정
   - 파일명: `04-settings.png`

5. **검색 화면** (SearchScreen) - 선택사항
   - 파일명: `05-search.png`

#### D. 저장 위치
```
C:\Users\jycho\Desktop\Nokk\store\screenshots\android\
```

#### E. 스크린샷 크기 확인
- 이상적: 1080 x 1920 px
- 최소: 320 x 640 px
- 최대: 3840 x 3840 px

---

### 5단계: Feature Graphic 생성 (1시간)

#### A. Canva 사용 (권장, 무료)
1. https://www.canva.com/ 접속
2. "커스텀 크기" 클릭
3. 크기 입력: **1024 x 500 px**
4. 다음 요소 포함:
   - 배경: 다크 그라디언트 (#1a1a1a → #2d2d2d)
   - NOKK 로고 (assets/icon.png 업로드)
   - 텍스트: "NOKK - 안전한 귀가를 위한 동반자"
   - 강조 색상: 그린 (#4CAF50)
   - 아이콘: 방패 🛡️ 또는 헤드폰 🎧

#### B. 다운로드
- PNG 형식으로 다운로드
- 저장 위치: `C:\Users\jycho\Desktop\Nokk\store\graphics\feature-graphic.png`

#### C. 대안: Figma
- https://www.figma.com/ (무료)
- 동일한 크기 및 디자인

---

### 6단계: 앱 아이콘 준비 (10분)

#### A. 현재 아이콘 확인
```
C:\Users\jycho\Desktop\Nokk\assets\icon.png
```

#### B. Google Play용 아이콘 생성
- 크기: **512 x 512 px**
- 형식: PNG (투명 배경 없음)

온라인 리사이즈 도구:
1. https://www.iloveimg.com/resize-image
2. icon.png 업로드
3. 512 x 512 px로 리사이즈
4. 저장: `store/graphics/app-icon-512.png`

#### C. Apple용 아이콘 (나중에)
- 크기: **1024 x 1024 px**
- 동일한 방법으로 리사이즈

---

### 7단계: 계정 생성 (동시 진행 가능)

#### A. Google Play Developer 계정
1. https://play.google.com/console 접속
2. "시작하기" 클릭
3. 개발자 정보 입력:
   - 개발자 이름: NOKK 또는 본인 이름
   - 이메일: support@nokk.app 또는 본인 이메일
4. **$25 결제** (일회성)
5. 승인 대기: 24-48시간

#### B. Apple Developer 계정 (선택)
1. https://developer.apple.com/programs/ 접속
2. "Enroll" 클릭
3. **$99/year 결제**
4. 승인 대기: 24시간-5일

---

## 📊 완료 체크리스트

### 즉시 완료 가능
- [ ] 1단계: GitHub 푸시
- [ ] 2단계: GitHub Pages 활성화
- [ ] 3단계: URL 작동 확인
- [ ] 4단계: 스크린샷 생성 (5개)
- [ ] 5단계: Feature Graphic 디자인
- [ ] 6단계: 앱 아이콘 리사이즈

### 계정 승인 대기 중
- [ ] 7단계: Google Play 계정 생성
- [ ] 7단계: Apple 계정 생성 (선택)

### 계정 승인 후
- [ ] Google Play 제출 (`store/GOOGLE_PLAY_GUIDE.md` 참고)
- [ ] iOS 빌드 생성
- [ ] Apple App Store 제출 (`store/APPLE_APPSTORE_GUIDE.md` 참고)

---

## 🆘 문제 해결

### Git push 실패
**오류**: `error: failed to push some refs`
**해결**:
```bash
git pull origin main --rebase
git push -u origin main
```

### GitHub Pages 404 오류
**원인**: 배포가 아직 완료되지 않음
**해결**: 3-5분 대기 후 재시도

### 에뮬레이터 실행 안 됨
**해결**:
1. Android Studio 실행
2. AVD Manager에서 가상 기기 생성
3. 또는 실제 Android 기기를 USB로 연결

### Expo 실행 오류
```bash
cd C:\Users\jycho\Desktop\Nokk
npm install
npx expo start --clear
```

---

## 📞 스토어 제출 시 사용할 URL

모든 스토어 제출 시 다음 정보 사용:

```
홈페이지: https://zairong0509.github.io/nokk-app/
개인정보처리방침: https://zairong0509.github.io/nokk-app/privacy.html
서비스 약관: https://zairong0509.github.io/nokk-app/terms.html
이메일: support@nokk.app
개발자: NOKK (또는 본인 이름)
```

---

## 🎯 예상 소요 시간

| 작업 | 시간 |
|------|------|
| Git 푸시 + GitHub Pages | 2분 |
| 스크린샷 생성 | 30분 |
| Feature Graphic | 1시간 |
| 앱 아이콘 리사이즈 | 10분 |
| **오늘 완료 가능** | **1시간 42분** |
| Google Play 계정 승인 | 1-2일 |
| Apple 계정 승인 | 1-5일 |
| 스토어 제출 | 3시간 |
| 심사 | 2-5일 |
| **총 예상 기간** | **7-14일** |

---

## 🎉 다음 단계

1. **지금**: 1-6단계 실행 (약 2시간)
2. **오늘 또는 내일**: Google Play & Apple 계정 생성
3. **1-5일 후**: 계정 승인 확인
4. **승인 후**: 스토어 제출 (가이드 문서 참고)
5. **2-5일 후**: 앱 출시! 🚀

---

**이 파일을 단계별로 따라하시면 됩니다!**

각 단계 완료 후 체크박스에 ✅ 표시하세요.

작성일: 2026-01-19
