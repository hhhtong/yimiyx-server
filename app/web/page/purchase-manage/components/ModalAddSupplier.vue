<style lang="stylus">
</style>

<template>
  <div>
    <Modal
      :value="show"
      title="添加供货商"
      @on-visible-change="handleVisibleChange">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="负责人" prop="linkmanName">
          <Input v-model="formValidate.linkmanName" placeholder="请输入负责人姓名"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="tel">
          <Input v-model="formValidate.tel" :maxlength="11" placeholder="请输入负责人联系电话"></Input>
        </FormItem>
        <FormItem label="所在地区">
          <al-cascader v-model="formValidate.area" placeholder="请选择供货商所在地区"/>
        </FormItem>
        <FormItem label="详细地址" prop="address">
          <Input v-model="formValidate.address" type="textarea" :autosize="{ minRows: 2,maxRows: 4 }" placeholder="在此输入供货商所在详细地址"></Input>
        </FormItem>
        <FormItem label="供货商名称" prop="supplierName">
          <Input v-model="formValidate.supplierName" placeholder="请输入供货商名称"></Input>
        </FormItem>
        <FormItem label="供货商类型" required>
          <Select v-model="formValidate.supplierType" placeholder="选择供货商类型">
            <Option :value="1">公司</Option>
            <Option :value="2">个人</Option>
          </Select>
        </FormItem>
        <FormItem label="收款方式" prop="payType">
          <RadioGroup v-model="formValidate.payType">
            <Radio
              v-for="item in payTypeRadios"
              :key="item.label"
              :label="item.label"
              >{{ item.text }}
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="银行名称" prop="bankName" v-if="_isBank">
          <Input v-model="formValidate.bankName" placeholder="请输入银行名称"></Input>
        </FormItem>
        <FormItem label="持卡人姓名" prop="bankUsername" v-if="_isBank">
          <Input v-model="formValidate.bankUsername" placeholder="请输入持卡人姓名"></Input>
        </FormItem>
        <FormItem :label="_accountNoLabel" prop="accountNo">
          <Input v-model="formValidate.accountNo" placeholder="该账号为收款账号，请务必认真填写"></Input>
        </FormItem>
        <FormItem label="税务号" v-if="_isCorp">
          <Input v-model="formValidate.taxNo" placeholder="请输入税务登记号"></Input>
        </FormItem>
        <FormItem label="开户行地址" prop="address" v-if="_isBank">
          <Input v-model="formValidate.bankAddress" type="textarea" :autosize="{ minRows: 2,maxRows: 4 }" placeholder="请输入开户行地址"></Input>
        </FormItem>
        <FormItem label="经营产品" prop="categoryID">
          <Select v-model="formValidate.categoryID" placeholder="请选择商品分类" filterable>
            <Option v-if="item.id !== 0" v-for="item in categoryOptions" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
import { checkMobile } from '~/libs/tools/validator'
import { cloneDeep } from 'lodash'

const payTypeRadios = [
  { text: '银行转账', label: 'bank' },
  { text: '支付宝', label: 'ali' },
  { text: '微信', label: 'wechat' }
]

const formValidate = {
  linkmanName: '',
  tel: '',
  area: [],
  address: '',
  supplierName: '',
  supplierType: 1,
  payType: 'ali',
  bankName: '',
  bankUsername: '',
  accountNo: '',
  taxNo: '',
  bankAddress: '',
  categoryID: ''
}

export default {
  props: {
    show: Boolean,
    categoryOptions: Array,
    defaultModalData: [Boolean, Object]
  },

  data() {
    const validateTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else if (!checkMobile(value)) {
        return callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }

    const notNull = [
      { required: true, message: '该项不能为空', trigger: 'blur' }
    ]

    const validateID = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请至少选择一个经营产品'))
      } else {
        callback()
      }
    }

    return {
      isEdit: false,
      payTypeRadios,
      formValidate,
      ruleValidate: {
        linkmanName: notNull,
        bankName: notNull,
        bankUsername: notNull,
        accountNo: notNull,
        tel: [
          { validator: validateTel, trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' },
          { type: 'string', max: 50, message: '地址长度不能超过50个字符', trigger: 'blur' }
        ],
        supplierName: [
          { required: true, message: '供货商名称不能为空', trigger: 'blur' },
          { type: 'string', max: 50, message: '供货商名称为50个字符以内', trigger: 'blur' }
        ],
        payType: [
          { required: true, message: '请选择一个收款方式', trigger: 'change' }
        ],
        categoryID: [
          { validator: validateID, trigger: 'change' }
        ]
      }
    }
  },

  watch: {
    defaultModalData(val) {
      if (val) {
        val = cloneDeep(val)
        val.area = val.areaCode.split(',')
        this.isEdit = true // 标记为编辑模式
        this.formValidate = val
      } else {
        this.isEdit = false // 标记为新增模式
        this.formValidate = cloneDeep(formValidate)
      }
    }
  },

  computed: {
    _accountNoLabel() {
      switch (this.formValidate.payType) {
        case 'bank': return '银行卡账号'
        case 'ali': return '支付宝账号'
        case 'wechat': return '微信账号'
      }
    },
    // 是否选中公司
    _isCorp() {
      return this.formValidate.supplierType === 1
    },
    // 是否选中银行卡
    _isBank() {
      return this.formValidate.payType === 'bank'
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
          const formData = this.formValidate
          const area = formData.area

          if (area.length === 0) {
            return this.$Message.error('请选择供货商所在地区!')
          }

          const areaCode = area.map(item => item.code).toString()
          const areaName = area.map(item => item.name).toString()

          this.$emit('handleSave', { ...formData, areaCode, areaName }, this.isEdit)
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