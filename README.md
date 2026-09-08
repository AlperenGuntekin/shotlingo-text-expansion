# @shotlingo/text-expansion

[![npm version](https://img.shields.io/npm/v/@shotlingo/text-expansion.svg)](https://www.npmjs.com/package/@shotlingo/text-expansion)
[![npm downloads](https://img.shields.io/npm/dm/@shotlingo/text-expansion.svg)](https://www.npmjs.com/package/@shotlingo/text-expansion)
[![license](https://img.shields.io/npm/l/@shotlingo/text-expansion.svg)](https://github.com/AlperenGuntekin/shotlingo-text-expansion/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/AlperenGuntekin/shotlingo-text-expansion.svg?style=social)](https://github.com/AlperenGuntekin/shotlingo-text-expansion)

> Translation length expansion ratios for App Store screenshot localization.

Predicts how long a piece of UI copy will be after translating from English
into 40+ target languages. Useful for sizing buttons, headlines, and
screenshot text overlays so layouts don't break post-translation.

Ratios are derived from real localized screenshot pairs in the
[Shotlingo](https://shotlingo.com) dataset — text rendered into actual
screenshot frames across 40+ App Store languages, not synthesized from a
single dictionary.

## Install

```bash
npm install @shotlingo/text-expansion
```

## Usage

```js
import {
  EXPANSION,
  ratioFor,
  estimateChars,
  estimateWidth,
  worstExpansion,
} from '@shotlingo/text-expansion';

const en = 'Design stunning app store screenshots in minutes';

estimateChars(en, 'de');
// 65  ← German is ~35% longer

estimateChars(en, 'ja');
// 26  ← Japanese is ~45% shorter

estimateWidth(en, 'zh-Hans');
// 48  ← Chinese: fewer chars but ~same rendered width

worstExpansion(en, ['de', 'fr', 'ja', 'ar']);
// { iso: 'de', length: 65 }  ← German blows the layout — size for this

ratioFor('ar');
// { iso: 'ar', name: 'Arabic', charPct: 25, widthPct: 30, rtl: true }
```

### Use in a layout-budget check at build time

```js
// At build time: warn if any UI string would overflow in any shipped language.
import { worstExpansion } from '@shotlingo/text-expansion';

const SHIPPED_LOCALES = ['en', 'de', 'fr', 'es', 'ja', 'zh-Hans', 'ar'];

for (const [key, en] of Object.entries(STRINGS_EN)) {
  const worst = worstExpansion(en, SHIPPED_LOCALES);
  if (worst.length > MAX_BUTTON_WIDTH_CHARS) {
    console.warn(`"${key}" overflows in ${worst.iso} (${worst.length} chars)`);
  }
}
```

## Companion tool

[**Text Expansion Calculator (Shotlingo)**](https://shotlingo.com/tools/text-expansion-calculator) —
paste English copy, see side-by-side per-locale length + visual width per
target language. Same dataset, but visual instead of programmatic.

[Shotlingo](https://shotlingo.com) localizes App Store screenshots into 40+
languages and auto-sizes text overlays so this kind of overflow never ships.

## See also

- [`@shotlingo/locale-codes`](https://www.npmjs.com/package/@shotlingo/locale-codes) — App Store + Play Store locale codes for 40+ supported languages.
- [`@shotlingo/screenshot-sizes`](https://www.npmjs.com/package/@shotlingo/screenshot-sizes) — current App Store + Google Play screenshot dimensions per device class (2026).

## Related tools

- [Text expansion calculator](https://shotlingo.com/tools/text-expansion-calculator) — paste English copy, see per-locale length + visual width side by side.
- [App Store locale codes lookup](https://shotlingo.com/tools/app-store-locale-codes) — the locale dataset behind these expansion ratios.

## License

MIT © [Alperen Güntekin](https://shotlingo.com)

---

<sub>Made by [App Store localization checker](https://shotlingo.com) — Shotlingo, App Store screenshot localization for 40+ languages.</sub>
