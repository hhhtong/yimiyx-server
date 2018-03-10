<template>
  <!-- 供货商列表 -->
  <Layout class="table-con">
    <Header style="background: white">
      <!-- <label>城市：</label>
      <Select v-model="listQuery.cityCode" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select> -->
      <label class="margin-left-20">类别：</label>
      <Select v-model="listQuery.category" style="width:100px">
        <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <label class="margin-left-20">名称/编号：</label>
      <Input v-model="listQuery.supplier" clearable placeholder="请输入供货商名称/编号" style="width: 160px"></Input>
      <Button @click="handleQuery" type="primary" icon="ios-search" class="margin-left-20">查 询</Button>
      <Button @click="handleExportExcel" type="success" icon="plus-circled" class="margin-left-20">导出Excel</Button>
      <Button @click="showModal = true" type="success" icon="plus-circled" class="margin-left-20">添加供货商</Button>

      <ModalAddSupplier :show.sync="showModal" @handleSave="handleSave"></ModalAddSupplier>
    </Header>
    <Layout>
      <Content>
        <Table :data="tableData" :columns="tableColumns" :loading="listLoading" stripe></Table>
      </Content>
      <!-- <Sider
        v-model="showSlder"
        hide-trigger
        collapsible
        reverse-arrow
        style="background: white">Sider</Sider> -->
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
        cityCode: '', // 城市ID
        category: 0, // 供应商类别 默认(全部)
        supplier: '' // 供应商名称 | 编号
      },
      showModal: false,
      // showSlder: true,
      cityList: [],
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
          title: '经营产品', // 目/类
          key: 'category'
        }, {
          title: '所在城市',
          key: 'areaName'
        }, {
          title: '详细地址',
          key: 'address'
        }, {
          title: '收款方式',
          render: (h, { row, column, index }) => {
            let text = ''
            if (row.payType === 'bank') {
              text = '银行转账'
            }
            if (row.payType === 'ali') {
              text = '支付宝'
            }
            if (row.payType === 'wechat') {
              text = '微信'
            }

            return (<div>{text}</div>)
          }
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

  created() {
    this.fetchData()
    this._getCategoryOptions()
  },

  methods: {
    fetchData() {
      this.listLoading = true
      supplierGet(this.listQuery).then(result => {
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

    },
    // 编辑供货商
    handleEdit(row) {

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
    handleSave(formData) {
      supplierAdd(formData).then(result => {
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
