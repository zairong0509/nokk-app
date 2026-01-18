# NOKK Audio Files

이 폴더에 모든 음성 파일을 넣어주세요.

## 파일 명명 규칙
`{phrase_id}_{language}_{tone}.mp3`

## 예시
- `unknown_who_en_normal.mp3`
- `unknown_who_ko_normal.mp3`
- `unknown_who_ja_normal.mp3`
- `unknown_who_es_normal.mp3`
- `delivery_leave_door_en_firm.mp3`
- `threat_calling_police_en_angry.mp3`

## 필요한 파일

### 언어 (4개)
- en (English)
- ko (Korean)
- ja (Japanese)
- es (Spanish)

### 톤 (3개)
- normal
- firm
- angry

### 필수 문구 (각 언어 × 톤 조합)
1. `unknown_who` - "Who is it?"
2. `delivery_leave_door` - "Leave it at the door."
3. `threat_calling_police` - "I'm calling the police."

총 필요 파일: 최소 3개 문구 × 4개 언어 × 3개 톤 = **36개 파일**

전체 문구를 포함하면 약 **30개 문구 × 4개 언어 × 3개 톤 = 360개 파일**

## 녹음 요구사항
- 포맷: MP3 또는 AAC
- 비트레이트: 128kbps 이상
- 샘플레이트: 44.1kHz
- 채널: Mono 또는 Stereo
- 음성: 성인 남성, 자연스럽고 자신감 있는 톤
- 길이: 1-5초 (간결하게)

## 테스트용 임시 파일
개발 중에는 한 개의 오디오 파일을 복사해서 다른 이름으로 사용할 수 있습니다.
