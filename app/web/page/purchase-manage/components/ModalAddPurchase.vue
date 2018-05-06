<template>
  <div>
    <Modal
      :value="show"
      title="创建采购单"
      @on-visible-change="handleVisibleChange">
      <Form ref="formData" :model="formData" :rules="formValidate" :label-width="90">
        <FormItem label="采购类别" prop="categoryID">
          <Select v-model="formData.categoryID" placeholder="请选择采购类别" filterable>
            <Option v-if="item.id !== 0" v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="采购商品" prop="goods">
          <Select v-model="formData.goods" placeholder="请选择商品" filterable multiple>
            <Option v-for="item in goodsListTemp" :value="item.id" :key="item.id">{{ item.goodsName }}</Option>
          </Select>
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
      <div slot="footer">
        <Button type="primary" @click="handleSubmit">确 定</Button>
        <Button type="ghost" @click="handleReset" style="margin-left: 8px">重 置</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

const formData = {
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
    const validate = msg => (rule, value, callback) => {
      return (value).toString() === '' ? callback(new Error(msg)) : callback()
    }

    return {
      isEdit: false,
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
      }
    }
  },

  watch: {
    defaultModalData(newVal) {
      if (newVal) {
        newVal = cloneDeep(newVal)
        this.isEdit = true // 标记为编辑模式
        this.formData = newVal
      } else {
        this.isEdit = false // 标记为新增模式
        this.formData = cloneDeep(formData)
      }
    },
    'formData.categoryID'(newVal) {
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
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          this.$emit('handleSave', { ...this.formData }, this.isEdit)
        } else {
          this.$Message.error('请认真填写!')
        }
      })
    },
    handleReset() {
      this.$refs['formData'] && this.$refs['formData'].resetFields()
    }
  }
}
</script>