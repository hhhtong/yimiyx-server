import { Application } from 'egg';

/**
 * @param {Egg.Application} app - egg application
 */
export default (app: Application) => {
  const { router, controller } = app;

  // - TestController
  router.get('/test', controller.test.index);

  // - HomeController
  router.get('/', controller.home.index);
  router.get('/server', controller.home.server);

  // - SupplierController
  router.get('/supplier', controller.supplier.index);
  router.post('/supplier/add', controller.supplier.add);
  router.post('/supplier/delete', controller.supplier.delete);
  router.post('/supplier/update', controller.supplier.update);

  // - GoodsCategoryController
  router.get('/goodsCategory', controller.goodsCategory.index);
  router.post('/goodsCategory/delete', controller.goodsCategory.delete);
  router.post('/goodsCategory/save', controller.goodsCategory.save);

  // - GoodsController
  router.get('/goods', controller.goods.index);
  router.post('/goods/save', controller.goods.save);
  router.post('/goods/delete', controller.goods.delete);
  router.post('/goods/uploadImg', controller.goods.uploadImg);
  router.post('/goods/saveDesc', controller.goods.saveDesc);
  router.post('/goods/toggleStatus', controller.goods.toggleStatus);

  // - Client/GoodsController
  router.get('/client/goods', controller.client.goods.index);

  // - PurchaseOrderController
  router.get('/purchaseOrder', controller.purchaseOrder.index);
  router.post('/purchaseOrder/add', controller.purchaseOrder.add);
  router.post('/purchaseOrder/delete', controller.purchaseOrder.delete);
  router.post('/purchaseOrder/update', controller.purchaseOrder.update);
  router.get('/purchaseOrder/details', controller.purchaseOrder.details);
};
