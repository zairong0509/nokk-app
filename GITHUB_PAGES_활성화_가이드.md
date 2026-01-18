# 🌐 GitHub Pages 활성화 - 스크린샷으로 따라하기

## 왜 필요한가요?
Google Play와 Apple App Store는 **개인정보처리방침 웹 주소(URL)**를 필수로 요구합니다.
GitHub Pages를 사용하면 무료로 웹사이트를 만들 수 있습니다!

---

## 📝 단계별 가이드

### 1단계: 코드 푸시 먼저! (필수)

PowerShell이나 CMD를 열고:

```bash
cd C:\Users\jycho\Desktop\Nokk
git add .
git commit -m "Ready for app store submission"
git push -u origin main
```

**중요**: 이것을 먼저 해야 GitHub에 파일이 올라갑니다!

---

### 2단계: GitHub 웹사이트 열기

웹 브라우저(Chrome, Edge 등)에서 다음 주소로 이동:

```
https://github.com/zairong0509/nokk-app
```

로그인이 안 되어 있으면 GitHub 계정으로 로그인하세요.

---

### 3단계: Settings 메뉴 찾기

화면 상단에 탭들이 있습니다:

```
< > Code    Issues    Pull requests    Actions    Projects    Settings
                                                                  ↑
                                                              여기 클릭!
```

**Settings** (톱니바퀴 아이콘)를 클릭하세요.

---

### 4단계: Pages 메뉴 찾기

왼쪽에 긴 메뉴 목록이 있습니다. 아래로 스크롤하면:

```
General
Access
Moderation
Code and automation
  ↓
  Branches
  Tags
  Actions
  Webhooks
  Environments
  Pages  ← 여기 클릭!
  ...
```

**Pages**를 클릭하세요 (거의 중간쯤에 있음)

---

### 5단계: GitHub Pages 설정

Pages 페이지가 열리면 다음과 같이 보입니다:

#### A. Source 섹션 찾기

```
GitHub Pages
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Source
  Build and deployment

  [None ▼]  [/ (root) ▼]
```

#### B. 설정하기

1. **첫 번째 드롭다운 (Branch)**
   - 현재: `None` 또는 비어있음
   - 클릭해서 → **`main`** 선택
   
2. **두 번째 드롭다운 (Folder)**
   - 현재: `/ (root)` 
   - 클릭해서 → **`/docs`** 선택

3. **Save 버튼 클릭**
   - 파란색 **Save** 버튼을 클릭하세요

#### C. 설정 후 화면

```
Source
  Your GitHub Pages site is currently being built from the main branch.
  Folder: /docs
  
  [Save]  ← 이미 눌렀음
```

---

### 6단계: 배포 대기 (1-3분)

페이지를 새로고침(F5)하면 상단에 초록색 박스가 나타납니다:

```
✅ Your site is published at https://zairong0509.github.io/nokk-app/
```

**이 메시지가 나올 때까지 1-3분 정도 기다리세요.**

처음에는 이렇게 보일 수 있습니다:
```
🔄 Your site is being built...
```

---

### 7단계: URL 테스트

브라우저 새 탭에서 다음 주소들을 열어보세요:

1. **홈페이지**
   ```
   https://zairong0509.github.io/nokk-app/
   ```
   → NOKK 로고와 "안전 귀가 앱" 설명이 보여야 함

2. **개인정보처리방침**
   ```
   https://zairong0509.github.io/nokk-app/privacy.html
   ```
   → "개인정보 처리방침" 제목이 보여야 함

3. **서비스 약관**
   ```
   https://zairong0509.github.io/nokk-app/terms.html
   ```
   → "서비스 이용약관" 제목이 보여야 함

**모든 페이지가 제대로 보이면 ✅ 성공!**

---

## 🎯 정리

### 해야 할 것:
1. ✅ `git push` 명령어 실행
2. ✅ GitHub 웹사이트 열기 (https://github.com/zairong0509/nokk-app)
3. ✅ **Settings** 탭 클릭
4. ✅ 왼쪽에서 **Pages** 클릭
5. ✅ Branch: **main** 선택
6. ✅ Folder: **/docs** 선택
7. ✅ **Save** 버튼 클릭
8. ✅ 1-3분 대기
9. ✅ URL 테스트

---

## 🆘 문제 해결

### "Pages 메뉴가 안 보여요"
→ 저장소가 **Public**인지 확인하세요.
   Settings → General → Danger Zone에서 "Change visibility"

### "404 Not Found 오류"
→ 1-3분 더 기다리세요. 배포에 시간이 걸립니다.

### "main 브랜치가 없어요"
→ 1단계(git push)를 먼저 하셨나요?

### "docs 폴더 선택이 안 돼요"
→ 1단계(git push)를 먼저 해야 docs 폴더가 GitHub에 올라갑니다.

---

## 📞 성공하면?

이 URL들을 Google Play와 Apple App Store 제출할 때 사용하세요:

```
홈페이지: https://zairong0509.github.io/nokk-app/
개인정보처리방침: https://zairong0509.github.io/nokk-app/privacy.html
서비스 약관: https://zairong0509.github.io/nokk-app/terms.html
```

---

**이해되셨나요? 천천히 단계별로 따라해보세요!** 😊

작성일: 2026-01-19
