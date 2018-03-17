<template>
  <!-- 商品分类 -->
  <Layout class="table-con">
    <Header style="background: white">
      <label class="margin-left-20">分类名称：</label>
      <Input v-model="listQuery.category" clearable placeholder="请输入分类名称" style="width: 160px"></Input>
      <Button @click="handleQuery" type="primary" icon="ios-search" class="margin-left-20">查 询</Button>
      <Button @click="showModal = true" type="success" icon="plus-circled" class="margin-left-20">添加分类</Button>
      <!-- <ModalEditCategory :show.sync="showModal" @handleSave="handleSave"></ModalEditCategory> -->
    </Header>
    <Layout>
      <Content>
        <Table :data="tableData" :columns="tableColumns" :loading="listLoading" stripe></Table>
      </Content>
    </Layout>
    <Footer class="text-right">
      <Page show-total show-sizer show-elevator placement="top" :total="total" :page-size="listQuery.rows" :current="listQuery.page" @on-change="handleCurrentChange" @on-page-size-change="handleSizeChange"></Page>
    </Footer>
  </Layout>
</template>

<script>
// import ModalEditCategory from './components/ModalEditCategory'
import { categoryGet, categoryAdd, categoryDel, categoryUpdate } from '@/api/goods-category'
import { Badge, Poptip } from 'iview'

export default {
  name: 'goods-list',
  data() {
    return {
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        rows: 20,
        category: '' // 供应商名称 | 编号
      },
      showModal: false,
      tableData: [],
      tableColumns: [
        {
          title: '编号',
          key: 'id',
          width: 60
        }, {
          title: '分类名称',
          key: 'name',
          width: 300
        }, {
          title: '操作',
          key: 'handle',
          render: (h, { row, column, index }) => (
            <div>
              <i-button size="small" type="primary" on-click={() => this.handleEdit(row)}>编 辑</i-button>
              <Poptip
                confirm
                placement="left"
                title="删除此分类后，该分类下的子分类也将消失，您确认此操作？"
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
  },

  methods: {
    fetchData() {
      this.listLoading = true
      categoryGet(this.listQuery).then(result => {
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
    // 编辑分类
    handleEdit(row) {

    },
    // 删除分类
    handleDelete(row) {
      categoryDel(row).then(result => {
        if (result.code === 50000) {
          this.$Message.success(result.msg)
          this.fetchData()
        }
      })
    },
    // 添加 | 修改分类 -> 保存
    handleSave(formData) {
      categoryAdd(formData).then(result => {
        if (result.code === 50000) {
          this.$Message.success(result.msg)
          this.showModal = false
          this.fetchData()
        }
      })
    }
  }
}
</script>
