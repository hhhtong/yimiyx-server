<style lang="stylus">
.poptip-select {
  display: block;

  &:not(:first-child) {
    margin-top: 10px;
    white-space: normal;
  }
}
</style>

<template>
  <div>
    <Modal
      :value="show"
      title="添加商品"
      @on-visible-change="handleVisibleChange">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="商品名称" prop="goodsName">
          <Input v-model="formValidate.goodsName" placeholder="请输入商品名称"></Input>
        </FormItem>
        <FormItem label="商品别名">
          <Input v-model="formValidate.goodsAlias" placeholder="请输入别名"></Input>
        </FormItem>
        <FormItem label="商品规格" prop="specification">
          <Input v-model="formValidate.specification" placeholder="请输入商品规格"></Input>
        </FormItem>
        <FormItem label="商品分类">
          <div>
            <Tag
              :color="randomColor()"
              v-for="item in categorys"
              :key="item.no"
              :name="item.no"
              closable
              @on-close="() => handleClose(item)">
              {{ item.name }}
            </Tag>
            <Poptip v-model="showPoptip" placement="bottom" width="250">
              <div slot="title"><i>请在下方选择(二级以下类目支持多选)</i></div>
              <div slot="content">
                <Select class="poptip-select" v-model="categoryParent" placeholder="请选择" filterable>
                  <Option v-if="item.id !== 0" v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Select class="poptip-select" v-show="hasChildren(_categoryList)" v-model="categoryChild" placeholder="请选择" filterable multiple>
                  <OptionGroup v-if="item.id !== 0" v-for="item in _categoryList" :key="item.id" :label="item.name">
                    <Option v-for="children in item.children" :value="children.id" :key="children.id">{{ children.name }}</Option>
                  </OptionGroup>
                </Select>
                <Select class="poptip-select" v-show="!hasChildren(_categoryList) && _categoryList.length > 0" v-model="categoryChild" placeholder="请选择" filterable multiple>
                  <Option v-for="item in _categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Row type="flex" justify="end" class="margin-top-20">
                  <Button type="text" size="small" @click="showPoptip = false">取消</Button>
                  <Button type="primary" size="small" @click="handleAddTag">确定</Button>
                </Row>
              </div>
              <Button icon="ios-plus-empty" type="dashed" size="small">添加类别</Button>
            </Poptip>
          </div>
        </FormItem>
        <FormItem label="库存(选填)">
          <InputNumber v-model="formValidate.stockQty" :max="99999" :min="0" :step="10"></InputNumber>
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
import { mapState } from 'vuex'

const formValidate = {
  goodsName: '',
  goodsAlias: '',
  specification: '',
  stockQty: 0
}

const colors = ['yellow', 'red', 'blue', 'green']

export default {
  props: {
    show: Boolean,
    categoryList: Array,
    defaultModalData: [Boolean, Object]
  },

  data() {
    return {
      isEdit: false,
      showPoptip: false,
      categorys: [],
      categoryParent: null,
      categoryChild: [],
      formValidate,
      ruleValidate: {
        goodsName: [
          { required: true, message: '商品名称为必填项', trigger: 'blur' }
        ],
        specification: [
          { required: true, message: '商品规格为必填项', trigger: 'blur' },
        ]
      }
    }
  },

  computed: {
    ...mapState(['categoryListEqual']),
    _categoryList() {
      const oneList = this.categoryList.filter(item => item.id === this.categoryParent)
      if (oneList[0] && oneList[0].children)
        return oneList[0].children
      return []
    }
  },

  watch: {
    defaultModalData(val) {
      if (val) {
        val = cloneDeep(val)
        this.isEdit = true // 标记为编辑模式
        this.formValidate = val
        this.categorys = val.categorys
      } else {
        this.isEdit = false // 标记为新增模式
        this.formValidate = cloneDeep(formValidate)
        this.categorys = []
      }
    }
  },

  methods: {
    hasChildren(list) {
      return list[0] && list[0].children
    },
    randomColor() {
      return colors[Math.floor(Math.random() * colors.length)]
    },
    handleClose(item) {
      this.categorys.splice(this.categorys.indexOf(item), 1)
    },
    handleAddTag() {
      const newCategorys = this._getJoinCategory(this.categoryChild)
      this.categorys = [...this.categorys, ...newCategorys]
      this.categoryParent = null
      this.categoryChild = []
      this.showPoptip = false
    },
    _getJoinCategory(list) {
      const tempArr = []
      const done = (item, _tempObj) => {
        const current = _tempObj
          ? item
          : this.categoryListEqual.filter(v => v.id === item)[0]
        const parent = this.categoryListEqual.filter(v => v.id === current.pid)[0]
        const no = parent.no + current.no
        const name = `${parent.name} / ${current.name}`
        const tempObj = { no, name, categoryIds: { id: current.id } }

        if (_tempObj) {
          _tempObj.no = parent.no + _tempObj.no
          _tempObj.name = `${parent.name} / ${_tempObj.name}`
        } else {
          tempArr.push(tempObj)
        }

        if (parent.type !== 1) {
          done(parent, tempObj)
        }
      }

      for (const item of list) {
        done(item)
      }

      return tempArr
    },
    handleDone() {

    },
    handleCancel() {

    },
    handleVisibleChange(val) {
      if (!val) {
        this.$emit('update:show', false)
        this.handleReset()
      }
    },
    handleSubmit() {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          const data = { ...this.formValidate, categorys: this.categorys }
          this.$emit('handleSave', data, this.isEdit)
        } else {
          this.$Message.error('请根据输入框内提示认真填写!')
        }
      })
    },
    handleReset() {
      this.$refs['formValidate'].resetFields()
    }
  }
}
</script>