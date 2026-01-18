# 🌐 GitHub Pages 활성화부터 끝까지 완벽 가이드

## 📝 현재 상황
- ✅ 모든 파일 준비 완료 (한국어 + 영어)
- ✅ Git 저장소 연결됨 (https://github.com/zairong0509/nokk-app.git)
- ⏳ GitHub에 푸시 필요
- ⏳ GitHub Pages 활성화 필요

---

## 🚀 STEP 1: GitHub에 코드 푸시 (5분)

### 1-1. PowerShell 또는 CMD 열기
1. 키보드에서 `Windows 키` 누르기
2. "powershell" 또는 "cmd" 입력
3. Enter 키

### 1-2. 명령어 실행
다음 명령어를 **하나씩** 복사해서 붙여넣고 Enter:

```bash
cd C:\Users\jycho\Desktop\Nokk
```
(폴더로 이동)

```bash
git add .
```
(모든 변경사항 추가)

```bash
git commit -m "feat: Complete app store submission with Korean and English docs"
```
(커밋 메시지)

```bash
git push -u origin main
```
(GitHub에 업로드)

### 1-3. 예상 출력
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Delta compression using up to X threads
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), XX.XX KiB | XX.XX MiB/s, done.
Total XX (delta XX), reused X (delta X), pack-reused X
To https://github.com/zairong0509/nokk-app.git
   xxxxxxx..yyyyyyy  main -> main
```

이렇게 나오면 ✅ **성공!**

---

## 🌐 STEP 2: GitHub Pages 활성화 (2분)

### 2-1. GitHub 웹사이트 열기
웹 브라우저(Chrome, Edge 등)에서 이 주소로 이동:
```
https://github.com/zairong0509/nokk-app
```

### 2-2. 로그인 확인
- GitHub 계정으로 로그인되어 있어야 합니다
- 로그인 안 되어 있으면 로그인하세요

### 2-3. Settings 메뉴 클릭
화면 상단에 탭들이 보입니다:

```
< > Code    Issues    Pull requests    Actions    Projects    Wiki    Settings
                                                                          ↑↑↑
                                                                    여기 클릭!
```

**Settings** (톱니바퀴 모양 아이콘)를 클릭하세요.

### 2-4. Pages 메뉴 찾기
왼쪽에 긴 메뉴 목록이 있습니다. 아래로 스크롤해서 찾으세요:

```
왼쪽 메뉴:
├── General
├── Access
├── Collaborators
├── Moderation options
├── Code and automation
│   ├── Branches
│   ├── Tags
│   ├── Rules
│   ├── Actions
│   ├── Webhooks
│   ├── Environments
│   ├── Pages  ← ★★★ 여기 클릭! ★★★
│   └── ...
```

**Pages**를 클릭하세요.

### 2-5. GitHub Pages 설정
Pages 페이지가 열리면 다음과 같이 보입니다:

```
GitHub Pages
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build and deployment

Source
  Deploy from a branch

Branch
  [None ▼]  [/ (root) ▼]  [Save]
```

### 2-6. 설정 변경하기

#### A. 첫 번째 드롭다운 (Branch)
1. **[None ▼]** 클릭
2. 목록에서 **`main`** 선택

#### B. 두 번째 드롭다운 (Folder)
1. **[/ (root) ▼]** 클릭
2. 목록에서 **`/docs`** 선택

#### C. Save 버튼 클릭
파란색 **[Save]** 버튼을 클릭하세요!

### 2-7. 설정 완료 확인
설정하면 이렇게 바뀝니다:

```
Build and deployment

Source
  Deploy from a branch

Branch
  main    /docs    [Save]
```

---

## ⏰ STEP 3: 배포 대기 (1-3분)

### 3-1. 페이지 새로고침
키보드에서 **F5** 키를 누르거나 브라우저 새로고침 버튼 클릭

### 3-2. 배포 중 메시지
처음에는 이렇게 보일 수 있습니다:

```
🔄 Your GitHub Pages site is currently being built from the main branch.
```

또는:

```
⚙️ GitHub Pages is building your site...
```

### 3-3. 배포 완료!
1-3분 후 페이지를 새로고침하면:

```
✅ Your site is live at https://zairong0509.github.io/nokk-app/
```

이 메시지가 나오면 **완료!** 🎉

---

## 🧪 STEP 4: URL 테스트 (2분)

### 4-1. 한국어 페이지 확인
새 탭을 열고 다음 주소들을 하나씩 확인:

**홈페이지:**
```
https://zairong0509.github.io/nokk-app/
```
→ "NOKK - 홈 안전 음성 앱" 제목이 보여야 함

**개인정보처리방침:**
```
https://zairong0509.github.io/nokk-app/privacy.html
```
→ "개인정보 처리방침" 제목이 보여야 함

**서비스 약관:**
```
https://zairong0509.github.io/nokk-app/terms.html
```
→ "서비스 이용약관" 제목이 보여야 함

### 4-2. 영어 페이지 확인

**English Homepage:**
```
https://zairong0509.github.io/nokk-app/index_en.html
```
→ "NOKK - Home Safety Voice App" 제목이 보여야 함

**Privacy Policy:**
```
https://zairong0509.github.io/nokk-app/privacy_en.html
```
→ "Privacy Policy" 제목이 보여야 함

**Terms of Service:**
```
https://zairong0509.github.io/nokk-app/terms_en.html
```
→ "Terms of Service" 제목이 보여야 함

### 4-3. 언어 전환 테스트
각 페이지 오른쪽 상단에 다음이 보여야 함:

```
🇰🇷 한국어 | 🇺🇸 English
```

클릭하면 언어가 전환되어야 함!

---

## ✅ STEP 5: 스토어 제출 준비 완료!

모든 URL이 작동하면, 이제 스토어 제출 시 사용할 URL을 메모하세요:

### Google Play 제출 시

#### 한국어 스토어 등록정보:
```
웹사이트: https://zairong0509.github.io/nokk-app/
개인정보처리방침: https://zairong0509.github.io/nokk-app/privacy.html
```

#### 영어 스토어 등록정보:
```
웹사이트: https://zairong0509.github.io/nokk-app/index_en.html
개인정보처리방침: https://zairong0509.github.io/nokk-app/privacy_en.html
```

### Apple App Store 제출 시

#### 한국어:
```
지원 URL: https://zairong0509.github.io/nokk-app/
개인정보처리방침 URL: https://zairong0509.github.io/nokk-app/privacy.html
```

#### 영어:
```
지원 URL: https://zairong0509.github.io/nokk-app/index_en.html
개인정보처리방침 URL: https://zairong0509.github.io/nokk-app/privacy_en.html
```

---

## 🐛 문제 해결

### 문제 1: "404 Not Found" 오류
**원인**: 배포가 아직 완료되지 않음
**해결**: 
- 3-5분 더 기다리기
- 페이지 새로고침 (F5)
- GitHub Pages 설정 페이지에서 배포 상태 확인

### 문제 2: Pages 메뉴가 안 보여요
**원인**: 저장소가 Private일 수 있음
**해결**:
1. Settings → General (맨 위)
2. 맨 아래 "Danger Zone" 섹션
3. "Change visibility" → "Make public"

### 문제 3: git push 실패
**오류 메시지**: `error: failed to push some refs`
**해결**:
```bash
git pull origin main --rebase
git push -u origin main
```

### 문제 4: Permission denied
**원인**: GitHub 로그인 필요
**해결**:
```bash
git config --global user.name "your-username"
git config --global user.email "your-email@example.com"
```
그 후 다시 push

---

## 🎯 다음 단계

GitHub Pages 배포 완료 후:

### 즉시 가능:
1. ✅ **스크린샷 생성** (30분)
   ```bash
   cd C:\Users\jycho\Desktop\Nokk
   npx expo start
   ```
   - 'a' 키로 Android 에뮬레이터 실행
   - 각 화면 캡처 후 `store/screenshots/android/` 저장

2. ✅ **Feature Graphic 디자인** (1시간)
   - Canva: https://www.canva.com/
   - 크기: 1024 x 500 px
   - 저장: `store/graphics/feature-graphic.png`

### 계정 생성 필요:
3. ⏳ **Google Play Developer 등록** ($25)
   - https://play.google.com/console
   - 승인: 1-2일

4. ⏳ **Apple Developer 등록** ($99/year)
   - https://developer.apple.com/programs/
   - 승인: 1-5일

### 계정 승인 후:
5. 🚀 **Google Play 제출**
   - 가이드: `store/GOOGLE_PLAY_GUIDE.md`
   - 소요 시간: 1시간
   - 심사: 1-3일

6. 🚀 **Apple App Store 제출**
   - iOS 빌드: `npx eas-cli build --platform ios --profile production`
   - 가이드: `store/APPLE_APPSTORE_GUIDE.md`
   - 소요 시간: 2시간
   - 심사: 1-2일

---

## 📋 체크리스트

### GitHub Pages 배포
- [ ] STEP 1: Git 푸시 완료
- [ ] STEP 2: GitHub Pages 활성화 완료
- [ ] STEP 3: 배포 완료 메시지 확인
- [ ] STEP 4-1: 한국어 페이지 모두 작동
- [ ] STEP 4-2: 영어 페이지 모두 작동
- [ ] STEP 4-3: 언어 전환 작동
- [ ] STEP 5: URL 메모 완료

### 다음 작업
- [ ] 스크린샷 생성 (5개 이상)
- [ ] Feature Graphic 디자인
- [ ] Google Play 계정 생성
- [ ] Apple Developer 계정 생성

---

## 💡 팁

1. **북마크 추가**: GitHub Pages URL을 북마크에 추가하세요
2. **스크린샷 먼저**: 계정 승인 기다리는 동안 스크린샷 만들기
3. **테스트 철저히**: 모든 링크가 작동하는지 확인
4. **URL 백업**: 모든 URL을 메모장에 복사해두기

---

## 🎉 완료!

이 가이드를 따라하시면:
- ✅ GitHub Pages 배포 완료
- ✅ 한국어/영어 웹사이트 공개
- ✅ 스토어 제출 준비 완료

**이제 STEP 1부터 시작하세요!** 🚀

---

작성일: 2026-01-19
버전: 1.0 (완전판)
