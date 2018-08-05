import * as moment from 'moment';
import { camelCase, snakeCase } from 'typeorm/util/StringUtils';
import * as crypto from 'crypto';

export interface IObj {
  obj: Object | Object[]
}

const transformObjKey = (obj: IObj, fn: Function): Object | Object[] => {
  if (Array.isArray(obj)) {
    return obj.map(item => transform(item));
  } else {
    return transform(obj);
  }

  function transform(_obj) {
    const newObj = {};
    Object.keys(_obj).map(key => {
      newObj[fn(key)] = _obj[key];
    })
    return newObj;
  }
}

export default {
  moment,
  toCamelObj(obj: IObj): Object | Object[] { // 将Object内的key转为小驼峰命名
    return transformObjKey(obj, (key: string) => camelCase(key).replace(/Id$/, 'ID'));
  },
  toSnakeObj(obj: IObj): Object | Object[] { // 将Object内的key转为下划线分割命名
    return transformObjKey(obj, snakeCase);
  },
  transformDateRange(dateRange: string[]): string[] {
    return [`${dateRange[0]} 00:00:00`, `${dateRange[1]} 23:59:59`];
  },
  encryptSha1(str: string) {
    return crypto.createHash('sha1').update(str, 'utf8').digest('hex');
  },
  prefixZero(num: string | number, len: number): string {
    // this 是 helper 对象，在其中可以调用其他 helper 方法
    // this.ctx => context 对象
    // this.app => application 对象
    num = (num).toString();
    len = len - num.length;
    for (let i = 0; i < len; i++) {
      num = `0${num}`;
    }
    return num;
  },
  //随机ID
  uuid(len: number, radix: number): string {
    let chars: string[] = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid: string[] = [];
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      // rfc4122, version 4 form
      let r: number;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  }
}
