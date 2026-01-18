#!/usr/bin/env python3
"""
NOKK Audio Generator - Edge TTS (Natural Male Voices)
"""

import asyncio
import edge_tts
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'assets', 'audio')

# Male voices for each language
VOICES = {
    'en': 'en-US-GuyNeural',
    'ko': 'ko-KR-InJoonNeural', 
    'ja': 'ja-JP-KeitaNeural',
    'es': 'es-ES-AlvaroNeural',
}

TONES = {
    'normal': {'rate': '+0%', 'pitch': '+0Hz'},
    'firm': {'rate': '-10%', 'pitch': '-3Hz'},
    'angry': {'rate': '+10%', 'pitch': '+3Hz'},
}

PHRASES = {
    'delivery_leave_door': {'en': 'Leave it at the door.', 'ko': '문 앞에 놔두세요.', 'ja': 'ドアの前に置いてください。', 'es': 'Déjalo en la puerta.'},
    'delivery_put_down': {'en': 'Just put it down there.', 'ko': '거기 내려놓으세요.', 'ja': 'そこに置いてください。', 'es': 'Ponlo ahí.'},
    'delivery_thanks': {'en': 'Thanks, I got it.', 'ko': '감사합니다, 받았어요.', 'ja': 'ありがとう、受け取りました。', 'es': 'Gracias, lo tengo.'},
    'delivery_gate': {'en': 'Leave it by the gate.', 'ko': '대문 앞에 놔두세요.', 'ja': '門の前に置いてください。', 'es': 'Déjalo en la entrada.'},
    'delivery_pickup': {'en': "I'll pick it up in a minute.", 'ko': '잠시 후에 가져갈게요.', 'ja': 'すぐ取りに行きます。', 'es': 'Lo recogeré en un momento.'},
    'unknown_who': {'en': 'Who is it?', 'ko': '누구세요?', 'ja': 'どちら様ですか？', 'es': '¿Quién es?'},
    'unknown_not_expecting': {'en': "I'm not expecting anyone.", 'ko': '약속한 사람 없는데요.', 'ja': '誰も待っていません。', 'es': 'No espero a nadie.'},
    'unknown_what_want': {'en': 'What do you want?', 'ko': '무슨 일이세요?', 'ja': '何のご用ですか？', 'es': '¿Qué quiere?'},
    'unknown_not_interested': {'en': "We're not interested.", 'ko': '관심 없습니다.', 'ja': '興味ありません。', 'es': 'No estamos interesados.'},
    'unknown_come_back': {'en': 'Come back later.', 'ko': '나중에 다시 오세요.', 'ja': 'また後で来てください。', 'es': 'Vuelva más tarde.'},
    'unknown_busy': {'en': "I'm busy right now.", 'ko': '지금 바빠요.', 'ja': '今忙しいです。', 'es': 'Estoy ocupado ahora.'},
    'threat_calling_police': {'en': "I'm calling the police.", 'ko': '경찰에 신고하겠습니다.', 'ja': '警察を呼びます。', 'es': 'Voy a llamar a la policía.'},
    'threat_get_away': {'en': 'Get away from my door!', 'ko': '문에서 떨어지세요!', 'ja': 'ドアから離れてください！', 'es': '¡Aléjese de mi puerta!'},
    'threat_camera': {'en': "I've got a camera recording you.", 'ko': '카메라로 녹화 중입니다.', 'ja': 'カメラで録画しています。', 'es': 'Tengo una cámara grabándote.'},
    'threat_security': {'en': 'Leave now or I call security.', 'ko': '당장 떠나세요, 안 그러면 경비실에 연락합니다.', 'ja': '今すぐ立ち去らないと警備員を呼びます。', 'es': 'Váyase ahora o llamo a seguridad.'},
    'threat_armed': {'en': "I'm armed and I will defend myself.", 'ko': '무장하고 있고, 자기 방어할 겁니다.', 'ja': '武装しています。自己防衛します。', 'es': 'Estoy armado y me defenderé.'},
    'threat_neighbors': {'en': 'My neighbors are watching.', 'ko': '이웃들이 보고 있어요.', 'ja': '隣人が見ています。', 'es': 'Mis vecinos están mirando.'},
    'night_late': {'en': "It's late. What do you want?", 'ko': '늦었는데, 무슨 일이세요?', 'ja': '遅いですね。何のご用ですか？', 'es': 'Es tarde. ¿Qué quiere?'},
    'night_sleeping': {'en': "We're sleeping. Go away.", 'ko': '자고 있어요. 가세요.', 'ja': '寝ています。帰ってください。', 'es': 'Estamos durmiendo. Váyase.'},
    'night_tomorrow': {'en': 'Come back tomorrow.', 'ko': '내일 다시 오세요.', 'ja': '明日また来てください。', 'es': 'Vuelva mañana.'},
    'night_time': {'en': 'Do you know what time it is?', 'ko': '지금 몇 시인지 알아요?', 'ja': '今何時か分かっていますか？', 'es': '¿Sabe qué hora es?'},
    'general_coming': {'en': "Hold on, I'm coming.", 'ko': '잠깐만요, 갑니다.', 'ja': 'ちょっと待って、今行きます。', 'es': 'Espere, ya voy.'},
    'general_second': {'en': 'Give me a second.', 'ko': '잠시만 기다려요.', 'ja': '少々お待ちください。', 'es': 'Un momento.'},
    'general_yes': {'en': 'Yes?', 'ko': '네?', 'ja': 'はい？', 'es': '¿Sí?'},
    'general_whos_there': {'en': "Who's there?", 'ko': '거기 누구세요?', 'ja': 'そこにいるのは誰？', 'es': '¿Quién está ahí?'},
}

async def generate_audio(phrase_id, lang, tone, text):
    voice = VOICES[lang]
    tone_cfg = TONES[tone]
    filename = f"{phrase_id}_{lang}_{tone}.mp3"
    filepath = os.path.join(OUTPUT_DIR, filename)
    
    try:
        communicate = edge_tts.Communicate(text, voice, rate=tone_cfg['rate'], pitch=tone_cfg['pitch'])
        await communicate.save(filepath)
        return True, filename
    except Exception as e:
        return False, f"{filename}: {e}"

async def main():
    print("=" * 50)
    print("🎙️  NOKK Audio Generator (Edge TTS - Male Voices)")
    print("=" * 50)
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    tasks = []
    for phrase_id, translations in PHRASES.items():
        for lang, text in translations.items():
            for tone in TONES.keys():
                tasks.append((phrase_id, lang, tone, text))
    
    print(f"📊 Total: {len(tasks)} files\n")
    
    success, fail = 0, 0
    for i, (phrase_id, lang, tone, text) in enumerate(tasks, 1):
        ok, msg = await generate_audio(phrase_id, lang, tone, text)
        if ok:
            print(f"✅ [{i}/{len(tasks)}] {msg}")
            success += 1
        else:
            print(f"❌ [{i}/{len(tasks)}] {msg}")
            fail += 1
    
    print(f"\n{'=' * 50}")
    print(f"✅ Success: {success} | ❌ Failed: {fail}")
    print("=" * 50)

if __name__ == "__main__":
    asyncio.run(main())
