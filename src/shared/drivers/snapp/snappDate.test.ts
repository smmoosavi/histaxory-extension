import { parseSnappDate, parseSnappDateTime } from './snappDate';

describe('snapp date', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should parse in the same year', () => {
    const str1 = 'سفر صبح چهارشنبه ۸ اردیبهشت';
    const str2 = 'سفر لغو شده توسط راننده، صبح چهارشنبه ۸ اردیبهشت';
    const str3 = 'سفر لغو شده توسط شما، شنبه بعدازظهر ۲۱ فروردین';
    const str4 = 'سفر صبح دوشنبه';
    const str5 = 'سفر چهارشنبه شب';
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 9 /* oct */, 24));
    const date1 = parseSnappDate(str1);
    const date2 = parseSnappDate(str2);
    const date3 = parseSnappDate(str3);
    const date4 = parseSnappDate(str4);
    const date5 = parseSnappDate(str5);
    expect(date1).toBe('2021-04-28');
    expect(date2).toBe('2021-04-28');
    expect(date3).toBe('2021-04-10');
    expect(date4).toBe('2021-10-18');
    expect(date5).toBe('2021-10-20');
  });
  it('should parse date time', function () {
    const date = '۲۷ دی ۱۴۰۰';
    const time = '۱۱:۲۲';
    const parsedDate = parseSnappDateTime(date, time);
    expect(parsedDate).toEqual({
      date: '2022-01-17',
      datetime: '2022-01-17 11:22',
      time: '11:22',
    });
  });
});
