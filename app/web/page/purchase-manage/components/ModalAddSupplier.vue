<style lang="stylus">
</style>

<template>
  <div>
    <Modal
      :value="show"
      title="添加供货商"
      @on-visible-change="handleVisibleChange">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="负责人" prop="noNull">
          <Input v-model="formValidate.principal" placeholder="请输入负责人姓名"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="tel">
          <Input v-model="formValidate.tel" placeholder="请输入负责人联系电话"></Input>
        </FormItem>
        <FormItem label="所在地区" prop="area">
          <al-cascader v-model="formValidate.area" placeholder="请选择供货商所在地区"/>
        </FormItem>
        <FormItem label="详细地址" prop="address">
          <Input v-model="formValidate.address" type="textarea" :autosize="{ minRows: 2,maxRows: 4 }" placeholder="在此输入供货商所在详细地址"></Input>
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
        <FormItem label="银行名称" prop="noNull" v-if="_isBank">
          <Input v-model="formValidate.bankName" placeholder="请输入银行名称"></Input>
        </FormItem>
        <FormItem label="持卡人姓名" prop="noNull" v-if="_isBank">
          <Input v-model="formValidate.bankUsername" placeholder="请输入持卡人姓名"></Input>
        </FormItem>
        <FormItem :label="_accountNoLabel" prop="noNull">
          <Input v-model="formValidate.accountNo" placeholder="该账号为汇款账号，请务必认真填写"></Input>
        </FormItem>
        <FormItem label="开户行地址" prop="address" v-if="_isBank">
          <Input v-model="formValidate.bankAddress" type="textarea" :autosize="{ minRows: 2,maxRows: 4 }" placeholder="请输入开户行地址"></Input>
        </FormItem>
        <FormItem label="商品类目" prop="category">
          <Select v-model="formValidate.category" placeholder="请选择商品类">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit('formValidate')">确 定</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重 置</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { isMobilePhone } from 'validator'
console.info(require('area-data'))
const payTypeRadios = [
  { text: '银行转账', label: 'bank' },
  { text: '支付宝', label: 'ali' },
  { text: '微信', label: 'wechat' }
]

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const validateTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else if (!isMobilePhone(value, 'zh-CN')) {
        return callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }

    return {
      payTypeRadios,
      formValidate: {
        principal: '',
        tel: '',
        area: [],
        address: '',
        supplierType: 1,
        payType: 'ali',
        bankName: '',
        bankUsername: '',
        accountNo: '',
        bankAddress: '',
        category: []
      },
      ruleValidate: {
        noNull: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        tel: [
          { validator: validateTel, trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请选择一个城市', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' },
          { type: 'string', max: 50, message: '地址长度不能超过50个字符', trigger: 'blur' }
        ],
        payType: [
          { required: true, message: '请选择一个收款方式', trigger: 'change' }
        ],
        category: [
          { required: true, message: '请至少选择一个商品类目', trigger: 'change' }
        ]
      }
    }
  },

  watch: {
    'formValidate.supplierType'(val) {
      if (val === 2) {
        this.payTypeRadios = this.payTypeRadios.filter(item => item.label !== 'bank')
      } else {
        this.payTypeRadios = payTypeRadios
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
    _isBank() {
      return this.formValidate.payType === 'bank'
    }
  },

  methods: {
    handleVisibleChange(val) {
      !val && this.$emit('update:show', false)
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleSave', this.formValidate)
        } else {
          this.$Message.error('填写错误，请认真检查!')
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>