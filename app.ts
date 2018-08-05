import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from './app/model/naming-strategy/snake-naming';

export default app => {
  app.beforeStart(async () => {
    // - 应用会等待这个函数执行完成才启动
    // - 初始化连接数据库
    app.connection = await createConnection({
      ...await getConnectionOptions(),
      namingStrategy: new SnakeNamingStrategy()
    });

    // - 也可以通过以下方式来调用 Service
    // - const ctx = app.createAnonymousContext();
    // - app.cities = await ctx.service.cities.load();
  });
};
