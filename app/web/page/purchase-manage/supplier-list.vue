<style lang="stylus">
.supplier-con {
  height: 100%;
}
</style>

<template>
  <!-- <h1>供货商</h1> -->
  <Layout class="supplier-con">
    <Header style="background: white">
      <label>城市：</label>
      <Select v-model="listQuery.cityCode" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <label class="margin-left-20">类别：</label>
      <Select v-model="listQuery.category" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
        <Table :data="tableData" :columns="tableColumns" stripe></Table>
      </Content>
      <!-- <Sider
        v-model="showSlder"
        hide-trigger
        collapsible
        reverse-arrow
        style="background: white">Sider</Sider> -->
    </Layout>
    <Footer>
      <div style="float: right;">
        <Page show-total show-sizer show-elevator placement="top" :total="total" :page-size="listQuery.rows" :current="listQuery.page" @on-change="changePage"></Page>
      </div>
    </Footer>
  </Layout>
</template>

<script>
import ModalAddSupplier from './components/ModalAddSupplier'
import { supplierGet, supplierAdd, supplierDel, supplierUpdate } from '@/api/supplier'
import { Badge } from 'iview'

export default {
  name: 'purchase-manage__supplier-list',

  components: { ModalAddSupplier },

  data() {
    return {
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        rows: 20,
        cityCode: '', // 城市ID
        category: '', // 供应商类别
        supplier: '' // 供应商名称 | 编号
      },
      showModal: false,
      // showSlder: true,
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        }
      ],
      tableColumns: [
        {
          title: '编号',
          key: 'id',
          width: 60
        },
        {
          title: '供货商名称',
          render: (h, {row, column, index }) => (
            <div>
              <Badge count="{{ row.level }}"></Badge>
              <span>{ row.supplierName }</span>
            </div>
          )
        },
        {
          title: '负责人/电话',
          render: (h, { row, column, index }) => (
            <div>
              { `${row.linkmanName}/${row.tel}` }
            </div>
          )
        },
        {
          title: '供货商级别',
          key: 'level'
        },
        {
          title: '目/类/项',
          key: 'category'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '操作',
          key: 'handle',
          width: 150,
          align: 'center',
          render: (h, { row, column, index }) => (
            <div>
              <i-button size="small" type="primary">编辑</i-button>
              <i-button size="small" type="error" class="margin-left-10">删除</i-button>
            </div>
          )
        }
      ],
      tableData: []
    }
  },

  created() {
    this.fetchData()
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

    changePage() {

    },
    // 查询
    handleQuery() {
      // this.listQuery
    },
    // 添加供货商
    handleAddSupplier() {

    },
    // 导出Excel
    handleExportExcel() {

    },
    // 添加 | 修改供货商 -> 保存
    async handleSave(formData) {
      const result = await supplierAdd(formData)

      if (result.code === 50000) {
        this.$Message.success(result.msg)
        this.showModal = false
      }
    }
  }
}
</script>
