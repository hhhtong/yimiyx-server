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
      :mask-closable="false"
      @on-visible-change="handleVisibleChange">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="商品名称" prop="goodsName">
          <Input v-model="formValidate.goodsName" placeholder="请输入商品名称"></Input>
        </FormItem>
        <FormItem label="商品别名(选填)">
          <Input v-model="formValidate.goodsAlias" placeholder="请输入别名"></Input>
        </FormItem>
        <FormItem label="商品规格" prop="spec">
          <Input
            v-model="formValidate.spec"
            @click.native="!isEdit && isOnce && (formValidate.spec = '')"
            @on-blur="isOnce = false"
            placeholder="比如：450"
            style="width: 180px">
            <Select v-model="formValidate.specUnit" slot="append" style="width: 70px">
              <Option value="g">g</Option>
              <Option value="个">个</Option>
            </Select>
          </Input>
        </FormItem>
        <FormItem label="商品分类">
          <div>
            <Tag
              :color="index | stokeColor"
              v-for="(item, index) in categorys"
              :key="item.no"
              :name="item.no"
              closable
              @on-close="() => handleDelete(item)">
              {{ item.name }}
            </Tag>

            <Poptip v-model="showPoptip" placement="left-end" width="280">
              <div slot="title"><i>添加分类</i></div>
              <div slot="content">
                <div v-if="historyCategorys.length > 0" style="white-space: normal">
                  <div style="color: #a1a1a1">
                    历史记录
                    <Button type="text" @click="setHistoryCategorys(true)" style="padding: 0">清空</Button>
                  </div>
                  <Tag
                    type="dot"
                    :color="index | stokeColor"
                    v-for="(historyItem, index) in historyCategorys"
                    :key="historyItem.no"
                    :name="historyItem.no"
                    closable
                    @on-close="() => handleDelete2(historyItem)"
                    @click.native="handleAddTag(historyItem)">
                    {{ historyItem.name }}
                  </Tag>
                </div>

                <div class="margin-top-10" style="color: #a1a1a1">二级以下类目支持多选</div>
                <Select class="poptip-select" v-model="categoryParent" placeholder="请选择" filterable>
                  <Option v-if="item.id !== 0" v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Select class="poptip-select" v-show="hasChildren(_categoryList)" v-model="categoryChild" placeholder="请选择" filterable multiple placement="top">
                  <OptionGroup v-if="item.id !== 0" v-for="item in _categoryList" :key="item.id" :label="item.name">
                    <Option v-for="children in item.children" :value="children.id" :key="children.id">{{ children.name }}</Option>
                  </OptionGroup>
                </Select>
                <Select class="poptip-select" v-show="!hasChildren(_categoryList) && _categoryList.length > 0" v-model="categoryChild" placeholder="请选择" filterable multiple placement="top">
                  <Option v-for="item in _categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Row type="flex" justify="end" class="margin-top-20">
                  <Button type="text" size="small" @click="showPoptip = false">取消</Button>
                  <Button type="primary" size="small" @click="handleAddTag(false)">确定</Button>
                </Row>
              </div>
              <Button icon="ios-plus-empty" type="dashed" size="small">添加分类</Button>
            </Poptip>
          </div>
        </FormItem>
        <FormItem label="产地(选填)">
          <Input v-model="formValidate.madeIn" type="textarea" placeholder="请填写该商品的原产地"></Input>
        </FormItem>
        <!-- <FormItem label="库存(选填)">
          <InputNumber v-model="formValidate.stockQty" :max="99999" :min="0" :step="10" style="width: 180px"></InputNumber>
        </FormItem> -->
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit" :loading="loading" class="margin-right-8">确 定</Button>
        <Button type="ghost" @click="handleReset">重 置</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { mapState } from 'vuex'
import tagColors from './TagColors.js'

const formValidate = {
  goodsName: '',
  goodsAlias: '',
  spec: '450',
  specUnit: 'g',
  madeIn: '',
  stockQty: 0
}

export default {
  props: {
    show: Boolean,
    categoryList: Array,
    defaultModalData: [Boolean, Object]
  },

  data() {
    const historyCategorys = this.getHistoryCategorys()

    return {
      isOnce: true,
      isEdit: false,
      showPoptip: false,
      loading: false,
      historyCategorys,
      categorys: [],
      categoryParent: null,
      categoryChild: [],
      formValidate,
      ruleValidate: {
        goodsName: [
          { required: true, message: '商品名称为必填项', trigger: 'blur' }
        ],
        spec: [
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
        this.categorys = this.getJoinCategory(val.categorys.map(item => item.id))
      } else {
        this.isEdit = false // 标记为新增模式
        this.formValidate = cloneDeep(formValidate)
        this.categorys = []
      }
    }
  },

  filters: {
    stokeColor(index) {
      return tagColors[index % tagColors.length]
    }
  },

  created() {
    this.$on('handleSave', (data, isEdit) => {
      this.loading = true
      setTimeout(() => this.loading = false, 1500)
    })
  },

  methods: {
    hasChildren(list) {
      return list[0] && list[0].children
    },

    handleDelete(item, k = 'categorys') {
      this[k].splice(this[k].indexOf(item), 1)
    },

    handleDelete2(item) {
      this.handleDelete(item, 'historyCategorys')
      this.setHistoryCategorys()
    },

    handleAddTag(item) {
      if (item && !this.hasExistCategorys(item.categoryIds.id)) {
        this.categorys = [...this.categorys, item]
      } else {
        const newCategorys = this.getJoinCategory(this.categoryChild)
        this.categorys = [...this.categorys, ...newCategorys]
      }

      this.categoryParent = null
      this.categoryChild = []
      this.showPoptip = false
    },

    // 暴露给父级调用
    GetJoinCategory(idsArr) {
      return this.getJoinCategory(idsArr)
    },

    hasExistCategorys(id) {
      return this.categorys.some(v => v.categoryIds.id === id)
    },

    getJoinCategory(idsArr) {
      const tempArr = []
      const done = (id, _tempObj) => {
        // 已存在该列表的 就出循环， 防止重复选
        if (this.hasExistCategorys(id)) return false

        const current = _tempObj ? id : this.categoryListEqual.filter(v => v.id === id)[0]

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

      for (const id of idsArr) {
        done(id)
      }

      return tempArr
    },

    handleVisibleChange(val) {
      this.isOnce = val
      if (!val) {
        this.$emit('update:show', false)
        this.$emit('handleClose')
        this.handleReset()
      }
    },

    handleSubmit() {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          if (this.categorys.length === 0) {
            return this.$Message.error('请至少添加一个分类!')
          }

          const data = { ...this.formValidate, categorys: this.categorys }
          this.$emit('handleSave', data, this.isEdit)
          this.setHistoryCategorys()
        } else {
          this.$Message.error('请根据输入框内提示认真填写!')
        }
      })
    },

    /**
     * @param {Boolean} isDeep - 为true时清空所有的
     */
    setHistoryCategorys(isDeep = false) {
      if (isDeep) {
        this.historyCategorys = []
      } else {
        const historyCategorys = this.historyCategorys
          .filter(item => !this.hasExistCategorys(item.categoryIds.id))
        // 最终存储最近选择过的三条
        this.historyCategorys = [...this.categorys.reverse(), ...historyCategorys].slice(0, 3)
      }

      localStorage.setItem('__historyCategorys__', JSON.stringify(this.historyCategorys))
    },

    // 获取最近选择过的类目, 用于添加商品框的辅助操作
    getHistoryCategorys() {
      const historyCategorys = localStorage.getItem('__historyCategorys__')
      if (historyCategorys)
        return JSON.parse(historyCategorys)
      return []
    },

    handleReset() {
      this.formValidate.goodsAlias = ''
      this.formValidate.stockQty = 0
      this.categorys = []
      this.$refs['formValidate'].resetFields()
    }
  }
}
</script>