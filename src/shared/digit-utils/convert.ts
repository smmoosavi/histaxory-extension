const dict: Record<string, string> = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
};
const faDigitsRegex = /[۰۱۲۳۴۵۶۷۸۹]/g;
export function toEnDigits(s: string) {
  return s.replace(faDigitsRegex, (d) => dict[d]);
}
