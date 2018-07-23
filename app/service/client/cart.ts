import { Repository } from 'typeorm';
import BaseService from '../../core/base-service';
import User from '../../model/entity/client-user';
import Cart from '../../model/entity/client-cart';

export default class CartService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 用户
  readonly User: Repository<User>;
  // - 购物车
  readonly Cart: Repository<Cart>;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.User = this.conn.getRepository(User);
    this.Cart = this.conn.getRepository(Cart);
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------
  async save() {

  }

  async delete() {

  }
}