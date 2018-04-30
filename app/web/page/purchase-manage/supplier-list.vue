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
  <!-- 供货商列表 -->
  <Layout class="table-con">
    <Header style="background: white">
      <label>城市：</label>
      <al-cascader v-model="listQuery.areaCode" data-type="code" level="1" @on-change="handleQuery" style="width: 138px;display:inline-block"/>
      <label class="margin-left-20">类别：</label>
      <Select v-model="listQuery.categoryID" @on-change="handleQuery" style="width:100px" filterable>
        <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <label class="margin-left-20">名称/ID：</label>
      <Input v-model="listQuery.supplier" clearable placeholder="请输入供货商名称/ID" @keyup.native.enter="handleQuery" style="width: 160px"></Input>
      <Button @click="handleQuery" type="primary" icon="ios-search" class="margin-left-20">查 询</Button>
      <Button @click="handleExportExcel" type="success" icon="ios-download-outline" class="margin-left-20">导出数据</Button>
      <Button @click="handleEdit(false)" type="success" icon="plus-circled" class="margin-left-20">添加供货商</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>

      <ModalAddSupplier
        :show.sync="showModal"
        :default-modal-data="defaultModalData"
        :category-list="categoryList"
        @handleSave="handleSave">
      </ModalAddSupplier>
    </Header>
    <Layout>
      <Content>
        <Table ref="tableCsv" :height="tableConHeight" :data="tableData" :columns="tableColumns" :loading="listLoading" stripe></Table>
      </Content>
    </Layout>
    <Footer class="text-right">
      <Page show-total show-sizer show-elevator placement="top" :total="total" :page-size="listQuery.rows" :current="listQuery.page" @on-change="handleCurrentChange" @on-page-size-change="handleSizeChange"></Page>
    </Footer>
  </Layout>
</template>

<script>
import ModalAddSupplier from './components/ModalAddSupplier'
import { supplierGet, supplierAdd, supplierDel, supplierUpdate } from '@/api'
import { mapState } from 'vuex'
import { Badge, Poptip } from 'iview'
import util from '@/libs/util'

export default {
  name: 'supplier-list',

  components: { ModalAddSupplier },

  data() {
    return {
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        rows: 20,
        areaCode: [], // [省份ID, 城市ID]
        categoryID: 0, // 商品类别 默认0(全部)
        supplier: '' // 供应商名称 | ID
      },
      showModal: false,
      defaultModalData: false,
      tableData: [],
      tableColumns: [
        {
          title: 'ID',
          key: 'id',
          width: 80,
          sortable: true
        }, {
          title: '级别',
          key: 'level',
          width: 100,
          sortable: true,
          filters: [
            { label: '1级', value: 1 },
            { label: '2级', value: 2 },
            { label: '3级', value: 3 }
          ],
          filterMultiple: false,
          filterMethod: (value, row) => row.level === value,
          render: (h, { row, column, index }) => (
            <Badge count={row.level} class-name={`badge-level-${row.level}`} style="transform: scale(0.75)"></Badge>
          )
        }, {
          title: '供货商名称',
          key: 'supplierName',
          width: 150
        }, {
          title: '供货商类型',
          render: (h, { row, column, index }) => (
            <div>{row.supplierType === 1 ? '公司' : '个人'}</div>
          )
        }, {
          title: '负责人/电话',
          render: (h, { row, column, index }) => (
            <div>
              {row.linkmanName}
              <br />
              {row.tel}
            </div>
          )
        }, {
          title: '供应产品', // 也是商品分类
          key: 'categoryName'
        }, {
          title: '所在地区',
          key: 'areaName'
        }, {
          title: '详细地址',
          key: 'address'
        }, {
          title: '收款方式',
          render: (h, { row, column, index }) => {
            let innerHTML = ''
            if (row.payType === 'bank') {
              innerHTML =
                <Poptip placement="left">
                  <div slot="content">
                    <p>银行名称：{row.bankName}</p>
                    <p>银行卡号：{row.accountNo}</p>
                    <p>持卡人姓名：{row.bankUsername}</p>
                    <p>开户行地址：{row.bankAddress}</p>
                  </div>
                  <i-button type="text" style="padding: 0">银行转账</i-button>
                </Poptip>
            } else {
              const text = row.payType === 'ali' ? '支付宝' : '微信'
              innerHTML =
                <Poptip placement="top">
                  <div slot="content">
                    <p>{text}账号：{row.accountNo}</p>
                  </div>
                  <i-button type="text" style="padding: 0">{text}</i-button>
                </Poptip>
            }

            return innerHTML
          }
        }, {
          title: '税号',
          key: 'taxNo'
        }, {
          title: '操作',
          key: 'handle',
          width: 150,
          align: 'center',
          render: (h, { row, column, index }) => (
            <div>
              <i-button class="noradius" size="small" type="primary" on-click={() => this.handleEdit(row)}>编 辑</i-button>
              <Poptip
                confirm
                placement="left"
                title="您确认删除该供货商吗？"
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
        }),
        areaCode: query.areaCode.toString()
      }
    }
  },

  created() {
    this.fetchData()
    this._getCategoryList()
  },

  methods: {
    fetchData() {
      this.listLoading = true
      supplierGet(this._listQuery).then(result => {
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
    handleSizeChange(val) {
      this.listQuery.rows = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.fetchData()
    },
    // 查询
    handleQuery() {
      this.fetchData()
    },
    // 导出Excel
    handleExportExcel() {
      this.$refs.tableCsv.exportCsv({
        filename: '供货商列表',
        original: false
      })
    },
    // 编辑 | 添加 供货商 -> 显示Modal
    handleEdit(row) {
      this.defaultModalData = row
      this.showModal = true
    },
    // 删除供货商
    handleDelete(row) {
      supplierDel(row).then(result => {
        if (result.code === 50000) {
          this.$Message.success(result.msg)
          this.fetchData()
        }
      })
    },
    // 添加 | 修改供货商 -> 保存
    handleSave(formData, isEdit) {
      const action = isEdit ? supplierUpdate : supplierAdd
      action(formData).then(result => {
        if (result.code === 50000) {
          this.$Message.success(result.msg)
          this.showModal = false
          this.fetchData()
        }
      })
    },

    _getCategoryList() {
      if (this.categoryList.length === 0) {
        this.$store.dispatch('updateCategoryList')
      }
    }
  }
}
</script>
