# @shotlingo/text-expansion

> Translation length expansion ratios for App Store screenshot localization.

Predicts how long a piece of UI copy will be after translating from English
into 40+ target languages. Useful for sizing buttons, headlines, and
screenshot text overlays so layouts don't break post-translation.

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
// { iso: 'de', length: 65 }  ← German blows the layout

ratioFor('ar');
// { iso: 'ar', name: 'Arabic', charPct: 25, widthPct: 30, rtl: true }
```

## Why this exists

Indie iOS/Android devs ship English-only screenshots and then later realize
German overflows their buttons by 35% and Chinese feels cramped on the same
width because per-glyph spacing is different. Standard "translation
expansion" tables on the internet are vague (e.g., "German is ~30% longer")
without accounting for **rendered width** vs **character count** — they're
different things for CJK.

These ratios are derived from real localized screenshot pairs in the
[Shotlingo](https://shotlingo.com) dataset, where text is rendered into
actual screenshot frames across 40+ languages.

For the interactive version with side-by-side visualization, see:
[shotlingo.com/tools/text-expansion-calculator](https://shotlingo.com/tools/text-expansion-calculator)

## License

MIT © [Alperen Güntekin](https://shotlingo.com)
