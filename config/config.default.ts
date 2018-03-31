import { Application, EggAppConfig } from 'egg';
import { join } from 'path';
// import { readFileSync } from 'fs';

export default (app: EggAppConfig) => {
  const exports: any = {};

  // exports.siteFile = {
  //   '/favicon.ico': readFileSync(join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  // };

  exports.cluster = {
    listen: {
      port: 7001,
      hostname: '127.0.0.1',
      // path: '/var/run/egg.sock',
    }
  };

  exports.security = {
    csrf: {
      ignoreJSON: false, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    }
  };

  exports.view = {
    cache: false
  };

  exports.vuessr = {
    layout: join(app.baseDir, 'app/web/template/layout.html')
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = [
    'access'
  ];

  return exports;
};
