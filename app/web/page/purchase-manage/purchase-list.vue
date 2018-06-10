<template>
  <!-- 供货商列表 -->
  <Layout class="table-con">
    <Header style="background: white">
      <label>时间：</label>
      <DatePicker
        type="daterange"
        split-panels
        placeholder="选择一个时间范围"
        @on-change="val => listQuery.dateRange = val">
      </DatePicker>
      <label class="margin-left-20">采购类别：</label>
      <Select v-model="listQuery.categoryID" @on-change="handleQuery" style="width:100px" filterable>
        <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <label class="margin-left-20">供货商名称/ID：</label>
      <Input v-model="listQuery.supplier" clearable placeholder="请输入供货商名称/ID" @keyup.native.enter="handleQuery" style="width: 160px"></Input>
      <Button @click="handleQuery" type="primary" icon="ios-search" class="margin-left-20">查 询</Button>
      <Button @click="handleExportExcel" type="success" icon="ios-download-outline" class="margin-left-20">导出数据</Button>
      <Button @click="handleEdit(false)" type="success" icon="plus-circled" class="margin-left-20">新增采购单</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </Header>
    <Layout>
      <Content>
        <Table ref="tableCsv" border :height="tableConHeight" :data="tableData" :columns="tableColumns" :loading="listLoading" stripe></Table>
      </Content>
    </Layout>
    <Footer class="text-right">
      <Page show-total show-sizer show-elevator placement="top" :total="total" :page-size="listQuery.rows" :current="listQuery.page" @on-change="val => listQuery.page = val" @on-page-size-change="val => listQuery.rows = val"></Page>
    </Footer>
  </Layout>
</template>

<script>
import ModalAddPurchase from './components/ModalAddPurchase'
import PurchaseExpandRow from './components/PurchaseExpandRow'
import { mapState } from 'vuex'
import { Badge, Tag, Poptip } from 'iview'
import { purchaseOrderGet, purchaseOrderDetails, purchaseOrderDel } from '@/api'
import util from '@/libs/util'

export default {
  name: 'purchase-list',

  components: { ModalAddPurchase },

  data() {
    return {
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        rows: 20,
        dateRange: [], // 采购单创建时间
        categoryID: 0, // 商品类别 默认0(全部)
        supplier: '' // 供应商名称 | ID
      },
      tableData: [],
      tableColumns: [
        {
          title: '#',
          type: 'index',
          width: 60
        }, {
          type: 'expand',
          width: 50,
          render: (h, { row }) => (
            <PurchaseExpandRow row={row}/>
          )
        }, {
          title: '创建时间',
          key: 'createdAt',
          width: 150,
          sortable: true
        }, {
          title: '采购编号',
          key: 'id',
          width: 200,
          sortable: true
        }, {
          title: '采购类别',
          key: 'categoryName',
          width: 100
        }, {
          title: '供货商',
          key: 'supplierName',
          width: 180
        }, {
          title: '供货商ID',
          key: 'supplierID',
          width: 90
        }, {
          title: '供货商联系电话',
          key: 'supplierTel',
          width: 125
        }, {
          title: '经办人',
          key: 'transactor',
          width: 90
        }, {
          title: '状态',
          width: 128,
          render: (h, { row, column, index }) => {
            return <div>
              {
                row.status === 1 ?
                  <Tag type="dot" color="yellow">待采购</Tag> :
                  row.status === 2 ?
                    <Tag type="dot" color="green">已入库</Tag> :
                    <Tag type="dot" color="red">已删除</Tag>
              }
            </div>
          }
        }, {
          title: '备注',
          key: 'remark',
          width: 200,
          render: (h, { row, column, index }) => (
            <div>{row.remark ? row.remark : '--'}</div>
          )
        }, {
          title: '操作',
          key: 'handle',
          width: 200,
          align: 'center',
          fixed: 'right',
          render: (h, { row, column, index }) => (
            <div>
              <i-button class="noradius" size="small" on-click={() => this.handleViewClick(row.id)}>查看详情</i-button>
              <i-button class="noradius" disabled size="small" type="primary" on-click={() => this.handleEdit(row)}>编 辑</i-button>
              <Poptip
                transfer
                confirm
                placement="left"
                title="您确认删除该采购单吗？"
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
    ...mapState(['categoryList', 'tableConHeight']),
    _listQuery() {
      const query = this.listQuery
      return {
        ...util.parseSearchField({
          query,
          field: 'supplier'
        })
      }
    }
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
    this.__getCategoryList()
  },

  methods: {
    fetchData() {
      this.listLoading = true
      purchaseOrderGet(this._listQuery).then(result => {
        if (result.code === 50000) {
          const { list, total } = result.data

          list.forEach(item => {
            if (item.category) {
              item.categoryID = item.category.id
              item.categoryName = item.category.name
              delete item.category
            }
          })

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
        filename: '采购单列表',
        original: false
      })
    },
    // 查看详情
    handleViewClick(id) {
      purchaseOrderDetails(id).then(result => {
        if (result.code === 50000) {
          this.$router.push({ name: 'purchase-details', params: result.data })
        }
      })
    },
    // 编辑 | 添加 采购单 -> 路由跳转
    handleEdit(params) {
      if (params) {
        // this.$router.push({ name: 'purchase-add', params })
      } else {
        this.$router.push({ name: 'purchase-add' })
      }
    },
    // 删除采购单
    handleDelete(row) {
      purchaseOrderDel(row).then(result => {
        if (result.code === 50000) {
          this.$Message.success(result.msg)
          this.fetchData()
        }
      })
    },
    // 获取商品分类列表
    __getCategoryList() {
      if (this.categoryList.length === 0) {
        this.$store.dispatch('updateCategoryList')
      }
    }
  }
}
</script>
