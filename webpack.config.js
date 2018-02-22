'use strict';
const path = require('path');
module.exports = {
  egg: true,
  framework: 'vue',
  entry: {
    include: ['app/web/page'],
    exclude: ['app/web/page/[a-z]+/components'],
    loader: {
      client: 'app/web/framework/vue/entry/client-loader.js',
      server: 'app/web/framework/vue/entry/server-loader.js',
    }
  },
  alias: {
    '~': __dirname,
    app: 'app/web/framework/vue',
    server: 'app/web/framework/vue/entry/server.js',
    client: 'app/web/framework/vue/entry/client.js',
    assets: 'app/web/assets',
    store: 'app/web/store',
    router: 'app/web/router',
    components: 'app/web/components',
    framework: 'app/web/framework',
    vue: 'vue/dist/vue.esm.js'
  },
  dll: ['vue', 'axios'],
  loaders: {},
  plugins: {},
  done() {

  }
};
