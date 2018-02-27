"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {Egg.Application} app - egg application
 */
exports.default = (app) => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/server', controller.home.server);
};
