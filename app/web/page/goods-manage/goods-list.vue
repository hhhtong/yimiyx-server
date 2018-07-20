<!--
  Description 商品列表
  @date    2018-03-18 20:17:55
-->
<template>
  <Layout class="table-con">
    <Header style="background: white">
      <label>商品：</label>
      <Input v-model="listQuery.goods" clearable placeholder="请输入商品编号/名称" @keyup.native.enter="handleQuery" style="width: 160px"></Input>
      <label class="margin-left-20">状态：</label>
      <Select v-model="listQuery.isOnline" @on-change="handleQuery" style="width:100px">
        <Option v-for="item in onlineStatus" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <Button @click="handleQuery" type="primary" icon="ios-search" class="margin-left-20">查 询</Button>
      <Button @click="showModal = true" type="success" icon="plus-circled" class="margin-left-20">添加商品</Button>
      <ModalSaveGoods
        :show.sync="showModal"
        :default-modal-data="defaultModalData"
        :category-list="categoryList"
        @handleSave="handleSave"
        @handleClose="defaultModalData = false">
      </ModalSaveGoods>
    </Header>
    <Layout>
      <Content>
        <Table :height="tableConHeight" :data="tableData" :columns="tableColumns" :loading="listLoading" stripe></Table>
      </Content>
    </Layout>
    <Footer class="text-right">
      <Page show-total show-sizer show-elevator placement="top" :total="total" :page-size="listQuery.rows" :current="listQuery.page" @on-change="val => listQuery.page = val" @on-page-size-change="val => listQuery.rows = val"></Page>
    </Footer>
  </Layout>
</template>

<script>
import ModalSaveGoods from './components/ModalSaveGoods'
import { goodsGet, goodsSave, goodsDel, getCategoryList, goodsStatusToggle } from '@/api'
import { mapState } from 'vuex'
import { Poptip, Tag, ButtonGroup } from 'iview'
import util from '@/libs/util'
import tagColors from './components/TagColors.js'

const onlineStatus = [
  { id: 'all', name: '全部' },
  { id: 1, name: '出售中' },
  { id: 0, name: '已下架' }
]

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
        goods: '', // - 商品名称 | 编号
        isOnline: 'all'
      },
      onlineStatus,
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
          width: 110,
          sortable: true
        }, {
          title: '商品名称',
          key: 'goodsName',
          align: 'center',
          width: 120,
          render: (h, { row, column, index }) => {
            if (row.isOnline === 1)
              return <i-button type="text" on-click={() => this.handleChangeStatus(row, index, true)}>
                { row.goodsName }
              </i-button>
            return <span>{ row.goodsName }</span>
          }
        }, {
          title: '商品别名',
          align: 'center',
          width: 120,
          render: (h, { row }) => <span>{this.$helper.beautifyCell(row.goodsAlias)}</span>
        }, {
          title: '规格',
          key: 'spec',
          align: 'center',
          width: 100
        }, {
          title: '所属分类',
          width: 270,
          align: 'center',
          render: (h, { row, column, index }) => {
            const categorys = this.__parseCategory(row.categorys)
            return categorys.map((item, index) => {
              return <div>
                <Tag
                  type="dot"
                  name={item.id}
                  color={tagColors[index % tagColors.length]}>
                  {item.name}
                </Tag>
              </div>
            })
          }
        }, {
          title: '产地',
          align: 'center',
          width: 100,
          render: (h, { row }) => <span>{this.$helper.beautifyCell(row.madeIn)}</span>
        }, {
          title: '所在仓库',
          align: 'center',
          width: 100,
          render: (h, { row }) => <span>{this.$helper.beautifyCell(row.storeName)}</span>
        }, {
          title: '库存',
          key: 'stockQty',
          width: 100,
          sortable: true
        }, {
          title: '状态',
          width: 100,
          align: 'center',
          render: (h, { row }) => {
            if (row.isOnline === 1) {
              return <Tag type="border" color="green">出售中</Tag>
            }

            if (row.isOnline === 0) {
              return <Tag type="border">已下架</Tag>
            }

            if (row.isOnline === -1) {
              return <Tag type="border" color="yellow">未上架</Tag>
            }
          }
        }, {
          title: '操作',
          align: 'center',
          width: 200,
          fixed: 'right',
          render: (h, { row, column, index }) => (
            <div>
              <i-button class="noradius" size="small" on-click={() => this.handleChangeStatus(row, index)}>
                { row.isOnline === 1 ? '下 架' : '上 架' }
              </i-button>
              <i-button class="noradius" size="small" type="primary" on-click={() => this.handleEdit(row)}>编 辑</i-button>
              <Poptip
                width="200"
                transfer
                confirm
                placement="left"
                title="删除此商品后，该商品也会从已上架的商品列表消失，您确认此操作？"
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
      return util.parseSearchField({
        query: this.listQuery,
        field: 'goods',
        ID: 'goodsNo',
        name: 'goodsName'
      })
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

  async created() {
    await this.fetchCategoryList()
    await this.fetchData()
  },

  // - 从详情页保存完信息跳回来的时候要刷新一下数据
  beforeRouteEnter (to, from, next) {
    const { refresh } = to.params
    next(vm => refresh && vm.fetchData())
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

    fetchCategoryList() {
      if (this.categoryList.length === 0) {
        return this.$store.dispatch('updateCategoryList')
      } else {
        return Promise.resolve({ msg: '类目已获取，无需再次获取' })
      }
    },

    // - 查询
    handleQuery() {
      this.fetchData()
    },

    // - 导出Excel
    handleExportExcel() {
      this.$refs.tableCsv.exportCsv({
        filename: '商品列表',
        original: false
      })
    },

    /**
     * 上下架商品
     * @param {Object} row - 当前行
     * @param {Number} index - 当前行的index
     * @param {Boolean} isEdit - 是否编辑模式
     */
    handleChangeStatus(row, index, isEdit) {
      const { id, isOnline } = row
      if (!isEdit && isOnline === 1) {
        this.__toggleStatus(id, isOnline, index)
      } else {
        // - 跳转到确认商品的详细信息
        this.$router.push({ name: 'goods-desc', params: row })
      }
    },

    // - 编辑 | 添加 商品 -> 显示Modal
    handleEdit(row) {
      const categorys = this.__parseCategory(row.categorys)
      this.defaultModalData = { ...row, categorys }
      this.showModal = true
    },

    // - 删除商品
    handleDelete(row) {
      goodsDel(row).then(result => {
        if (result.code === 50000) {
          this.$Message.success(result.msg)
          this.fetchData()
        }
      })
    },

    // - 添加 | 修改商品 -> 保存
    handleSave(formData) {
      goodsSave(formData).then(result => {
        if (result.code === 50000) {
          this.$Message.success(result.msg)
          this.showModal = false
          this.fetchData()
        }
      })
    },

    /**
     * 出售中或已下架进行状态反转
     * @param {Number} id - 商品的id
     * @param {Number} isOnline - 商品的状态
     * @param {Number} index - 当前商品的index
     */
    __toggleStatus(id, isOnline, index) {
      goodsStatusToggle({ id, isOnline }).then(result => {
        if (result.code === 50000) {
          this.tableData[index].isOnline = result.data
          this.$Message.success('状态已更新')
        }
      })
    },

    /**
     * 嵌套类目结构解析成平级
     * @param {Array<Object>} categorys - 类目数组
     * @return {Array<Object>}
     */
    __parseCategory(categorys) {
      let temp = []
      const joinName = (current, name = '') => {
        let currentName = name ? `${name} / ${current.name}` : current.name
        if (current.children) {
          for (const item of current.children) joinName(item, currentName)
        } else {
          temp.push({ name: currentName, id: current.id })
        }
      }
      for (const item of categorys) joinName(item)
      return temp
    }
  }
}
</script>
