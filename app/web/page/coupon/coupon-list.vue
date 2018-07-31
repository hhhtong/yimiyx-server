<style lang="stylus">
.badge-level {
  &-1 {
    background: #5cadff !important;
  }

  &-2 {
    background: #19be6b !important;
  }

  &-3 {
    background: #ed3f14 !important;
  }
}
</style>

<template>
  <!-- 优惠券列表 -->
  <Layout class="table-con">
    <Header style="background: white">
      <label>面额：</label>
        <InputNumber
          :max="1000"
          v-model="listQuery.couponMoney1"
          :formatter="value => `￥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
          :parser="value => value.replace(/$s?|(,*)/g, '')">
        </InputNumber>
        <span> ~ </span>
        <InputNumber
          :max="1000"
          :min="listQuery.couponMoney1"
          v-model="listQuery.couponMoney2"
          :formatter="value => `￥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
          :parser="value => value.replace(/$s?|(,*)/g, '')">
        </InputNumber>
      <label class="margin-left-20">类型：</label>
      <Select v-model="listQuery.couponType" @on-change="handleQuery" style="width:100px" filterable>
        <Option v-for="item in couponTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <label class="margin-left-20">名称：</label>
      <Input v-model="listQuery.couponName" clearable placeholder="请输入优惠券名称" @keyup.native.enter="handleQuery" style="width: 160px"></Input>

      <Button @click="handleQuery" type="primary" icon="ios-search" class="margin-left-20">查 询</Button>
      <Button @click="handleExportExcel" type="success" icon="ios-download-outline" class="margin-left-20">导出数据</Button>
      <Button @click="handleEdit(false)" type="success" icon="plus-circled" class="margin-left-20">添加优惠券</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>

      <ModalAddCoupon
        :show.sync="showModal"
        :default-modal-data="defaultModalData"
        @handleSave="handleSave">
      </ModalAddCoupon>
    </Header>
    <Layout>
      <Content>
        <Table ref="tableCsv" :height="tableConHeight" :data="tableData" :columns="tableColumns" :loading="listLoading" stripe></Table>
      </Content>
    </Layout>
    <Footer class="text-right">
      <Page show-total show-sizer show-elevator placement="top" :total="total" :page-size="listQuery.rows" :current="listQuery.page" @on-change="val => listQuery.page = val" @on-page-size-change="val => listQuery.rows = val"></Page>
    </Footer>
  </Layout>
</template>

<script>
import ModalAddCoupon from './components/ModalAddCoupon'
import { couponGet, couponAdd, couponDel, couponUpdate } from '@/api'
import { mapState } from 'vuex'
import { Badge, Poptip } from 'iview'

const couponTypeList = [
  { value: 0, label: '全部' },
  { value: 1, label: '满减券' },
  { value: 2, label: '包邮券' }
]

export default {
  name: 'coupon-list',

  components: { ModalAddCoupon },

  data() {
    return {
      total: 0,
      couponTypeList,
      listLoading: true,
      listQuery: {
        page: 1,
        rows: 20,
        couponMoney1: 0, // 优惠券面额 起
        couponMoney2: 0, // 优惠券面额 止
        couponType: 0, // 优惠券类型 默认0(全部)
        couponName: '' // 优惠券名称
      },
      showModal: false,
      defaultModalData: false,
      tableData: [],
      tableColumns: [
        {
          title: '#',
          type: 'index',
          width: 60
        }, {
          title: '优惠券名称',
          key: 'couponName',
          width: 120
        }, {
          title: '优惠券类型',
          key: 'couponType',
          width: 120
        }, {
          title: '优惠券面额',
          key: 'couponMoney',
          width: 120
        }, {
          title: '最低消费金额',
          key: 'spendMoney',
          width: 120
        }, {
          title: '活动描述',
          key: 'couponDes',
          width: 150
        }, {
          title: '发放数量',
          key: 'sendNum',
          width: 100
        }, {
          title: '领取数量',
          key: 'receiveNum',
          width: 100
        }, {
          title: '状态',
          key: 'dataFlag',
          width: 100,
          render: (h, { row }) => (
            <span>{ row.dataFlag === 1 ? '生效中' : row.dataFlag === 0 ? '已禁用' : '已失效' }</span>
          )
        }, {
          title: '发放开始时间',
          key: 'sendStartTime',
          width: 160
        }, {
          title: '发放结束时间',
          key: 'sendEndTime',
          width: 160
        }, {
          title: '活动开始时间',
          key: 'validStartTime',
          width: 160
        }, {
          title: '活动结束时间',
          key: 'validEndTime',
          width: 160
        }, {
          title: '操作',
          key: 'handle',
          align: 'center',
          width: 150,
          fixed: 'right',
          render: (h, { row }) => (
            <div>
              <i-button class="noradius" size="small" type="primary" on-click={() => this.handleEdit(row)}>编 辑</i-button>
              <Poptip
                transfer
                confirm
                placement="left"
                title="您确认删除该优惠券吗？"
                on-on-ok={() => this.handleDelete(row)}>
                <i-button class="noradius" size="small" type="error">删 除</i-button>
              </Poptip>
            </div>
          )
        }
      ]
    }
  },

  computed: {
    ...mapState(['tableConHeight'])
  },

  watch: {
    'listQuery.rows'(val) {
      this.fetchData()
    },
    'listQuery.page'(val) {
      this.fetchData()
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.listLoading = true
      couponGet(this.listQuery).then(result => {
        if (result.code === 50000) {
          const { list, total } = result.data
          this.tableData = list
          this.total = total
          this.listLoading = false
        }
      })
    },

    // 查询
    handleQuery() {
      this.fetchData()
    },

    // 导出Excel
    handleExportExcel() {
      this.$refs.tableCsv.exportCsv({
        filename: '优惠券列表',
        original: false
      })
    },

    // 编辑 | 添加 优惠券 -> 显示Modal
    handleEdit(row) {
      this.defaultModalData = row
      this.showModal = true
    },

    // 删除优惠券
    handleDelete(row) {
      couponDel(row).then(result => {
        if (result.code === 50000) {
          this.$Message.success(result.msg)
          this.fetchData()
        }
      })
    },

    // 添加 | 修改优惠券 -> 保存
    handleSave(formData, isEdit) {
      const action = isEdit ? couponUpdate : couponAdd
      action(formData).then(result => {
        if (result.code === 50000) {
          this.$Message.success('保存成功')
          this.showModal = false
          this.fetchData()
        }
      })
    }
  }
}
</script>
