#!/usr/bin/env python3
"""
NOKK Audio Generator - ElevenLabs (Natural Mature Male Voices)
Bill voice for English, mature male voices for other languages
"""

import requests
import os
import time

API_KEY = "sk_da15da2b103894a5559d37bf79c104b32f251a2b78c1aecb"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'assets', 'audio')

# Mature male voices for each language
VOICES = {
    'en': 'pqHfZKP75CvOlQylNhV4',  # Bill - Wise, Mature, Balanced
    'ko': 'pqHfZKP75CvOlQylNhV4',  # Bill (supports multilingual)
    'ja': 'pqHfZKP75CvOlQylNhV4',  # Bill (supports multilingual)
    'es': 'pqHfZKP75CvOlQylNhV4',  # Bill (supports multilingual)
}

# Tone settings - faster speed for natural feel
TONES = {
    'normal': {'stability': 0.5, 'similarity_boost': 0.75, 'speed': 1.1},
    'firm': {'stability': 0.7, 'similarity_boost': 0.8, 'speed': 1.0},
    'angry': {'stability': 0.3, 'similarity_boost': 0.9, 'speed': 1.2},
}

# All phrases
PHRASES = {
    'en': {
        'delivery_leave_door': 'Leave it at the door.',
        'delivery_put_down': 'Just put it down there.',
        'delivery_thanks': 'Thanks, I got it.',
        'delivery_gate': 'Leave it by the gate.',
        'delivery_pickup': "I'll pick it up in a minute.",
        'unknown_who': 'Who is it?',
        'unknown_not_expecting': "I'm not expecting anyone.",
        'unknown_what_want': 'What do you want?',
        'unknown_not_interested': "We're not interested.",
        'unknown_come_back': 'Come back later.',
        'unknown_busy': "I'm busy right now.",
        'threat_calling_police': "I'm calling the police.",
        'threat_get_away': 'Get away from my door!',
        'threat_camera': "I've got a camera recording you.",
        'threat_security': 'Leave now or I call security.',
        'threat_armed': "I'm armed and I will defend myself.",
        'threat_neighbors': 'My neighbors are watching.',
        'night_late': "It's late. What do you want?",
        'night_sleeping': "We're sleeping. Go away.",
        'night_tomorrow': 'Come back tomorrow.',
        'night_time': 'Do you know what time it is?',
        'general_coming': "Hold on, I'm coming.",
        'general_second': 'Give me a second.',
        'general_yes': 'Yes?',
        'general_whos_there': "Who's there?",
    },
    'ko': {
        'delivery_leave_door': '문 앞에 놔두세요.',
        'delivery_put_down': '거기 내려놓으세요.',
        'delivery_thanks': '감사합니다, 받았어요.',
        'delivery_gate': '대문 앞에 놔두세요.',
        'delivery_pickup': '잠시 후에 가져갈게요.',
        'unknown_who': '누구세요?',
        'unknown_not_expecting': '약속한 사람 없는데요.',
        'unknown_what_want': '무슨 일이세요?',
        'unknown_not_interested': '관심 없습니다.',
        'unknown_come_back': '나중에 다시 오세요.',
        'unknown_busy': '지금 바빠요.',
        'threat_calling_police': '경찰에 신고하겠습니다.',
        'threat_get_away': '문에서 떨어지세요!',
        'threat_camera': '카메라로 녹화 중입니다.',
        'threat_security': '당장 떠나세요, 안 그러면 경비실에 연락합니다.',
        'threat_armed': '무장하고 있고, 자기 방어할 겁니다.',
        'threat_neighbors': '이웃들이 보고 있어요.',
        'night_late': '늦었는데, 무슨 일이세요?',
        'night_sleeping': '자고 있어요. 가세요.',
        'night_tomorrow': '내일 다시 오세요.',
        'night_time': '지금 몇 시인지 알아요?',
        'general_coming': '잠깐만요, 갑니다.',
        'general_second': '잠시만 기다려요.',
        'general_yes': '네?',
        'general_whos_there': '거기 누구세요?',
    },
    'ja': {
        'delivery_leave_door': 'ドアの前に置いてください。',
        'delivery_put_down': 'そこに置いてください。',
        'delivery_thanks': 'ありがとう、受け取りました。',
        'delivery_gate': '門の前に置いてください。',
        'delivery_pickup': 'すぐ取りに行きます。',
        'unknown_who': 'どちら様ですか？',
        'unknown_not_expecting': '誰も待っていません。',
        'unknown_what_want': '何のご用ですか？',
        'unknown_not_interested': '興味ありません。',
        'unknown_come_back': 'また後で来てください。',
        'unknown_busy': '今忙しいです。',
        'threat_calling_police': '警察を呼びます。',
        'threat_get_away': 'ドアから離れてください！',
        'threat_camera': 'カメラで録画しています。',
        'threat_security': '今すぐ立ち去らないと警備員を呼びます。',
        'threat_armed': '武装しています。自己防衛します。',
        'threat_neighbors': '隣人が見ています。',
        'night_late': '遅いですね。何のご用ですか？',
        'night_sleeping': '寝ています。帰ってください。',
        'night_tomorrow': '明日また来てください。',
        'night_time': '今何時か分かっていますか？',
        'general_coming': 'ちょっと待って、今行きます。',
        'general_second': '少々お待ちください。',
        'general_yes': 'はい？',
        'general_whos_there': 'そこにいるのは誰？',
    },
    'es': {
        'delivery_leave_door': 'Déjalo en la puerta.',
        'delivery_put_down': 'Ponlo ahí.',
        'delivery_thanks': 'Gracias, lo tengo.',
        'delivery_gate': 'Déjalo en la entrada.',
        'delivery_pickup': 'Lo recogeré en un momento.',
        'unknown_who': '¿Quién es?',
        'unknown_not_expecting': 'No espero a nadie.',
        'unknown_what_want': '¿Qué quiere?',
        'unknown_not_interested': 'No estamos interesados.',
        'unknown_come_back': 'Vuelva más tarde.',
        'unknown_busy': 'Estoy ocupado ahora.',
        'threat_calling_police': 'Voy a llamar a la policía.',
        'threat_get_away': '¡Aléjese de mi puerta!',
        'threat_camera': 'Tengo una cámara grabándote.',
        'threat_security': 'Váyase ahora o llamo a seguridad.',
        'threat_armed': 'Estoy armado y me defenderé.',
        'threat_neighbors': 'Mis vecinos están mirando.',
        'night_late': 'Es tarde. ¿Qué quiere?',
        'night_sleeping': 'Estamos durmiendo. Váyase.',
        'night_tomorrow': 'Vuelva mañana.',
        'night_time': '¿Sabe qué hora es?',
        'general_coming': 'Espere, ya voy.',
        'general_second': 'Un momento.',
        'general_yes': '¿Sí?',
        'general_whos_there': '¿Quién está ahí?',
    },
}

def generate_audio(text, lang, tone, output_path):
    voice_id = VOICES[lang]
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": API_KEY
    }
    
    tone_cfg = TONES[tone]
    
    data = {
        "text": text,
        "model_id": "eleven_turbo_v2_5",
        "voice_settings": {
            "stability": tone_cfg['stability'],
            "similarity_boost": tone_cfg['similarity_boost'],
            "speed": tone_cfg['speed']
        }
    }
    
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        with open(output_path, 'wb') as f:
            f.write(response.content)
        return True, None
    else:
        return False, response.text

def main():
    print("=" * 50)
    print("🎙️  NOKK Audio Generator (ElevenLabs - Bill Voice)")
    print("    Mature male voice, faster speed")
    print("=" * 50)
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Only generate English first (priority)
    lang = 'en'
    phrases = PHRASES[lang]
    
    tasks = []
    for phrase_id, text in phrases.items():
        for tone in TONES.keys():
            tasks.append((phrase_id, text, tone))
    
    total_chars = sum(len(text) for _, text, _ in tasks)
    print(f"\n📊 Language: English (priority)")
    print(f"📊 Files: {len(tasks)} | Characters: {total_chars}")
    print("=" * 50 + "\n")
    
    success, fail = 0, 0
    
    for i, (phrase_id, text, tone) in enumerate(tasks, 1):
        filename = f"{phrase_id}_{lang}_{tone}.mp3"
        filepath = os.path.join(OUTPUT_DIR, filename)
        
        ok, err = generate_audio(text, lang, tone, filepath)
        
        if ok:
            print(f"✅ [{i}/{len(tasks)}] {filename}")
            success += 1
        else:
            print(f"❌ [{i}/{len(tasks)}] {filename}: {err[:100]}")
            fail += 1
        
        time.sleep(0.5)
    
    print(f"\n{'=' * 50}")
    print(f"✅ Success: {success} | ❌ Failed: {fail}")
    print("=" * 50)

if __name__ == "__main__":
    main()
