<style lang="stylus">
.modal-tree-item-con {
  float: right;
  margin-right: 32px;
}
</style>

<template>
  <Modal
    :value="show"
    :title="title"
    :mask-closable="false"
    @on-visible-change="handleVisibleChange"
    @on-ok="handleConfirm">
    <Tree :data="_treeData" :render="renderContent"></Tree>
  </Modal>
</template>

<script>
import { Icon } from 'iview'
export default {
  props: {
    title: String,
    treeData: Array,
    show: Boolean,
    idMax: Number
  },

  data() {
    return {
      deleteIds: []
    }
  },

  computed: {
    _treeData() {
      return this.treeData.map(item => ({ ...item, render: this.renderData }))
    }
  },

  methods: {
    handleConfirm() {
      this.$emit('handleSave', [this._treeData, this.deleteIds])
    },

    handleVisibleChange(val) {
      if (!val) {
        this.deleteIds = []
        this.$emit('update:show', false)
        this.$emit('update:treeData', [])
      }
    },

    renderData(h, { root, node, data }) {
      return (
        <span style={{ display: 'inline-block', width: '100%' }}>
          <span>
            <Icon type="ios-folder-outline" class="margin-right-8"></Icon>
            <span v-show={data.readonly} on-click={() => data.readonly = false}>{data.no}-{data.name}</span>
            <span v-show={!data.readonly}>
              <i-input
                v-model={data.no}
                clearable
                size="small"
                placeholder="编号"
                style={{ width: '50px' }}>
              </i-input>
              &nbsp;-&nbsp;
              <i-input
                v-model={data.name}
                clearable
                size="small"
                placeholder="请输入分类名称"
                style={{ width: '160px' }}>
              </i-input>
              <i-button
                type="success"
                size="small"
                icon="checkmark"
                style={{ width: '52px' }}
                on-click={() => this.save(root, node, data)}>
              </i-button>
            </span>
          </span>
          <span class="modal-tree-item-con">
            <i-button
              type="ghost"
              size="small"
              icon="ios-plus-empty"
              type="primary"
              disabled={!data.readonly}
              style={{ width: '52px' }}
              on-click={() => this.append(data)}>
            </i-button>
          </span>
        </span>
      )
    },

    renderContent(h, { root, node, data }) {
      return (
        <div style={{ display: 'inline-block', width: '100%' }}>
          <span>
            <Icon type="ios-folder-outline" class="margin-right-8"></Icon>
            <span v-show={data.readonly} on-click={() => data.readonly = false}>{data.no}-{data.name}</span>
            <span v-show={!data.readonly}>
              <i-input
                v-model={data.no}
                clearable
                size="small"
                placeholder="编号"
                style={{ width: '50px' }}>
              </i-input>
              &nbsp;-&nbsp;
              <i-input
                v-model={data.name}
                clearable
                size="small"
                placeholder="请输入分类名称"
                style={{ width: '160px' }}>
              </i-input>
              <i-button
                type="success"
                size="small"
                icon="checkmark"
                style={{ width: '52px' }}
                on-click={() => this.save(root, node, data)}>
              </i-button>
            </span>
          </span>
          <span class="modal-tree-item-con">
            <i-button
              type="ghost"
              size="small"
              icon="ios-plus-empty"
              class="margin-right-8"
              disabled={!data.readonly || data.type > 2}
              on-click={() => this.append(data)}>
            </i-button>
            <i-button
              type="ghost"
              size="small"
              icon="ios-minus-empty"
              on-click={() => this.remove(root, node, data)}>
            </i-button>
          </span>
        </div>
      )
    },

    append(data) {
      const children = data.children || []
      const id = this.idMax + 1
      const pid = data.id || 0
      const type = (data.type || 0) + 1
      children.push({
        no: '',
        name: '',
        expand: true,
        readonly: false,
        id,
        pid,
        type
      })
      this.$emit('update:idMax', id)
      this.$set(data, 'children', children)
    },

    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
      this.deleteIds.push(data.id)
    },

    save(root, node, data) {
      if (data.name === '') {
        return this.$Message.info('请填写分类名称')
      }
      data.readonly = true
    }
  }
}
</script>
