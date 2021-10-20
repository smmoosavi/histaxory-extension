import { parseSnappDate } from './snappDate';

describe('snapp date', () => {
  it('should parse in the same year', () => {
    const date0 = parseSnappDate('سفر صبح چهارشنبه 8 اردیبهشت');
    const date1 = parseSnappDate('سفر صبح چهارشنبه ۸ اردیبهشت');
    // const date2 = parseSnappDate(
    //   'سفر لغو شده توسط راننده، صبح چهارشنبه ۸ اردیبهشت',
    // );
    // const date3 = parseSnappDate(
    //   'سفر لغو شده توسط شما، شنبه بعدازظهر ۲۱ فروردین',
    // );
    console.log(date0);
    console.log(date1);
    // console.log(date2);
    // console.log(date3);
  });
});
