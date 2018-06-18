<style lang="stylus">
.purchase-expand {
  max-width: 980px;
  display: flex;
  margin-top: -15px;
  margin-left: -15px;

  &-card {
    flex-basis: 310px;
    margin-top: 15px;
    margin-left: 15px;

    .ivu-card-extra {
      top: 4px;
      right: 0;

      .ivu-tag {
        border: none !important;
      }
    }

    p {
      line-height: 28px;
    }
  }
}
</style>

<template>
  <div class="purchase-expand">
    <Card class="purchase-expand-card" :bordered="false" v-for="row in tableData" :key="row.mid">
      <div slot="title">{{ row.goods.goodsName }}</div>
      <div slot="extra">
        <Tag v-if="row.status === 1" type="dot" color="yellow">待采购</Tag>
        <Tag v-else-if="row.status === 2" type="dot" color="green">已入库</Tag>
        <Tag v-else type="dot" color="red">已删除</Tag>
      </div>
      <p>条码：{{ row.mid }}</p>
      <p>规格：{{ row.goods.spec + row.goods.specUnit }}</p>
      <p>采购数量：{{ row.purchaseNum }}</p>
      <p>当前库存：{{ row.goods.stockQty }}</p>
    </Card>
  </div>
</template>

<script>
import { Tag } from 'iview'

export default {
  name: 'purchase-details',

  props: {
    tableData: Array
  },

  data() {
    return {}
  }
}
</script>
