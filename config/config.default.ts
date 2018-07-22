import { EggAppConfig } from 'egg';
import { join } from 'path';
import { readFileSync } from 'fs';

export default (app: EggAppConfig) => {
  const exports: any = {};

  exports.cluster = {
    listen: {
      port: 7001,
      hostname: '127.0.0.1',
      // path: '/var/run/egg.sock',
    }
  };

  exports.siteFile = {
    '/favicon.ico': readFileSync(join(app.baseDir, 'app/web/assets/favicon.ico'))
  };

  exports.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    }
  };

  exports.static = {
    prefix: '/public/',
    dir: join(app.baseDir, 'public')
  };

  exports.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: 'auth',
      db: 0,
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

  exports.keys = app.name + '_123456';

  exports.middleware = [
    'access'
  ];

  return exports;
};
