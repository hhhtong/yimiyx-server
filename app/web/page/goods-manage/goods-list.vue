<!--
  Description 商品列表
  @date    2018-03-18 20:17:55
-->
<template>
  <Layout class="table-con">
    <Header style="background: white">
      <label class="margin-left-20">商品：</label>
      <Input v-model="listQuery.goods" clearable placeholder="请输入商品编号/名称" style="width: 160px"></Input>
      <Button @click="handleQuery" type="primary" icon="ios-search" class="margin-left-20">查 询</Button>
      <Button @click="showModal = true" type="success" icon="plus-circled" class="margin-left-20">添加商品</Button>
      <ModalSaveGoods
        ref="ModalSaveGoods"
        :show.sync="showModal"
        :default-modal-data="defaultModalData"
        :category-list="categoryList"
        @handleSave="handleSave"
        @handleClose="defaultModalData = false">
      </ModalSaveGoods>
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
import ModalSaveGoods from './components/ModalSaveGoods'
import { goodsGet, goodsSave, goodsDel, getCategoryList } from '@/api'
import { mapState } from 'vuex'
import { Badge, Poptip, Tag } from 'iview'
import util from '@/libs/util'
import tagColors from './components/TagColors.js'

export default {
  name: 'goods-list',

  components: { ModalSaveGoods },

  data() {
    return {
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        rows: 20,
        goods: '' // 商品名称 | 编号
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
          title: '商品编号',
          key: 'goodsNo',
          width: 105,
          sortable: true
        }, {
          title: '商品名称',
          key: 'goodsName',
          align: 'center'
        }, {
          title: '商品别名',
          key: 'goodsAlias',
          align: 'center',
          render: (h, { row, column, index }) => {
            return <span>{row.goodsAlias ? row.goodsAlias : '--'}</span>
          }
        }, {
          title: '规格',
          key: 'specification',
          align: 'center'
        }, {
          title: '所属分类',
          key: 'categorys',
          width: 270,
          align: 'center',
          render: (h, { row, column, index }) => {
            const categorys = this.$refs.ModalSaveGoods
              .GetJoinCategory(row.categorys.map(item => item.id))

            return categorys.map((item, index) =>
              <div>
                <Tag
                  type="dot"
                  name={item.no}
                  color={tagColors[index % tagColors.length]}>
                  {item.name}
                </Tag>
              </div>
            )
          }
        }, {
          title: '库存',
          key: 'stockQty',
          sortable: true
        }, {
          title: '所在仓库',
          key: 'storeName',
          align: 'center',
          render: (h, { row, column, index }) => (
            <span>{row.storeName ? row.storeName : '--'}</span>
          )
        }, {
          title: '操作',
          key: 'handle',
          align: 'center',
          width: 185,
          render: (h, { row, column, index }) => (
            <div>
              <i-button size="small" type="success" on-click={() => this.handleEdit(row)}>上架</i-button>
              <i-button size="small" type="primary" class="margin-left-10" on-click={() => this.handleEdit(row)}>编 辑</i-button>
              <Poptip
                confirm
                placement="left"
                title="删除此商品后，该商品也会从已上架的商品列表消失，您确认此操作？"
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
    ...mapState(['categoryList']),
    _listQuery() {
      return util.parseSearchField({
        query: this.listQuery,
        field: 'goods',
        ID: 'goodsNo',
        name: 'goodsName'
      })
    }
  },

  async created() {
    await this.fetchCategoryList()
    await this.fetchData()
  },

  methods: {
    fetchData() {
      this.listLoading = true
      goodsGet(this._listQuery).then(result => {
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
        filename: '商品列表',
        original: false
      })
    },
    // 编辑 | 添加 商品 -> 显示Modal
    handleEdit(row) {
      this.defaultModalData = row
      this.showModal = true
    },
    // 删除商品
    handleDelete(row) {
      goodsDel(row).then(result => {
        if (result.code === 50000) {
          this.$Message.success(result.msg)
          this.fetchData()
        }
      })
    },
    // 添加 | 修改商品 -> 保存
    handleSave(formData) {
      goodsSave(formData).then(result => {
        if (result.code === 50000) {
          this.$Message.success(result.msg)
          this.showModal = false
          this.fetchData()
        }
      })
    },

    fetchCategoryList() {
      if (this.categoryList.length === 0) {
        return this.$store.dispatch('updateCategoryList')
      } else {
        return Promise.resolve({ msg: '类目已获取，无需再次获取' })
      }
    }
  }
}
</script>
