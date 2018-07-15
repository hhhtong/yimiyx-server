<!--
  Description 商品上架信息详情页
  @date    2018-07-15 17:17:55
-->
<style lang="stylus" scoped>
.content {
  padding: 40px;
}

.footer {
  text-align: right;
}

.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;

  img {
    width: 100%;
    height: 100%;
  }

  &-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);

    i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }
  }

  &:hover &-cover {
    display: block;
  }
}
</style>

<template>
  <Layout style="height: 100%">
    <Content class="content">
      <Form ref="formData" :model="formData" :rules="formValidate" :label-width="90">
        <FormItem label="商品标签" prop="tags">
          <Input v-model="formData.tags" placeholder="多个标签请用逗号隔开 如:清脆,农场饲养,纯天然"></Input>
        </FormItem>
        <FormItem label="商品描述" prop="description">
          <Input v-model="formData.description" placeholder="我是一只会喊66的洋白菜"></Input>
        </FormItem>
        <FormItem label="进价">
          <InputNumber
            style="width: 180px"
            v-model="formData.unitPrice"
            :formatter="value => `${value}元/${spec}`"
            :parser="value => value.replace(`元/${spec}`, '')">
          </InputNumber>
        </FormItem>
        <FormItem label="售价">
          <InputNumber
            style="width: 180px"
            v-model="formData.resalePrice"
            :formatter="value => `${value}元/${spec}`"
            :parser="value => value.replace(`元/${spec}`, '')">
          </InputNumber>
        </FormItem>
        <FormItem label="出售数量">
          <InputNumber style="width: 180px" v-model="formData.goodsAmount"></InputNumber>
        </FormItem>
        <FormItem label="商品图片">
          <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :headers="{ 'x-csrf-token': token }"
            :data="{ goodsNo }"
            multiple
            type="drag"
            action="/goods/uploadImg"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="View Image" v-model="visible">
            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
          </Modal>
        </FormItem>
      </Form>
      <div class="footer">
        <Button type="primary" @click="handleSubmit">确 定</Button>
        <Button type="ghost" @click="handleReset" style="margin-left: 8px">重 置</Button>
      </div>
    </Content>
  </Layout>
</template>


<script>
// import util from '@/libs/util'
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
// import { InputNumber } from 'iview'
import { goodsSaveDesc } from '@/api'

const formData = {
  tags: '',
  supplierID: '',
  unitPrice: 0,
  resalePrice: 0,
  goodsAmount: 0
}

export default {
  name: 'goods-desc',

  data() {
    // const editRowData = this.$route.params
    const { goodsNo, spec } = this.$route.query

    return {
      defaultList: [
        {
          'name': 'a42bdcc1178e62b4694c830f028db5c0',
          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
          'name': 'bc7521e033abdd1e92222d733590f104',
          'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        }
      ],
      imgName: '',
      visible: false,
      uploadList: [],

      goodsNo,
      spec,
      // isEdit,
      listLoading: false,
      // formData: editRowData ? editRowData : cloneDeep(formData),
      formData: cloneDeep(formData),
      formValidate: {
        tags: [
          { required: true, message: '请至少填写一个商品标签', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请填写商品描述', trigger: 'blur' }
        ]
      },
    }
  },

  computed: {
    ...mapGetters(['token'])
  },

  created() { },

  mounted() {
    this.uploadList = this.$refs.upload.fileList
  },

  methods: {
    handleView(name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess(res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
      file.name = '7eb99afb9d5f317c912f08b5212fd69a'
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
    },

    handleSubmit() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          this.__save(this.formData)
        } else {
          this.$Message.error('请认真填写')
        }
      })
    },
    handleReset() {
      this.$refs['formData'] && this.$refs['formData'].resetFields()
    },
    __save(formData) {
      goodsSaveDesc(formData).then(result => {
        if (result.code === 50000) {
          this.$Message.success('保存成功')
          this.formData = cloneDeep(formData) // 清空表单数据
          // 关闭当前标签并返回商品列表
          const { name } = this.$route
          this.$store.commit('removeTag', name)
          this.$store.commit('closePage', name)
          this.$router.replace({ name: 'goods-list' })
          localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList)
        }
      })
    }
  }
}
</script>
