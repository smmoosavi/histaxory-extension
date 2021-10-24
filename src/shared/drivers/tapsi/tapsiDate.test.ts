import { parseTapsiDate } from './tapsiDate';

describe('snapp date', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should parse in the same year', () => {
    const str1 = 'شنبه - ۲۴ مهر ۱۴۰۰ | ۲۰:۵۱';
    const str2 = 'یکشنبه - ۲۱ شهریور ۱۴۰۰ | ۱۱:۱۰';
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 9 /* oct */, 24));
    const date1 = parseTapsiDate(str1);
    const date2 = parseTapsiDate(str2);
    expect(date1).toEqual({
      date: '2021-10-16',
      datetime: '2021-10-16 20:51',
      time: '20:51',
    });
    expect(date2).toEqual({
      date: '2021-09-12',
      datetime: '2021-09-12 11:10',
      time: '11:10',
    });
  });
});
