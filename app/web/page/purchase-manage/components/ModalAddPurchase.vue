<template>
  <div>
    <Modal
      :value="show"
      title="创建采购单"
      @on-visible-change="handleVisibleChange">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="经办人" prop="transactor">
          <Input v-model="formValidate.transactor" placeholder="请输入经办人姓名"></Input>
        </FormItem>
        <FormItem label="供货商" prop="supplierID">
          <Input v-model="formValidate.supplierID" placeholder="请选择供货商"></Input>
        </FormItem>
        <FormItem label="采购类别" prop="categoryID">
          <Select v-model="formValidate.categoryID" placeholder="请选择商品分类" filterable>
            <Option v-if="item.id !== 0" v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
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
  transactor: '',
  supplierID: '',
  categoryID: ''
}

export default {
  name: 'ModalAddPurchase',

  props: {
    show: Boolean,
    categoryList: Array,
    defaultModalData: [Boolean, Object]
  },

  data() {
    const notNull = [
    ]

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
      ruleValidate: {
        transactor: [
          { required: true, message: '请填写经办人姓名', trigger: 'blur' }
        ],
        supplierID: [
          { validator: validateID('请选择供货商'), trigger: 'change' }
        ],
        categoryID: [
          { validator: validateID('请选择商品分类'), trigger: 'change' }
        ]
      }
    }
  },

  watch: {
    defaultModalData(val) {
      if (val) {
        val = cloneDeep(val)
        this.isEdit = true // 标记为编辑模式
        this.formValidate = val
      } else {
        this.isEdit = false // 标记为新增模式
        this.formValidate = cloneDeep(formValidate)
      }
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
      this.$refs['formValidate'].resetFields()
    }
  }
}
</script>