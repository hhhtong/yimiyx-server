<template>
  <!-- 商品分类 -->
  <Layout class="table-con">
    <Header style="background: white">
      <label class="margin-left-20">分类名称：</label>
      <Input v-model="listQuery.name" clearable placeholder="请输入分类名称" @keyup.native.enter="handleQuery" style="width: 160px"></Input>
      <Button @click="handleQuery" type="primary" icon="ios-search" class="margin-left-20">查 询</Button>
      <Button @click="handleAdd" type="success" icon="plus-circled" class="margin-left-20">添加分类</Button>
      <ModalTreeCategory
        :title="titleModal"
        :show.sync="showModal"
        :treeData.sync="treeData"
        :idMax.sync="idMax"
        @handleSave="handleSave">
      </ModalTreeCategory>
    </Header>
    <Layout>
      <Content>
        <Table :height="tableConHeight" :data="tableData" :columns="tableColumns" :loading="listLoading" stripe></Table>
      </Content>
    </Layout>
    <Footer class="text-right">
      <Page show-total show-sizer show-elevator placement="top" :total="total" :page-size="listQuery.rows" :current="listQuery.page" @on-change="handleCurrentChange" @on-page-size-change="handleSizeChange"></Page>
    </Footer>
  </Layout>
</template>

<script>
import { cloneDeep } from 'lodash'
import ModalTreeCategory from './components/ModalTreeCategory'
import { categoryGet, categoryAdd, categoryDel, categoryUpdate } from '@/api'
import { Badge, Poptip } from 'iview'
import { mapState } from 'vuex'

export default {
  name: 'goods-category',
  components: { ModalTreeCategory },
  data() {
    return {
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        rows: 20,
        name: ''
      },
      titleModal: '',
      showModal: false,
      treeData: [],
      idMax: null,
      tableData: [],
      tableColumns: [
        {
          title: '编号',
          key: 'no',
          width: 80,
          sortable: true
        }, {
          title: '分类名称',
          key: 'name',
          width: 300,
          align: 'center',
          render: (h, { row, column, index }) => (
            <div>
              <i-button type="text" on-click={() => this.handleEdit(row)}>{row.name}</i-button>
            </div>
          )
        }, {
          title: '操作',
          key: 'handle',
          align: 'center',
          render: (h, { row, column, index }) => (
            <div>
              <i-button class="noradius" size="small" type="primary" on-click={() => this.handleEdit(row)}>编 辑</i-button>
              <Poptip
                confirm
                placement="top"
                title="删除此分类后，该分类下的子分类也将消失，您确认此操作？"
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
    ...mapState(['tableConHeight']),
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.listLoading = true
      categoryGet(this.listQuery).then(result => {
        if (result.code === 50000) {
          const { list, total, idMax } = result.data
          this.tableData = list
          this.total = total
          this.idMax = idMax
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
    // 添加分类
    handleAdd() {
      this.treeData = [{
        no: '',
        name: '',
        expand: true,
        readonly: false,
        id: ++this.idMax,
        pid: 0,
        type: 1
      }]
      this.titleModal = '新增分类'
      this.showModal = true
    },
    // 编辑分类
    handleEdit(row) {
      this.treeData = [cloneDeep(row)]
      this.showModal = true
      this.titleModal = row.name
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
      categoryUpdate(formData).then(result => {
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
