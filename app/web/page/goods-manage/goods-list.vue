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
      <ModalPutawayGoods
        :show.sync="showModal2"
        :default-modal-data="defaultModalData2"
        :category-list="categoryList"
        @handleSave="handleSave2"
        @handleClose="defaultModalData2 = false">
      </ModalPutawayGoods>
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
import ModalPutawayGoods from './components/ModalPutawayGoods'
import { goodsGet, goodsSave, goodsDel, getCategoryList } from '@/api'
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

  components: { ModalSaveGoods, ModalPutawayGoods },

  data() {
    return {
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        rows: 20,
        goods: '', // 商品名称 | 编号
        isOnline: ''
      },
      onlineStatus,
      showModal: false,
      showModal2: false,
      defaultModalData: false,
      defaultModalData2: false,
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
        }, {
          title: '商品别名',
          key: 'goodsAlias',
          align: 'center',
          width: 120,
          render: (h, { row, column, index }) => (
            <span>{row.goodsAlias ? row.goodsAlias : '--'}</span>
          )
        }, {
          title: '规格',
          key: 'spec',
          align: 'center',
          width: 100,
          render: (h, { row, column, index }) => (
            <span>{row.spec + row.specUnit}</span>
          )
        }, {
          title: '所属分类',
          key: 'categorys',
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
          key: 'madeIn',
          align: 'center',
          width: 100,
          render: (h, { row, column, index }) => (
            <span>{row.madeIn ? row.madeIn : '--'}</span>
          )
        }, {
          title: '库存',
          key: 'stockQty',
          width: 100,
          sortable: true
        }, {
          title: '所在仓库',
          key: 'storeName',
          align: 'center',
          width: 100,
          render: (h, { row, column, index }) => (
            <span>{row.storeName ? row.storeName : '--'}</span>
          )
        }, {
          title: '状态',
          key: 'isOnline',
          width: 100,
          align: 'center',
          render: (h, { row, column, index }) => {
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
          key: 'handle',
          align: 'center',
          width: 200,
          fixed: 'right',
          render: (h, { row, column, index }) => (
            <div>
              <i-button class="noradius" v-show={row.isOnline !== 1} size="small" on-click={() => this.handlePutaway(row)}>上 架</i-button>
              <i-button class="noradius" v-show={row.isOnline === 1} size="small" on-click={() => this.handleSoldout(row)}>下 架</i-button>
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

    // 上架商品 -> 显示Modal
    handlePutaway(row) {
      this.defaultModalData2 = row
      // this.showModal2 = true
    },

    // 下架商品
    handleSoldout(row) {

    },

    // 编辑 | 添加 商品 -> 显示Modal
    handleEdit(row) {
      const categorys = this.__parseCategory(row.categorys)
      this.defaultModalData = { ...row, categorys }
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

    // 添加 | 修改商品 -> 保存
    handleSave2(formData) {
      // putawayGoodsSave(formData).then(result => {
      //   if (result.code === 50000) {
      //     this.$Message.success(result.msg)
      //     this.showModal = false
      //     this.fetchData()
      //   }
      // })
    },

    // 嵌套类目结构解析成平级
    __parseCategory(categorys) {
      let temp = []

      const joinName = (current, name = '') => {
        let currentName = name ? `${name} / ${current.name}` : current.name
        if (current.children) {
          for (const item of current.children) {
            joinName(item, currentName)
          }
        } else {
          temp.push({ name: currentName, id: current.id })
        }
      }

      for (const item of categorys) {
        joinName(item)
      }

      return temp
    }
  }
}
</script>
