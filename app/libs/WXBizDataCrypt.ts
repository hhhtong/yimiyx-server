import * as crypto from 'crypto'

class WXBizDataCrypt {

  readonly appId: string;
  readonly sessionKey: string;

  constructor(appId: string, sessionKey: string) {
    this.appId = appId;
    this.sessionKey = sessionKey;
  }

  decryptData(_encryptedData: string, _iv: string) {
    // base64 decode
    const sessionKey: Buffer = new Buffer(this.sessionKey, 'base64');
    const encryptedData: Buffer = new Buffer(_encryptedData, 'base64');
    const iv: Buffer = new Buffer(_iv, 'base64');
    let decoded: any;

    try {
      // 解密
      let decipher: any = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      decoded = JSON.parse(decoded);
    } catch (err) {
      throw new Error('Illegal Buffer');
    }

    if (decoded.watermark.appid !== this.appId) {
      throw new Error('Illegal Buffer');
    }

    return decoded;
  }
}

export default WXBizDataCrypt;
