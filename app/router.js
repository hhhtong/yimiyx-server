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
    router.get('/supplier', controller.supplier.index);
    router.post('/supplier/add', controller.supplier.add);
    router.post('/supplier/delete', controller.supplier.delete);
    router.post('/supplier/update', controller.supplier.update);
    /**
     * CategoryController
     */
    router.get('/goodsCategory', controller.goodsCategory.index);
    router.post('/goodsCategory/add', controller.goodsCategory.add);
    router.post('/goodsCategory/delete', controller.goodsCategory.delete);
    router.post('/goodsCategory/update', controller.goodsCategory.update);
    /**
     * Controller
     */
    router.get('/goods', controller.goods.index);
    router.post('/goods/add', controller.goods.add);
    router.post('/goods/delete', controller.goods.delete);
    router.post('/goods/update', controller.goods.update);
};
