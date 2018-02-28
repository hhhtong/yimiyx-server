"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {Egg.Application} app - egg application
 */
exports.default = (app) => {
    const { router, controller } = app;
    /**
     * HomeController
     */
    router.get('/', controller.home.index);
    router.get('/server', controller.home.server);
    /**
     * SupplierController
     */
    router.post('/supplier/add', controller.supplier.add);
    router.post('/supplier/delete', controller.supplier.delete);
    router.post('/supplier/update', controller.supplier.update);
};
