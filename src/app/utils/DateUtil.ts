export class DateUtil {
  private static yyyy_MM_dd_HH_mm_ss="yyyy-MM-dd HH:mm:ss";
  private static yyyy_MM_dd= "yyyy-MM-dd";
  private static yyyy_MM_dd_1= "yyyy/MM/dd";
  private static yyyyMMdd= "yyyyMMdd";
  private static HH_mm_ss= "HH:mm:ss";

  /**
   *  判断数据是否为空
   */
  public static isNull(data) {
    if (data == null || data == undefined || data == '') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 判断是否为日期
   * @param date 不支持yyyyMMdd格式
   * @returns {boolean}
   */
  public static isDate(date) {
    if (isNaN(date) && !isNaN(Date.parse(date))) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 获取当前日期
   * @returns {Date}
   */
  public static getNowDate() {
    return new Date();
  }

  /**
   * Date日期格式化
   * @param date
   * @param pattern 可为空，默认yyyy-MM-dd HH:mm:ss
   * @returns {string}
   */
  public static format(date:Date,pattern?:string) {
    let yy = date.getFullYear();      //年
    let mm = date.getMonth() + 1;     //月
    let dd = date.getDate();          //日
    let hh = date.getHours();         //时
    let ii = date.getMinutes();       //分
    let ss = date.getSeconds();       //秒

    let clock = yy + "-";
    if (mm < 10) clock += "0";
    clock += mm + "-";
    if (dd < 10) clock += "0";
    clock += dd + " ";
    if (hh < 10) clock += "0";
    clock += hh + ":";
    if (ii < 10) clock += '0';
    clock += ii + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    if (DateUtil.isNull(pattern) || pattern == this.yyyy_MM_dd_HH_mm_ss) {
      return clock;
    } else if (pattern == this.yyyy_MM_dd) {
      return clock.substring(0, 10);
    } else if (pattern == this.HH_mm_ss) {
      return clock.substring(11);
    } else if (pattern == this.yyyy_MM_dd_1) {
      return clock.substring(0, 10).replace(/-/g, '/');
    } else if (pattern == this.yyyyMMdd) {
      return clock.substring(0, 10).replace(/-/g, '');
    } else {
      return clock;
    }
  }

  /**
   * 得到一天的开始 date类型
   * @param date
   */
  public static getDateStart(date:Date) {
    let fmt = 'yyyy-MM-dd';
    let dateStartStr = this.getDateStartStr(date, fmt);
    return new Date(Date.parse(dateStartStr));
  }

  /**
   * 得到一天的开始 str 类型
   * @param date
   * @param fmt
   */
  public static getDateStartStr(date, fmt) {
    if (typeof fmt == 'undefined') {
      fmt = 'yyyy-MM-dd';
    }
    let dateStr = this.format(date, fmt);
    dateStr += ' 00:00:00';
    return dateStr;
  }

  /**
   * 得到一天的结束 date类型
   * @param date
   */
  public static getDateEnd(date) {
    let fmt = 'yyyy-MM-dd';
    let dateEndStr = this.getDateEndStr(date, fmt);
    return new Date(Date.parse(dateEndStr));
  }

  /**
   * 得到一天的结束 str 类型
   * @param date
   * @param fmt
   */
  public static getDateEndStr(date,fmt) {
    if (typeof fmt == 'undefined') {
      fmt = 'yyyy-MM-dd';
    }
    let endStr = this.format(date, fmt);
    endStr += ' 23:59:59';
    return endStr;
  }

  /**
   * 获取本周开始日期
   * @returns {*|string}
   */
  public static getWeekStartDay() {
    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1);
    return DateUtil.format(date,DateUtil.yyyy_MM_dd);
  }

  /**
   * 获取本周结束日期
   * @returns {*|string}
   */
  public static getWeekEndDay() {
    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - now.getDay()));
    return DateUtil.format(date,DateUtil.yyyy_MM_dd);
  }

  /**
   * 两个时间比较大小
   * @param d1
   * @param d2
   * @returns {1:d1 > d2,0: d1 = d2 ,-1:d1 < d2}
   */
  public static compareDate(d1:Date,d2:Date) {
    if (d1 && d2) {
      if (d1.getTime() > d2.getTime()) {
        return 1;
      } else if (d1.getTime() == d2.getTime()) {
        return 0;
      } else if (d1.getTime() < d2.getTime()) {
        return -1;
      }
    }
  }
}
