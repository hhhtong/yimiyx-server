import { join } from 'path';
import * as moment from 'moment';
import * as QRCode from 'qrcode';
import * as fs from 'fs-extra';
import { Application } from 'egg';

export default {
  // - 生成二维码
  async generateQRCode(code: string, options?: Object): Promise<string> {
    const fileName = `${code}.png`;
    // - 存储路径按日期归类：public/upload/qrcode/2018_06_06/CG2018060523133306BCW2.png
    const saveDir = join(
      (this as Application).config.baseDir,
      'public/upload/qrcode',
      moment().format('YYYY_MM_DD')
    );

    if (!options) {
      options = { width: 280, margin: 1.5 }
    }

    try {
      await fs.ensureDir(saveDir); // - 确保该目录存在，否则创建一个
      await QRCode.toFile(join(saveDir, fileName), code, options);
      return Promise.resolve(`Create QRCode:${code}`);
    } catch (err) {
      return Promise.reject(`Error: Write File failed ${err.message}`);
    }
  }
}