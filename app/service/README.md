subQuery 可以添加一个子查询
```js
const query = await this.PO
  .createQueryBuilder('PO')
  // .leftJoin('PO.mainOrders', 'mainOrder')
  .leftJoin('PO.category', 'category')
  .leftJoin('PO.supplier', 'supplier')
  .select([
    'PO.*',
    `DATE_FORMAT(PO.createdAt,'%Y-%m-%d %H:%i:%s') AS createdAt`,
    'category.name',
    'supplier.tel',
    'supplier.id',
    'supplier.supplierName AS supplierName'
  ])
  .addSelect(subQuery =>
    subQuery
      .select('GROUP_CONCAT(PMO.mid)')
      .from(PurchaseMainOrder, 'PMO')
      .where('PO.id = PMO.order')
  , 'mids')
  .where(`ISNULL(PO.deletedAt) AND ${where1} AND ${where2}`)
  .andWhere(`supplier.supplierName LIKE '%${supplierName}%'`);
```