import {
  addWeeks,
  format,
  formatISO,
  getYear,
  isFuture,
  isValid,
  parse,
} from 'date-fns-jalali';
import { toEnDigits } from 'src/shared/digit-utils';

export function parseSnappDate(text: string): string | undefined {
  let parts = text.split(' ').reverse();
  let [month, day] = parts;
  let year = getYear(new Date());
  let date = parse(
    toEnDigits(`${day} ${month} ${year}`),
    'dd MMMM yyyy',
    new Date(),
  );
  if (!isValid(date)) {
    date = parse(parts[0], 'cccc', new Date());
    if (isFuture(date)) {
      date = addWeeks(date, -1);
    }
  }
  if (!isValid(date)) {
    date = parse(parts[1], 'cccc', new Date());
    if (isFuture(date)) {
      date = addWeeks(date, -1);
    }
  }
  if (!isValid(date)) {
    return undefined;
  }
  return formatISO(date, { representation: 'date' });
}

export function parseSnappDateTime(fDate: string, fTime: string) {
  const enDateTime = toEnDigits(fDate + ' ' + fTime);
  const value = parse(enDateTime, 'dd MMMM yyyy HH:mm', new Date());
  const date = formatISO(value, { representation: 'date' });
  const time = format(value, 'HH:mm');
  const datetime = `${date} ${time}`;
  return { date, time, datetime };
}
