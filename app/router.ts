import { Application } from 'egg'

/**
 * @param {Egg.Application} app - egg application
 */
export default (app: Application) => {
  const { router, controller } = app

  // - TestController
  router.get('/test', controller.test.index)

  // -------------------------------------------------------------------------
  // Admin Controller
  // -------------------------------------------------------------------------

  // - Admin/HomeController
  router.get('/', controller.admin.home.index)

  // - Admin/SupplierController
  router.get('/api/supplier', controller.admin.supplier.index)
  router.post('/api/supplier/add', controller.admin.supplier.add)
  router.post('/api/supplier/delete', controller.admin.supplier.delete)
  router.post('/api/supplier/update', controller.admin.supplier.update)

  // - Admin/GoodsCategoryController
  router.get('/api/goodsCategory', controller.admin.goodsCategory.index)
  router.post('/api/goodsCategory/delete', controller.admin.goodsCategory.delete)
  router.post('/api/goodsCategory/save', controller.admin.goodsCategory.save)

  // - Admin/GoodsController
  router.get('/api/goods', controller.admin.goods.index)
  router.get('/api/goods/one', controller.admin.goods.one)
  router.post('/api/goods/save', controller.admin.goods.save)
  router.post('/api/goods/delete', controller.admin.goods.delete)
  router.post('/api/goods/uploadImg', controller.admin.goods.uploadImg)
  router.post('/api/goods/saveFull', controller.admin.goods.saveFull)
  router.post('/api/goods/toggleStatus', controller.admin.goods.toggleStatus)

  // - Admin/PurchaseOrderController
  router.get('/api/purchaseOrder', controller.admin.purchaseOrder.index)
  router.post('/api/purchaseOrder/add', controller.admin.purchaseOrder.add)
  router.post('/api/purchaseOrder/delete', controller.admin.purchaseOrder.delete)
  router.post('/api/purchaseOrder/update', controller.admin.purchaseOrder.update)
  router.get('/api/purchaseOrder/details', controller.admin.purchaseOrder.details)

  // - Admin/CouponController
  router.get('/api/coupon', controller.admin.coupon.getCouponList)
  router.post('/api/coupon', controller.admin.coupon.saveCoupon)
  router.delete('/api/coupon', controller.admin.coupon.deleteCoupon)

  // - Admin/AdminController
  router.get('/api/user', controller.admin.user.getUserInfo)
  router.post('/api/login', controller.admin.user.login)
  router.post('/api/logout', controller.admin.user.logout)
  router.get('/api/userList', controller.admin.user.getUserList)
  router.put('/api/user', controller.admin.user.saveUser)
  router.delete('/api/user', controller.admin.user.deleteUser)

  // -------------------------------------------------------------------------
  // Client Controller
  // -------------------------------------------------------------------------

  // - Client/GoodsController
  router.get('/client/goods', controller.client.goods.index)
  router.get('/client/goods/detail', controller.client.goods.detail)

  // - Client/UserController
  router.get('/client/user', controller.client.user.getUserInfo)
  router.get('/client/user/code2session', controller.client.user.code2session)
  router.post('/client/user/save', controller.client.user.saveUserInfo)

  // - Client/CartController
  router.get('/client/cart', controller.client.cart.getCart)
  router.put('/client/cart', controller.client.cart.addCart)
  router.delete('/client/cart', controller.client.cart.removeCart)
}
