import { join } from 'path';

exports.static = true;

exports.vuessr = {
  enable: true,
  package: 'egg-view-vue-ssr'
};

// exports.typeorm = {
//   enable: true,
//   path: join(__dirname, '../libs/plugin/egg-typeorm')
// };
