<template>
  <Table :data="tableData" :columns="tableColumns"></Table>
</template>

<script>
import { Tag } from 'iview'

export default {
  name: 'purchase-details',

  props: {
    tableData: Array
  },

  data() {
    return {
      tableColumns: [
        {
          type: 'index',
          width: 60
        }, {
          title: '采购商品号',
          key: 'mid',
          width: 200
        }, {
          title: '名称',
          width: 150,
          render: (h, { row }) => <span>{row.goods.goodsName ? row.goods.goodsName : '--'}</span>
        }, {
          title: '别名',
          width: 150,
          render: (h, { row }) => <span>{row.goods.goodsAlias ? row.goods.goodsAlias : '--'}</span>
        }, {
          title: '规格',
          key: 'spec',
          align: 'center',
          width: 100,
          render: (h, { row }) => <span>{row.goods.spec + row.goods.specUnit}</span>
        }, {
          title: '采购数量',
          width: 120,
          render: (h, { row }) => <span>{row.goods.purchaseNum}</span>
        }, {
          title: '当前库存',
          width: 120,
          render: (h, { row }) => <span>{row.goods.stockQty}</span>
        }, {
          title: '状态',
          width: 128,
          render: (h, { row }) => (
            <div>
              {
                row.status === 1 ?
                  <Tag type="dot" color="yellow">待采购</Tag> :
                  row.status === 2 ?
                    <Tag type="dot" color="green">已入库</Tag> :
                    <Tag type="dot" color="red">已删除</Tag>
              }
            </div>
          )
        }, {
          title: '商品条形码',
          width: 150,
          render: (h, { row }) => <img src={row.goods.barCode} />
        }
      ]
    }
  }
}
</script>
