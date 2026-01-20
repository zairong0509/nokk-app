#!/usr/bin/env python3
"""
NOKK Audio Generator - ElevenLabs API
Generates audio files for all phrases in all languages with different voice types (age groups)

Voice Types:
- young: Young man (20s) 
- middle: Adult man (30s)
- mature: Mature man (40s+)

Usage:
    python generate_elevenlabs.py
    
Requires:
    - ELEVENLABS_API_KEY environment variable
    - requests library (pip install requests)
"""

import os
import time
import requests
from pathlib import Path

# API Configuration
API_KEY = os.getenv('ELEVENLABS_API_KEY', '')
BASE_URL = 'https://api.elevenlabs.io/v1'
OUTPUT_DIR = Path(__file__).parent.parent / 'assets' / 'audio'

# Voice IDs for different age groups (ElevenLabs voices)
# These are example voice IDs - replace with actual ElevenLabs voice IDs
VOICES = {
    'young': 'pNInz6obpgDQGcFmaJgB',    # Adam - young male
    'middle': 'ErXwobaYiN019PkySvjV',   # Antoni - adult male  
    'mature': 'VR6AewLTigWG4xSOukaG',   # Arnold - mature male
}

# Voice settings for natural, assertive delivery
VOICE_SETTINGS = {
    'stability': 0.45,
    'similarity_boost': 0.80,
    'style': 0.65,
    'use_speaker_boost': True
}

# All phrases by language
PHRASES = {
    'en': {
        'general_1': "Hang on, I'm coming.",
        'general_2': 'Just a sec.',
        'general_3': 'Yeah?',
        'general_4': 'Who is it?',
        'general_5': 'Nope, wrong house.',
        'delivery_1': 'Just leave it at the door.',
        'delivery_2': 'Set it down there.',
        'delivery_3': 'Got it, thanks.',
        'delivery_4': 'Leave it by the gate.',
        'unknown_1': 'Who is it?',
        'unknown_2': 'Who the hell is it?!',
        'unknown_3': 'What do you want?',
        'unknown_4': 'Not interested, thanks.',
        'unknown_5': 'I said not interested! Go away!',
        'unknown_6': 'Come back another time.',
        'unknown_7': "I'm busy right now.",
        'threat_1': "I'm calling the cops.",
        'threat_2': "I just called the cops! You're fucked!",
        'threat_3': 'Step back. Get away from my door.',
        'threat_4': 'Back off!',
        'threat_5': 'Get the fuck out!',
        'threat_6': "You're being recorded. I have cameras.",
        'threat_7': "Everything's on camera! You're so fucked!",
        'night_1': "It's the middle of the night. What do you want?",
        'night_2': "It's the middle of the fucking night! Are you insane?!",
        'night_3': "I'm trying to sleep. Go away.",
        'night_4': "I'm sleeping! Get lost!",
        'night_5': 'Come back tomorrow.',
        'night_6': 'Do you know what time it is?',
        'night_7': 'Do you have any idea what fucking time it is?!',
    },
    'ko': {
        'general_1': '잠깐만요, 지금 나갑니다.',
        'general_2': '잠시만요.',
        'general_3': '네?',
        'general_4': '누구세요?',
        'general_5': '아닌데요.',
        'delivery_1': '문 앞에 놓고 가세요.',
        'delivery_2': '거기다 놔주세요.',
        'delivery_3': '네, 받았어요. 감사합니다.',
        'delivery_4': '대문 앞에 놔주세요.',
        'unknown_1': '누구세요?',
        'unknown_2': '누구시냐고요!',
        'unknown_3': '무슨 일이세요?',
        'unknown_4': '필요 없어요, 괜찮습니다.',
        'unknown_5': '필요 없다고! 가!',
        'unknown_6': '나중에 다시 와주세요.',
        'unknown_7': '지금 좀 바빠요.',
        'threat_1': '지금 바로 경찰 부를 거예요.',
        'threat_2': '야! 경찰 불렀다! 너 딱 기다려!',
        'threat_3': '물러서세요. 문에서 떨어지세요.',
        'threat_4': '문에서 떨어져!',
        'threat_5': '꺼져!',
        'threat_6': '다 찍히고 있어요. CCTV 돌아가고 있습니다.',
        'threat_7': '여기 CCTV로 다 찍고 있다! 너 좆됐어!',
        'night_1': '한밤중인데 무슨 일이에요?',
        'night_2': '한밤중에 뭐하는 거야?! 미쳤어?!',
        'night_3': '잘 시간이에요. 가세요.',
        'night_4': '잘 시간이잖아!',
        'night_5': '내일 오세요.',
        'night_6': '지금 몇 시인지 알아요?',
        'night_7': '야! 지금 몇 시야?!',
    },
    'ja': {
        'general_1': 'ちょっと待って、今行く。',
        'general_2': 'ちょっと待ってて。',
        'general_3': 'はい？',
        'general_4': '誰ですか？',
        'general_5': '違いますよ。',
        'delivery_1': 'ドアの前に置いといて。',
        'delivery_2': 'そこに置いといて。',
        'delivery_3': 'はい、ありがとう。',
        'delivery_4': '門の前に置いといて。',
        'unknown_1': '誰ですか？',
        'unknown_2': '誰だよ！',
        'unknown_3': '何の用ですか？',
        'unknown_4': '結構です。',
        'unknown_5': 'いらねぇって言ってんだろ！帰れ！',
        'unknown_6': 'また今度来てください。',
        'unknown_7': '今ちょっと忙しいんで。',
        'threat_1': '今すぐ警察呼びますよ。',
        'threat_2': 'おい！警察呼んだからな！終わりだぞお前！',
        'threat_3': '下がってください。ドアから離れて。',
        'threat_4': '下がれよ！',
        'threat_5': '失せろ！',
        'threat_6': '全部録画されてますよ。カメラ回ってます。',
        'threat_7': '全部撮ってんだよ！お前マジで終わりだからな！',
        'night_1': '夜中なんですけど、何の用ですか？',
        'night_2': '真夜中に何してんだよ！頭おかしいのか！',
        'night_3': '寝てるんで。帰ってください。',
        'night_4': '寝てんだよ！消えろ！',
        'night_5': '明日来てください。',
        'night_6': '今何時だと思ってんの？',
        'night_7': 'おい！今何時だよ！ふざけんな！',
    },
    'es': {
        'general_1': 'Un momento, ya voy.',
        'general_2': 'Espera un segundo.',
        'general_3': '¿Sí?',
        'general_4': '¿Quién es?',
        'general_5': 'No, te equivocaste de casa.',
        'delivery_1': 'Déjalo en la puerta.',
        'delivery_2': 'Ponlo ahí.',
        'delivery_3': 'Listo, gracias.',
        'delivery_4': 'Déjalo en la entrada.',
        'unknown_1': '¿Quién es?',
        'unknown_2': '¿¡Quién carajo es!?',
        'unknown_3': '¿Qué necesitas?',
        'unknown_4': 'No me interesa, gracias.',
        'unknown_5': '¡Que no me interesa! ¡Vete!',
        'unknown_6': 'Vuelve otro día.',
        'unknown_7': 'Estoy ocupado ahorita.',
        'threat_1': 'Voy a llamar a la policía.',
        'threat_2': '¡Ya llamé a la policía! ¡Estás jodido!',
        'threat_3': 'Aléjate de mi puerta.',
        'threat_4': '¡Hazte para atrás!',
        'threat_5': '¡Lárgate a la chingada!',
        'threat_6': 'Te estoy grabando. Tengo cámaras.',
        'threat_7': '¡Todo quedó grabado! ¡Ya valiste madre!',
        'night_1': 'Es medianoche. ¿Qué quieres?',
        'night_2': '¡Es la pinche madrugada! ¿¡Estás loco!?',
        'night_3': 'Estoy durmiendo. Vete.',
        'night_4': '¡Estoy dormido! ¡Lárgate!',
        'night_5': 'Vuelve mañana.',
        'night_6': '¿Sabes qué hora es?',
        'night_7': '¿¡Qué chingados hora crees que es!?',
    },
}


def generate_audio(text: str, voice_id: str, output_path: str) -> tuple[bool, str]:
    """Generate audio using ElevenLabs API"""
    if not API_KEY:
        return False, "API key not set"
    
    url = f"{BASE_URL}/text-to-speech/{voice_id}"
    
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": API_KEY
    }
    
    data = {
        "text": text,
        "model_id": "eleven_turbo_v2_5",
        "voice_settings": VOICE_SETTINGS
    }
    
    try:
        response = requests.post(url, json=data, headers=headers, timeout=30)
        
        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            return True, ""
        else:
            return False, f"HTTP {response.status_code}: {response.text[:200]}"
    except Exception as e:
        return False, str(e)


def main():
    print("=" * 60)
    print("🎙️  NOKK Audio Generator (ElevenLabs)")
    print("    Voice Types: young (20s), middle (30s), mature (40s+)")
    print("=" * 60)
    
    if not API_KEY:
        print("\n❌ Error: ELEVENLABS_API_KEY environment variable not set")
        print("   Set it with: export ELEVENLABS_API_KEY=your_key_here")
        return
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Generate for all languages, phrases, and voice types
    total_files = 0
    success_count = 0
    fail_count = 0
    
    for lang, phrases in PHRASES.items():
        lang_names = {'en': 'English', 'ko': 'Korean', 'ja': 'Japanese', 'es': 'Spanish'}
        print(f"\n📊 Language: {lang_names.get(lang, lang)}")
        print(f"   Phrases: {len(phrases)}")
        print("-" * 40)
        
        for voice_type, voice_id in VOICES.items():
            print(f"\n🔊 Voice Type: {voice_type}")
            
            for phrase_id, text in phrases.items():
                # Filename: {phrase_id}_{lang}_{voice_type}.mp3
                filename = f"{phrase_id}_{lang}_{voice_type}.mp3"
                filepath = OUTPUT_DIR / filename
                
                total_files += 1
                
                # Skip if already exists
                if filepath.exists():
                    print(f"⏭️  {filename} (exists)")
                    success_count += 1
                    continue
                
                ok, err = generate_audio(text, voice_id, str(filepath))
                
                if ok:
                    print(f"✅ {filename}")
                    success_count += 1
                else:
                    print(f"❌ {filename}: {err[:50]}")
                    fail_count += 1
                
                # Rate limiting
                time.sleep(0.3)
    
    print("\n" + "=" * 60)
    print(f"📊 Summary:")
    print(f"   Total files: {total_files}")
    print(f"   ✅ Success: {success_count}")
    print(f"   ❌ Failed: {fail_count}")
    print("=" * 60)


if __name__ == "__main__":
    main()
