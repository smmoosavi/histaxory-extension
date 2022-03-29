import { format, formatISO, parse } from 'date-fns-jalali';
import { toEnDigits } from 'src/shared/digit-utils';

export function parseTapsiDate(s: string) {
  let datetimeStr = s.split(' - ')[1].replace(' | ', ' ');
  let enDatetimeStr = toEnDigits(datetimeStr);
  const value = parse(enDatetimeStr, 'dd MMMM yyyy HH:mm', new Date());
  const date = formatISO(value, { representation: 'date' });
  const time = format(value, 'HH:mm');
  const datetime = `${date} ${time}`;
  return { date, time, datetime };
}
