// Text expansion ratios per target language for App Store / Google Play
// screenshot localization. Numbers are derived from real localized screenshot
// pairs in the Shotlingo dataset (https://shotlingo.com).
//
// charPct: expected character-count change vs the EN source (+35 means German
//          text is ~35% LONGER on average; -45 means Japanese is ~45% SHORTER).
// widthPct: expected RENDERED-WIDTH change at the same font size — this matters
//          more for layout because CJK glyphs are wider per character even when
//          the count drops.

export const EXPANSION = [
  { iso: 'ja',      name: 'Japanese',              charPct: -45, widthPct:  5, rtl: false },
  { iso: 'de',      name: 'German',                charPct:  35, widthPct: 35, rtl: false },
  { iso: 'es',      name: 'Spanish',               charPct:  25, widthPct: 25, rtl: false },
  { iso: 'fr',      name: 'French',                charPct:  20, widthPct: 20, rtl: false },
  { iso: 'ko',      name: 'Korean',                charPct: -40, widthPct:  5, rtl: false },
  { iso: 'zh-Hans', name: 'Chinese (Simplified)',  charPct: -50, widthPct:  0, rtl: false },
  { iso: 'zh-Hant', name: 'Chinese (Traditional)', charPct: -50, widthPct:  0, rtl: false },
  { iso: 'ar',      name: 'Arabic',                charPct:  25, widthPct: 30, rtl: true  },
  { iso: 'pt-BR',   name: 'Portuguese (Brazil)',   charPct:  30, widthPct: 30, rtl: false },
  { iso: 'pt-PT',   name: 'Portuguese (Portugal)', charPct:  30, widthPct: 30, rtl: false },
  { iso: 'ru',      name: 'Russian',               charPct:  15, widthPct: 15, rtl: false },
  { iso: 'it',      name: 'Italian',               charPct:  20, widthPct: 20, rtl: false },
  { iso: 'nl',      name: 'Dutch',                 charPct:  20, widthPct: 20, rtl: false },
  { iso: 'pl',      name: 'Polish',                charPct:  30, widthPct: 30, rtl: false },
  { iso: 'tr',      name: 'Turkish',               charPct:  20, widthPct: 20, rtl: false },
  { iso: 'hi',      name: 'Hindi',                 charPct:  10, widthPct: 15, rtl: false },
  { iso: 'th',      name: 'Thai',                  charPct:  -5, widthPct:  0, rtl: false },
  { iso: 'vi',      name: 'Vietnamese',            charPct:  20, widthPct: 20, rtl: false },
  { iso: 'id',      name: 'Indonesian',            charPct:  15, widthPct: 15, rtl: false },
  { iso: 'ms',      name: 'Malay',                 charPct:  15, widthPct: 15, rtl: false },
  { iso: 'sv',      name: 'Swedish',               charPct:  25, widthPct: 25, rtl: false },
  { iso: 'no',      name: 'Norwegian',             charPct:  20, widthPct: 20, rtl: false },
  { iso: 'da',      name: 'Danish',                charPct:  20, widthPct: 20, rtl: false },
  { iso: 'fi',      name: 'Finnish',               charPct:  30, widthPct: 30, rtl: false },
  { iso: 'el',      name: 'Greek',                 charPct:  20, widthPct: 20, rtl: false },
  { iso: 'he',      name: 'Hebrew',                charPct:   0, widthPct:  5, rtl: true  },
  { iso: 'cs',      name: 'Czech',                 charPct:  25, widthPct: 25, rtl: false },
  { iso: 'sk',      name: 'Slovak',                charPct:  25, widthPct: 25, rtl: false },
  { iso: 'hu',      name: 'Hungarian',             charPct:  30, widthPct: 30, rtl: false },
  { iso: 'ro',      name: 'Romanian',              charPct:  20, widthPct: 20, rtl: false },
  { iso: 'uk',      name: 'Ukrainian',             charPct:  20, widthPct: 20, rtl: false },
  { iso: 'ca',      name: 'Catalan',               charPct:  20, widthPct: 20, rtl: false },
  { iso: 'bg',      name: 'Bulgarian',             charPct:  20, widthPct: 20, rtl: false },
  { iso: 'hr',      name: 'Croatian',              charPct:  25, widthPct: 25, rtl: false },
  { iso: 'sr',      name: 'Serbian',               charPct:  25, widthPct: 25, rtl: false },
  { iso: 'sl',      name: 'Slovenian',             charPct:  25, widthPct: 25, rtl: false },
  { iso: 'lt',      name: 'Lithuanian',            charPct:  25, widthPct: 25, rtl: false },
  { iso: 'lv',      name: 'Latvian',               charPct:  20, widthPct: 20, rtl: false },
  { iso: 'et',      name: 'Estonian',              charPct:  25, widthPct: 25, rtl: false },
  { iso: 'fa',      name: 'Persian (Farsi)',       charPct:  25, widthPct: 30, rtl: true  },
  { iso: 'ur',      name: 'Urdu',                  charPct:  20, widthPct: 30, rtl: true  },
];

const INDEX = new Map(EXPANSION.map((e) => [e.iso, e]));

export function ratioFor(iso) {
  return INDEX.get(iso) || null;
}

export function estimateChars(text, toIso) {
  const e = INDEX.get(toIso);
  if (!e) return null;
  return Math.round(text.length * (1 + e.charPct / 100));
}

export function estimateWidth(text, toIso) {
  const e = INDEX.get(toIso);
  if (!e) return null;
  // Same font size assumption — widthPct is the visual width multiplier
  // that accounts for both character count change AND per-glyph width
  // (matters for CJK where char count drops but glyph width grows).
  return Math.round(text.length * (1 + e.widthPct / 100));
}

export function worstExpansion(text, isoList) {
  let worst = { iso: null, length: text.length };
  for (const iso of isoList) {
    const len = estimateChars(text, iso);
    if (len !== null && len > worst.length) worst = { iso, length: len };
  }
  return worst;
}

export default EXPANSION;
