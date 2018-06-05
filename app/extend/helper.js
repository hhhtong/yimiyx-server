"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateFormat_1 = require("../../libs/tools/dateFormat");
const StringUtils_1 = require("typeorm/util/StringUtils");
const transformObjKey = (obj, fn) => {
    if (Array.isArray(obj)) {
        return obj.map(item => transform(item));
    }
    else {
        return transform(obj);
    }
    function transform(_obj) {
        const newObj = {};
        Object.keys(_obj).map(key => {
            newObj[fn(key)] = _obj[key];
        });
        return newObj;
    }
};
exports.default = {
    dateFormat: dateFormat_1.default,
    toCamelObj(obj) {
        return transformObjKey(obj, (key) => StringUtils_1.camelCase(key).replace(/Id$/, 'ID'));
    },
    toSnakeObj(obj) {
        return transformObjKey(obj, StringUtils_1.snakeCase);
    },
    prefixZero(num, len) {
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
    uuid(len, radix) {
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++)
                uuid[i] = chars[0 | Math.random() * radix];
        }
        else {
            // rfc4122, version 4 form
            let r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }
};
//# sourceMappingURL=helper.js.map