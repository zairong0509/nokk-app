# 🌐 GitHub Pages 설정 가이드

## 왜 GitHub Pages가 필요한가요?

Google Play와 Apple App Store 모두 **개인정보처리방침 URL**이 필수입니다.
GitHub Pages는 무료로 웹사이트를 호스팅할 수 있어 완벽한 솔루션입니다.

---

## 📋 단계별 가이드

### 1단계: GitHub 저장소 생성

#### 1.1 GitHub 계정 확인
- 계정이 없다면: https://github.com/join

#### 1.2 새 저장소 생성
1. https://github.com/new 접속
2. 저장소 정보 입력:
   ```
   Repository name: nokk-app
   Description: NOKK Home Safety Voice App - 홈 안전 음성 앱
   Public (✅ 체크 - 필수!)
   Initialize with README (선택)
   ```
3. "Create repository" 클릭

---

### 2단계: 코드 푸시

#### 2.1 Git 원격 저장소 추가
```bash
cd Desktop/Nokk
git remote add origin https://github.com/[YOUR-USERNAME]/nokk-app.git
```

#### 2.2 변경사항 커밋 (아직 안 했다면)
```bash
git add .
git commit -m "Initial commit with docs and store assets"
```

#### 2.3 GitHub에 푸시
```bash
git branch -M main
git push -u origin main
```

---

### 3단계: GitHub Pages 활성화

#### 3.1 저장소 설정
1. GitHub 저장소 페이지에서 "Settings" 클릭
2. 왼쪽 메뉴에서 "Pages" 클릭

#### 3.2 소스 설정
**Branch**
```
main (또는 master)
```

**Folder**
```
/docs
```

#### 3.3 저장
"Save" 버튼 클릭

---

### 4단계: 배포 확인

#### 4.1 배포 상태 확인
- 보통 1-3분 소요
- 페이지 상단에 URL 표시:
  ```
  Your site is published at https://[YOUR-USERNAME].github.io/nokk-app/
  ```

#### 4.2 URL 테스트
다음 링크들이 작동하는지 확인:
```
https://[YOUR-USERNAME].github.io/nokk-app/
https://[YOUR-USERNAME].github.io/nokk-app/privacy.html
https://[YOUR-USERNAME].github.io/nokk-app/terms.html
```

---

## ✅ 완료 후 할 일

### 1. metadata.json 업데이트
`store/google-play/metadata.json` 파일에서 URL 수정:

```json
{
  "website": "https://[YOUR-USERNAME].github.io/nokk-app/",
  "privacyPolicyUrl": "https://[YOUR-USERNAME].github.io/nokk-app/privacy.html",
  "termsOfServiceUrl": "https://[YOUR-USERNAME].github.io/nokk-app/terms.html"
}
```

### 2. Google Play Console에 입력
- **개인정보처리방침**: `https://[YOUR-USERNAME].github.io/nokk-app/privacy.html`
- **웹사이트**: `https://[YOUR-USERNAME].github.io/nokk-app/`

### 3. Apple App Store Connect에 입력
- **개인정보처리방침 URL**: 위와 동일
- **지원 URL**: 위와 동일

---

## 🎨 커스텀 도메인 (선택 사항)

### 1. 도메인 구매
- Namecheap
- GoDaddy
- Google Domains

### 2. DNS 설정
도메인 관리 패널에서:
```
Type: CNAME
Name: @
Value: [YOUR-USERNAME].github.io
```

### 3. GitHub Pages에 도메인 추가
Settings > Pages > Custom domain:
```
nokk.app
```

그러면 URL이:
```
https://nokk.app/privacy.html
```
로 변경됩니다.

---

## 🔒 HTTPS 강제 적용

GitHub Pages 설정에서:
- ✅ "Enforce HTTPS" 체크

이렇게 하면 Google과 Apple이 요구하는 보안 요구사항을 충족합니다.

---

## 📝 문서 업데이트 방법

### 방법 1: 로컬에서 수정 후 푸시
```bash
cd Desktop/Nokk
# docs/ 폴더의 HTML 파일 수정
git add docs/
git commit -m "Update privacy policy"
git push
```

몇 분 후 자동 배포됨

### 방법 2: GitHub 웹에서 직접 수정
1. GitHub 저장소의 `docs/privacy.html` 클릭
2. 연필 아이콘 (Edit) 클릭
3. 수정 후 "Commit changes"

---

## 🐛 문제 해결

### 404 오류
**원인**: 배포가 완료되지 않음
**해결**: 
1. Settings > Pages에서 배포 상태 확인
2. Actions 탭에서 워크플로우 확인
3. 3-5분 대기 후 재시도

### CSS/JS 로드 안 됨
**원인**: 상대 경로 문제
**해결**: 
HTML에서 절대 경로 사용:
```html
<!-- 나쁨 -->
<link rel="stylesheet" href="style.css">

<!-- 좋음 -->
<link rel="stylesheet" href="/nokk-app/style.css">
```

### HTTPS 적용 안 됨
**원인**: 시간 필요
**해결**: 
- HTTPS 인증서 발급까지 최대 24시간 소요
- "Enforce HTTPS" 체크박스 확인

---

## 📊 통계 및 분석

### Google Analytics 추가 (선택)
docs/index.html의 `<head>` 태그에 추가:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎉 체크리스트

배포 전:
- [ ] GitHub 저장소 생성
- [ ] 저장소가 Public으로 설정됨
- [ ] docs 폴더에 HTML 파일 있음
- [ ] Git 원격 저장소 추가
- [ ] 코드 푸시

배포 후:
- [ ] GitHub Pages 활성화
- [ ] 배포 완료 확인 (1-3분)
- [ ] 모든 URL 작동 확인
- [ ] HTTPS 강제 적용
- [ ] metadata.json 업데이트
- [ ] Google Play/App Store에 URL 입력

---

## 🔗 유용한 링크

- GitHub Pages 공식 문서: https://docs.github.com/en/pages
- Custom domain 가이드: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- Troubleshooting: https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites

---

생성일: 2026-01-19
