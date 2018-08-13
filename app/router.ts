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
  router.post('/login', controller.admin.home.login)

  // - Admin/SupplierController
  router.get('/supplier', controller.admin.supplier.index)
  router.post('/supplier/add', controller.admin.supplier.add)
  router.post('/supplier/delete', controller.admin.supplier.delete)
  router.post('/supplier/update', controller.admin.supplier.update)

  // - Admin/GoodsCategoryController
  router.get('/goodsCategory', controller.admin.goodsCategory.index)
  router.post('/goodsCategory/delete', controller.admin.goodsCategory.delete)
  router.post('/goodsCategory/save', controller.admin.goodsCategory.save)

  // - Admin/GoodsController
  router.get('/goods', controller.admin.goods.index)
  router.get('/goods/one', controller.admin.goods.one)
  router.post('/goods/save', controller.admin.goods.save)
  router.post('/goods/delete', controller.admin.goods.delete)
  router.post('/goods/uploadImg', controller.admin.goods.uploadImg)
  router.post('/goods/saveFull', controller.admin.goods.saveFull)
  router.post('/goods/toggleStatus', controller.admin.goods.toggleStatus)

  // - Admin/PurchaseOrderController
  router.get('/purchaseOrder', controller.admin.purchaseOrder.index)
  router.post('/purchaseOrder/add', controller.admin.purchaseOrder.add)
  router.post('/purchaseOrder/delete', controller.admin.purchaseOrder.delete)
  router.post('/purchaseOrder/update', controller.admin.purchaseOrder.update)
  router.get('/purchaseOrder/details', controller.admin.purchaseOrder.details)

  // - Admin/CouponController
  router.get('/coupon', controller.admin.coupon.getCouponList)
  router.post('/coupon', controller.admin.coupon.saveCoupon)
  router.delete('/coupon', controller.admin.coupon.deleteCoupon)

  // - Admin/AdminController
  router.post('/login', controller.admin.user.login)
  router.get('/userList', controller.admin.user.getUserList)
  router.put('/user', controller.admin.user.saveUser)
  router.delete('/user', controller.admin.user.deleteUser)

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
