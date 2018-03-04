<template>
  <Tree :data="data5" :render="renderContent"></Tree>
</template>

<script>
import { Icon } from 'iview'

export default {
  data() {
    return {
      buttonProps: {
        type: 'ghost',
        size: 'small'
      },
      data5: [
        {
          title: 'parent 1',
          expand: true,
          render: this.renderData,
          children: [{
            title: 'child 1-1',
            expand: true,
            children: [
              { title: 'leaf 1-1-1', expand: true },
              { title: 'leaf 1-1-2', expand: true }
            ]
          }, {
            title: 'child 1-2',
            expand: true,
            children: [
              { title: 'leaf 1-2-1', expand: true },
              { title: 'leaf 1-2-1', expand: true }
            ]
          }]
        }
      ]
    }
  },

  methods: {
    renderData(h, { root, node, data }) {
      return (
        <span style={{ display: 'inline-block', width: '100%' }}>
          <span>
            <Icon props={{ type: 'ios-folder-outline' }} style={{ marginRight: '8px' }}></Icon>
            <span>{data.title}</span>
          </span>
          <span style={{ display: 'inline-block', float: 'right', marginRight: '32px' }}>
            <i-button
              props={
                Object.assign({}, this.buttonProps, {
                  icon: 'ios-plus-empty',
                  type: 'primary'
                })
              }
              style={{ width: '52px' }}
              onClick={() => this.append(data)}>
            </i-button>
          </span>
        </span>
      )
    },

    renderContent(h, { root, node, data }) {
      return (
        <span style={{ display: 'inline-block', width: '100%' }}>
          <span>
            <Icon props={{ type: 'ios-folder-outline' }} style={{ marginRight: '8px' }}></Icon>
            <span>{data.title}</span>
          </span>
          <span style={{ display: 'inline-block', float: 'right', marginRight: '32px' }}>
            <i-button
              props={Object.assign({}, this.buttonProps, {
                icon: 'ios-plus-empty'
              })}
              style={{ marginRight: '8px' }}
              onClick={() => this.append(data)}>
            </i-button>
            <i-button
              props={Object.assign({}, this.buttonProps, {
                icon: 'ios-minus-empty'
              })}
              onClick={() => this.remove(root, node, data)}>
            </i-button>
          </span>
        </span>
      )
    },

    append(data) {
      const children = data.children || [];
      children.push({
        title: 'appended node',
        expand: true
      });
      this.$set(data, 'children', children);
    },

    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    }
  }
}
</script>
