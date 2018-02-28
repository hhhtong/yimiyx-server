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
      <Select v-model="query.cityCode" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <label class="margin-left-20">类别：</label>
      <Select v-model="query.category" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <label class="margin-left-20">名称/编号：</label>
      <Input v-model="query.supplier" clearable placeholder="请输入供货商名称/编号" style="width: 160px"></Input>
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
        <Page show-total show-sizer show-elevator placement="top" :total="100" :page-size="20" :current="1" @on-change="changePage"></Page>
      </div>
    </Footer>
  </Layout>
</template>

<script>
import ModalAddSupplier from './components/ModalAddSupplier'
import { supplierAdd, supplierDel, supplierUpdate } from '@/api/supplier'

export default {
  name: 'purchase-manage__supplier-list',

  components: { ModalAddSupplier },

  data() {
    return {
      query: {
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
          key: 'supplierId',
          width: 60
        },
        {
          title: '供货商名称',
          key: 'supplierName'
        },
        {
          title: '联系人/电话',
          key: 'linkman'
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
        // {
        //   title: '最后一次报价时间',
        //   key: 'date'
        // },
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
      tableData: [
        {
          supplierName: 'John Brown',
          level: 3,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          supplierName: 'Jim Green',
          level: 3,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          supplierName: 'Joe Black',
          level: 3,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          supplierName: 'Jon Snow',
          level: 3,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },

  methods: {
    changePage() {

    },
    // 查询
    handleQuery() {
      // this.query
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
        this.$Message.success('操作成功')
        this.showModal = false
      }
    }
  }
}
</script>
