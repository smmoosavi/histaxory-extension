import { formatISO, getYear, parse } from 'date-fns-jalali';

export function parseSnappDate(text: string): string {
  let [month, day] = text.split(' ').reverse();
  let year = getYear(new Date());
  console.log(`${day} ${month} ${year}`)
  let date = parse(`${day} ${month} ${year}`,"dd MMMM yyyy",new Date());
  return formatISO(date, {representation: 'date'});
}
