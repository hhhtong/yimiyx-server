import { createConnection, getConnectionOptions } from 'typeorm'
import { SnakeNamingStrategy } from './app/model/naming-strategy/snake-naming'

export default app => {
  app.beforeStart(async () => {
    // - 应用会等待这个函数执行完成才启动
    // - 初始化连接数据库
    app.connection = await createConnection({
      ...await getConnectionOptions(),
      namingStrategy: new SnakeNamingStrategy()
    })

    // - 也可以通过以下方式来调用 Service
    // - const ctx = app.createAnonymousContext();
    // - app.cities = await ctx.service.cities.load();
  })

  // set redis session store
  // session store must have 3 methods
  // define sessionStore in `app.js` so you can access `app.redis`
  app.sessionStore = {
    async get (key: string): Promise<any> {
      const res = await app.redis.get(key)
      if (!res) return null
      return JSON.parse(res)
    },

    async set (key: string, value: string, maxAge: number): Promise<void> {
      // maxAge not present means session cookies
      // we can't exactly know the maxAge and just set an appropriate value like one day
      if (!maxAge) maxAge = 24 * 60 * 60 * 1000
      value = JSON.stringify(value)
      await app.redis.set(key, value, 'PX', maxAge)
    },

    async destroy (key: string): Promise<void> {
      await app.redis.del(key)
    }
  }
}
