#!/usr/bin/env node
/**
 * NOKK Audio Generator using Google Translate TTS (free, no API key)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'audio');

const LANG_CODES = {
  en: 'en',
  ko: 'ko', 
  ja: 'ja',
  es: 'es',
};

const PHRASES = {
  delivery_leave_door: { en: 'Leave it at the door.', ko: '문 앞에 놔두세요.', ja: 'ドアの前に置いてください。', es: 'Déjalo en la puerta.' },
  delivery_put_down: { en: 'Just put it down there.', ko: '거기 내려놓으세요.', ja: 'そこに置いてください。', es: 'Ponlo ahí.' },
  delivery_thanks: { en: 'Thanks, I got it.', ko: '감사합니다, 받았어요.', ja: 'ありがとう、受け取りました。', es: 'Gracias, lo tengo.' },
  delivery_gate: { en: 'Leave it by the gate.', ko: '대문 앞에 놔두세요.', ja: '門の前に置いてください。', es: 'Déjalo en la entrada.' },
  delivery_pickup: { en: "I'll pick it up in a minute.", ko: '잠시 후에 가져갈게요.', ja: 'すぐ取りに行きます。', es: 'Lo recogeré en un momento.' },
  unknown_who: { en: 'Who is it?', ko: '누구세요?', ja: 'どちら様ですか？', es: '¿Quién es?' },
  unknown_not_expecting: { en: "I'm not expecting anyone.", ko: '약속한 사람 없는데요.', ja: '誰も待っていません。', es: 'No espero a nadie.' },
  unknown_what_want: { en: 'What do you want?', ko: '무슨 일이세요?', ja: '何のご用ですか？', es: '¿Qué quiere?' },
  unknown_not_interested: { en: "We're not interested.", ko: '관심 없습니다.', ja: '興味ありません。', es: 'No estamos interesados.' },
  unknown_come_back: { en: 'Come back later.', ko: '나중에 다시 오세요.', ja: 'また後で来てください。', es: 'Vuelva más tarde.' },
  unknown_busy: { en: "I'm busy right now.", ko: '지금 바빠요.', ja: '今忙しいです。', es: 'Estoy ocupado ahora.' },
  threat_calling_police: { en: "I'm calling the police.", ko: '경찰에 신고하겠습니다.', ja: '警察を呼びます。', es: 'Voy a llamar a la policía.' },
  threat_get_away: { en: 'Get away from my door!', ko: '문에서 떨어지세요!', ja: 'ドアから離れてください！', es: '¡Aléjese de mi puerta!' },
  threat_camera: { en: "I've got a camera recording you.", ko: '카메라로 녹화 중입니다.', ja: 'カメラで録画しています。', es: 'Tengo una cámara grabándote.' },
  threat_security: { en: 'Leave now or I call security.', ko: '당장 떠나세요, 안 그러면 경비실에 연락합니다.', ja: '今すぐ立ち去らないと警備員を呼びます。', es: 'Váyase ahora o llamo a seguridad.' },
  threat_armed: { en: "I'm armed and I will defend myself.", ko: '무장하고 있고, 자기 방어할 겁니다.', ja: '武装しています。自己防衛します。', es: 'Estoy armado y me defenderé.' },
  threat_neighbors: { en: 'My neighbors are watching.', ko: '이웃들이 보고 있어요.', ja: '隣人が見ています。', es: 'Mis vecinos están mirando.' },
  night_late: { en: "It's late. What do you want?", ko: '늦었는데, 무슨 일이세요?', ja: '遅いですね。何のご用ですか？', es: 'Es tarde. ¿Qué quiere?' },
  night_sleeping: { en: "We're sleeping. Go away.", ko: '자고 있어요. 가세요.', ja: '寝ています。帰ってください。', es: 'Estamos durmiendo. Váyase.' },
  night_tomorrow: { en: 'Come back tomorrow.', ko: '내일 다시 오세요.', ja: '明日また来てください。', es: 'Vuelva mañana.' },
  night_time: { en: 'Do you know what time it is?', ko: '지금 몇 시인지 알아요?', ja: '今何時か分かっていますか？', es: '¿Sabe qué hora es?' },
  general_coming: { en: "Hold on, I'm coming.", ko: '잠깐만요, 갑니다.', ja: 'ちょっと待って、今行きます。', es: 'Espere, ya voy.' },
  general_second: { en: 'Give me a second.', ko: '잠시만 기다려요.', ja: '少々お待ちください。', es: 'Un momento.' },
  general_yes: { en: 'Yes?', ko: '네?', ja: 'はい？', es: '¿Sí?' },
  general_whos_there: { en: "Who's there?", ko: '거기 누구세요?', ja: 'そこにいるのは誰？', es: '¿Quién está ahí?' },
};

// Google Translate TTS doesn't support tones, so we'll create same file for all tones
const TONES = ['normal', 'firm', 'angry'];

function downloadTTS(text, lang, outputPath) {
  return new Promise((resolve, reject) => {
    const encodedText = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encodedText}`;

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/',
      },
    };

    https.get(url, options, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        https.get(response.headers.location, options, (res) => {
          handleResponse(res, outputPath, resolve, reject);
        }).on('error', reject);
      } else {
        handleResponse(response, outputPath, resolve, reject);
      }
    }).on('error', reject);
  });
}

function handleResponse(response, outputPath, resolve, reject) {
  if (response.statusCode !== 200) {
    reject(new Error(`HTTP ${response.statusCode}`));
    return;
  }

  const chunks = [];
  response.on('data', (chunk) => chunks.push(chunk));
  response.on('end', () => {
    fs.writeFileSync(outputPath, Buffer.concat(chunks));
    resolve(true);
  });
  response.on('error', reject);
}

async function main() {
  console.log('='.repeat(60));
  console.log('🎙️  NOKK Audio Generator (Google Translate TTS)');
  console.log('='.repeat(60));

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Build task list
  const tasks = [];
  for (const [phraseId, translations] of Object.entries(PHRASES)) {
    for (const [lang, text] of Object.entries(translations)) {
      for (const tone of TONES) {
        tasks.push({ phraseId, lang, text, tone });
      }
    }
  }

  console.log(`📊 Total: ${tasks.length} files\n`);

  let success = 0, fail = 0, skipped = 0;
  const generated = new Set(); // Track already generated lang+phrase combos

  for (let i = 0; i < tasks.length; i++) {
    const { phraseId, lang, text, tone } = tasks[i];
    const filename = `${phraseId}_${lang}_${tone}.mp3`;
    const filepath = path.join(OUTPUT_DIR, filename);
    const baseKey = `${phraseId}_${lang}`;

    // For Google TTS, we download once per phrase/lang and copy for other tones
    if (generated.has(baseKey)) {
      // Copy from normal tone
      const sourcePath = path.join(OUTPUT_DIR, `${phraseId}_${lang}_normal.mp3`);
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, filepath);
        console.log(`📋 [${i + 1}/${tasks.length}] ${filename} (copied)`);
        success++;
      } else {
        console.log(`⏭️  [${i + 1}/${tasks.length}] ${filename} (skipped)`);
        skipped++;
      }
      continue;
    }

    try {
      await downloadTTS(text, LANG_CODES[lang], filepath);
      console.log(`✅ [${i + 1}/${tasks.length}] ${filename}`);
      success++;
      generated.add(baseKey);
    } catch (err) {
      console.log(`❌ [${i + 1}/${tasks.length}] ${filename}: ${err.message}`);
      fail++;
    }

    // Delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Success: ${success} | ❌ Failed: ${fail} | ⏭️ Skipped: ${skipped}`);
  console.log('='.repeat(60));
}

main().catch(console.error);
