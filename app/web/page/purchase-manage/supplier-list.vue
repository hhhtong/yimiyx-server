<template>
  <!-- 供货商列表 -->
  <Layout class="table-con">
    <Header style="background: white">
      <label>城市：</label>
      <al-cascader v-model="listQuery.areaCode" data-type="code" level="1"  style="width: 138px;display:inline-block"/>
      <label class="margin-left-20">类别：</label>
      <Select v-model="listQuery.categoryID" style="width:100px" filterable>
        <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <label class="margin-left-20">名称/编号：</label>
      <Input v-model="listQuery.supplier" clearable placeholder="请输入供货商名称/编号" style="width: 160px"></Input>
      <Button @click="handleQuery" type="primary" icon="ios-search" class="margin-left-20">查 询</Button>
      <Button @click="handleExportExcel" type="success" icon="plus-circled" class="margin-left-20">导出数据</Button>
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
        <Table ref="tableCsv":data="tableData" :columns="tableColumns" :loading="listLoading" stripe></Table>
      </Content>
    </Layout>
    <Footer class="text-right">
      <Page show-total show-sizer show-elevator placement="top" :total="total" :page-size="listQuery.rows" :current="listQuery.page" @on-change="handleCurrentChange" @on-page-size-change="handleSizeChange"></Page>
    </Footer>
  </Layout>
</template>

<script>
import ModalAddSupplier from './components/ModalAddSupplier'
import { supplierGet, supplierAdd, supplierDel, supplierUpdate, getCategoryOptions } from '@/api'
import { Badge, Poptip } from 'iview'

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
        categoryID: 0, // 供应商类别 默认0(全部)
        supplier: '' // 供应商名称 | 编号
      },
      showModal: false,
      defaultModalData: false,
      categoryList: [],
      tableData: [],
      tableColumns: [
        {
          title: '编号',
          key: 'id',
          width: 60
        }, {
          title: '供货商名称',
          render: (h, { row, column, index }) => (
            <div>
              <Badge count={row.level} style="transform: scale(0.75);margin-top: -1px;"></Badge>
              <span>{row.supplierName}</span>
            </div>
          )
        }, {
          title: '供货商类型',
          render: (h, { row, column, index }) => (
            <div>{row.supplierType === 1 ? '公司' : '个人'}</div>
          )
        }, {
          title: '负责人/电话',
          render: (h, { row, column, index }) => (
            <div>{`${row.linkmanName}/${row.tel}`}</div>
          )
        }, {
          title: '经营产品', // 商品分类
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
              <i-button size="small" type="primary" on-click={() => this.handleEdit(row)}>编 辑</i-button>
              <Poptip
                confirm
                placement="left"
                title="您确认删除该供货商吗？"
                on-on-ok={() => this.handleDelete(row)}>
                <i-button size="small" type="error" class="margin-left-10">删 除</i-button>
              </Poptip>
            </div>
          )
        }
      ]
    }
  },

  computed: {
    _listQuery() {
      let query = this.listQuery
      let supplierID = 0
      let supplierName = ''
      if ((Number.isNaN(+query.supplier))) {
        supplierName = query.supplier
      } else {
        supplierID = +query.supplier
      }
      query = {
        ...query,
        areaCode: query.areaCode.toString(),
        supplierID,
        supplierName
      }

      return query
    }
  },

  created() {
    this.fetchData()
    this._getCategoryOptions()
  },

  methods: {
    fetchData() {
      this.listLoading = true
      supplierGet(this._listQuery).then(result => {
        if (result.code === 50000) {
          const { list, total } = result.data
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

    _getCategoryOptions() {
      getCategoryOptions().then(result => {
        if (result.code === 50000) {
          this.categoryList = result.data
        }
      })
    }
  }
}
</script>
