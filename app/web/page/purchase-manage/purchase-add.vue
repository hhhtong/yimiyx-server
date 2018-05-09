<style lang="stylus" scoped>
.content {
  padding: 40px;
}

.slider {
  margin: 0 20px;
  height: 100%;

  &-con {
    height: 100%;
    overflow-y: scroll;
  }

  &-head {
    color: white;
    text-align: center;
    font-size: 18px;
  }
}
</style>

<template>
  <Layout style="height: 100%">
    <Content class="content">
      <Form ref="formData" :model="formData" :rules="formValidate" :label-width="90">
        <FormItem label="采购类别" prop="categoryID">
          <Select v-model="formData.categoryID" placeholder="请选择采购类别" filterable>
            <Option v-if="item.id !== 0" v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="采购商品">
          <Button icon="ios-plus-empty" type="dashed" size="small" @click="isCollapsed = false">添加</Button>
        </FormItem>
        <FormItem label="供货商" prop="supplierID">
          <Select v-model="formData.supplierID" placeholder="请选择供货商" filterable>
            <Option v-for="item in supplierListTemp" :value="item.id" :key="item.id">{{ item.supplierName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="经办人" prop="transactor">
          <Input v-model="formData.transactor" placeholder="请输入经办人姓名"></Input>
        </FormItem>
        <FormItem label="备注(选填)">
          <Input v-model="formData.remark" type="textarea" placeholder="请填写备注"></Input>
        </FormItem>
      </Form>
      <div class="footer">
        <Button type="primary" @click="handleSubmit">确 定</Button>
        <Button type="ghost" @click="handleReset" style="margin-left: 8px">重 置</Button>
      </div>
    </Content>
    <Sider
      breakpoint="md"
      collapsible
      reverse-arrow
      :width="600"
      :collapsed-width="78"
      v-model="isCollapsed">
      <Layout class="slider" v-show="!isCollapsed">
        <Header class="slider-head">请选择要采购的商品</Header>
        <Content class="slider-con">
          <Table :data="goodsList" :columns="goodsColumns" :loading="listLoading" stripe></Table>
        </Content>
      </Layout>
    </Sider>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'
import { cloneDeep } from 'lodash'
import { InputNumber } from 'iview'
import { purchaseOrderAdd, purchaseOrderUpdate, goodsGet, supplierGet } from '@/api'

const formData = {
  categoryID: '',
  goods: [],
  supplierID: '',
  transactor: '',
  remark: ''
}

export default {
  name: 'purchase-add',

  data() {
    const validate = msg => (rule, value, callback) => {
      return (value).toString() === '' ? callback(new Error(msg)) : callback()
    }

    const { isEdit } = this.$route.params

    return {
      isEdit,
      isCollapsed: !true,
      listLoading: false,
      goodsListTemp: this.goodsList,
      supplierListTemp: this.supplierList,
      formData,
      formValidate: {
        categoryID: [
          { validator: validate('请选择采购类别'), trigger: 'change' }
        ],
        goods: [
          { validator: validate('请选择要采购的商品'), trigger: 'change' }
        ],
        supplierID: [
          { validator: validate('请选择供货商'), trigger: 'change' }
        ],
        transactor: [
          { required: true, message: '请填写经办人姓名', trigger: 'blur' }
        ]
      },
      supplierList: [],
      goodsList: [],
      goodsColumns: [
        {
          type: 'selection',
          width: 60
        }, {
          title: '商品名称',
          key: 'goodsName',
          align: 'center'
        }, {
          title: '规格',
          key: 'spec',
          align: 'center',
          render: (h, { row, column, index }) => (
            <span>{row.spec + row.specUnit}</span>
          )
        }, {
          title: '库存',
          key: 'stockQty',
          align: 'center',
          sortable: true
        }, {
          title: '采购数量',
          key: 'handle',
          align: 'center',
          width: 130,
          render: (h, { row, column, index }) => (
            <div>
              <InputNumber v-model={this.goodsList[index].purchaseNum} min={0} on-on-change={() => this.handleNumChange(index)}></InputNumber>
            </div>
          )
        }
      ]
    }
  },

  computed: {
    ...mapState(['categoryList'])
  },

  watch: {
    'formData.categoryID'(newVal) {
      // 筛除符合商品类别的商品
      this.goodsListTemp = this.goodsList.filter(item => item.categorys.some(v => v.id === newVal))
      // 筛除符合商品类别的供货商
      this.supplierListTemp = this.supplierList.filter(item => item.category.id === newVal)
    }
  },

  created() {
    this.__getCategoryList()
    this.__getGoodsList()
    this.__getSupplierList()
  },

  methods: {
    handleSubmit() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          this.__save(this.formData)
        } else {
          this.$Message.error('请认真填写!')
        }
      })
    },
    handleReset() {
      this.$refs['formData'] && this.$refs['formData'].resetFields()
    },
    handleNumChange(index) {
      const row = this.goodsList[index]
      if (row.purchaseNum > 0) {
        row._checked = true
      } else {
        row._checked = false
      }
    },
    __save(formData) {

    },
    // 获取商品分类列表
    __getCategoryList() {
      if (this.categoryList.length === 0) {
        this.$store.dispatch('updateCategoryList')
      }
    },
    // 获取商品列表
    __getGoodsList() {
      goodsGet().then(result => {
        if (result.code === 50000) {
          result.data.list.forEach(item => {
            item.purchaseNum = 0
            item._checked = false
          })
          this.goodsList = result.data.list
        }
      })
    },
    // 获取供货商列表
    __getSupplierList() {
      this.listLoading = true
      supplierGet().then(result => {
        if (result.code === 50000) {
          this.supplierList = result.data.list
          this.listLoading = false
        }
      })
    }
  }
}
</script>