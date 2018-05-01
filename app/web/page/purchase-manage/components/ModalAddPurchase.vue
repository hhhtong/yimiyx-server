<template>
  <div>
    <Modal
      :value="show"
      title="创建采购单"
      @on-visible-change="handleVisibleChange">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="采购类别">
          <Select v-model="formValidate.categoryID" placeholder="请选择采购类别" filterable>
            <Option v-if="item.id !== 0" v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="采购商品" prop="goods">
          <Select v-model="formValidate.goods" placeholder="请选择商品" filterable multiple>
            <Option v-for="item in goodsListTemp" :value="item.id" :key="item.id">{{ item.goodsName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="供货商" prop="supplierID">
          <Select v-model="formValidate.supplierID" placeholder="请选择供货商" filterable>
            <Option v-for="item in supplierListTemp" :value="item.id" :key="item.id">{{ item.supplierName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="经办人" prop="transactor">
          <Input v-model="formValidate.transactor" placeholder="请输入经办人姓名"></Input>
        </FormItem>
        <FormItem label="备注">
          <Input v-model="formValidate.remark" placeholder="请填写备注"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit">确 定</Button>
        <Button type="ghost" @click="handleReset" style="margin-left: 8px">重 置</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

const formValidate = {
  categoryID: '',
  goods: [],
  supplierID: '',
  transactor: '',
  remark: ''
}

export default {
  name: 'ModalAddPurchase',

  props: {
    show: Boolean,
    defaultModalData: [Boolean, Object],
    categoryList: Array,
    goodsList: Array,
    supplierList: Array
  },

  data() {
    const validateID = msg => {
      return (rule, value, callback) => {
        if (!value) {
          return callback(new Error(msg))
        } else {
          callback()
        }
      }
    }

    return {
      isEdit: false,
      formValidate,
      goodsListTemp: this.goodsList,
      supplierListTemp: this.supplierList,
      ruleValidate: {
        catagoryID: [
          { validator: validateID('请选择采购类别'), trigger: 'change' }
        ],
        goods: [
          { validator: validateID('请选择要采购的商品'), trigger: 'change' }
        ],
        transactor: [
          { required: true, message: '请填写经办人姓名', trigger: 'blur' }
        ]
      }
    }
  },

  watch: {
    defaultModalData(newVal) {
      if (newVal) {
        newVal = cloneDeep(newVal)
        this.isEdit = true // 标记为编辑模式
        this.formValidate = newVal
      } else {
        this.isEdit = false // 标记为新增模式
        this.formValidate = cloneDeep(formValidate)
      }
    },
    'formValidate.categoryID'(newVal) {
      this.handleReset()
      // 筛除符合商品类别的商品
      this.goodsListTemp = this.goodsList.filter(item => item.categorys.some(v => v.id === newVal))
      // 筛除符合商品类别的供货商
      this.supplierListTemp = this.supplierList.filter(item => item.category.id === newVal)
    }
  },

  methods: {
    handleVisibleChange(val) {
      if (!val) {
        this.$emit('update:show', false)
        this.handleReset()
      }
    },
    handleSubmit() {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this.$emit('handleSave', { ...this.formValidate }, this.isEdit)
        } else {
          this.$Message.error('存在不符合格式的内容, 请认真填写!')
        }
      })
    },
    handleReset() {
      this.$refs['formValidate'] && this.$refs['formValidate'].resetFields()
    }
  }
}
</script>