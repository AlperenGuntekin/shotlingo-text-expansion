export interface ExpansionRatio {
  iso: string;
  name: string;
  charPct: number;
  widthPct: number;
  rtl: boolean;
}

export const EXPANSION: ExpansionRatio[];
export function ratioFor(iso: string): ExpansionRatio | null;
export function estimateChars(text: string, toIso: string): number | null;
export function estimateWidth(text: string, toIso: string): number | null;
export function worstExpansion(text: string, isoList: string[]): { iso: string | null; length: number };

declare const _default: ExpansionRatio[];
export default _default;
