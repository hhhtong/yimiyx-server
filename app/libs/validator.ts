/**
 * 验证电话号码（手机号码+电话号码）
 * @param obj
 * @returns {Boolean}
 */
export function checkMobile(mobile: string) {
  return /^((\d{3}-\d{8}|\d{4}-\d{7,8})|(1[3|5|7|8][0-9]{9}))$/.test(mobile)
}

/**
 * 验证税号
 * 15或者17或者18或者20位字母、数字组成
 * @param taxNo
 * @returns {Boolean}
 */
export function checkTaxNo(taxNo: string) {
  return /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(taxNo)
}

/**
 * 验证用户名输入格式，4到16位（字母，数字，下划线，减号）
 * @param userName
 * @returns {Boolean}
 */
export function checkUserName(userName: string) {
  return /^[a-zA-Z0-9_-]{4,16}$/.test(userName)
}

/**
 * 验证密码规则，8-18位数字字母组合
 * @param password
 * @returns {Boolean}
 */
export function checkPassword(password: string) {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(password)
}

/**
 * 验证大陆的身份证号
 * 验证身份证号
 * 身份证号码为15位或18位的全数字，或者18位时前17位是数字，最后一位是校验位，可能是数字或字符X或x
 * @param obj
 */
export function checkIdCard(obj: string) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(obj)
}

/**
 * 验证港澳台身份证
 * @param obj
 */
export function checkGATIdCard(obj: string) {
  const reg1 = /^[A-Z]{1,2}[0-9]{6}[\(|\（]?[0-9A-Z][\)|\）]?$/ // 香港格式1 (香港身份证号码结构：XYabcdef(z))
  const reg2 = /^[A-Z][0-9]{8,12}$/ // 香港格式2 (H60152555)
  const reg3 = /^[1|5|7][0-9]{6}[\(|\（]?[0-9A-Z][\)|\）]?$/ // 澳门,8位数,不包含出生年月 格式为 xxxxxxx(x) 注:x全为数字,无英文字母 首位数只有1、5、7字开头的
  const reg4 = /^[a-zA-Z][0-9]{9}$/ // 台湾:10位字母和数字

  if (reg1.test(obj) || reg2.test(obj) || reg3.test(obj) || reg4.test(obj)) {
    return true
  }
  return false
}
