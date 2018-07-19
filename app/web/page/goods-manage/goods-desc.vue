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
          <!-- <Input style="width: 420px" v-model="formData.tag" clearable placeholder="多个标签请用逗号隔开 如:清脆,农场饲养,纯天然"></Input> -->
          <Input
            style="width: 420px"
            v-model="tag"
            clearable
            icon="ios-pricetags"
            placeholder="输入完毕之后按下回车以生成标签"
            @keyup.native.enter="handleAddTag">
          </Input>
          <div v-if="formData.tags && formData.tags.length > 0" class="margin-top-8">
            <Tag
              v-for="(tagValue, index) in formData.tags"
              :key="index" :name="tagValue"
              closable
              @on-close="formData.tags.splice(index, 1)">
              {{ tagValue }}
            </Tag>
          </div>
        </FormItem>
        <FormItem label="商品描述" prop="description">
          <Input style="width: 420px" v-model="formData.description" clearable type="textarea" placeholder="我是一只会喊66的洋白菜"></Input>
        </FormItem>
        <FormItem label="进价">
          <Input style="width: 180px" v-model="formData.unitPrice">
            <Button slot="append">{{ `元/${formData.spec}` }}</Button>
          </Input>
        </FormItem>
        <FormItem label="售价">
          <Input style="width: 180px" v-model="formData.resalePrice">
            <Button slot="append">{{ `元/${formData.spec}` }}</Button>
          </Input>
        </FormItem>
        <FormItem label="出售数量">
          <InputNumber style="width: 180px" v-model="formData.goodsAmount"></InputNumber>
        </FormItem>
        <FormItem label="商品图片" prop="imgs">
          <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleViewImg(item.url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemoveImg(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultFileList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :headers="{ 'x-csrf-token': token }"
            :data="{ goodsNo: formData.goodsNo }"
            multiple
            type="drag"
            action="/goods/uploadImg"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="View Image" v-model="visible">
            <img :src="imgBigSrc" v-if="visible" style="width: 100%">
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
import { goodsSaveFull } from '@/api'

export default {
  name: 'goods-desc',

  data() {
    const validateTags = (rule, value, callback) => {
      this.formData.tags.length === 0 ? callback(new Error('请填写标签')) : callback()
    }
    const validateImgs = (rule, value, callback) => {
      this.uploadList.length === 0 ? callback(new Error('请至少上传一张图片')) : callback()
    }

    return {
      visible: false,
      uploadList: [],
      imgBigSrc: '',
      tag: '',
      formData: this.$route.params,
      formValidate: {
        tags: [
          { validator: validateTags, trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请填写商品描述', trigger: 'blur' }
        ],
        imgs: [
          { validator: validateImgs, trigger: 'blur' }
        ]
      },
    }
  },

  computed: {
    ...mapGetters(['token']),
    defaultFileList() {
      if (!this.formData.imgs) return []
      return JSON.parse(this.formData.imgs).map(url => {
        return { url, status: 'finished' }
      })
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.formData = to.params
      if (vm.$helper.isEmptyObj(vm.defaultFileList)) {
        vm.uploadList = vm.$refs.upload.fileList
      } else {
        vm.uploadList = vm.defaultFileList
      }
    })
  },

  beforeRouteLeave(to, from, next) {
    this.$refs.upload.clearFiles()
    next()
  },

  methods: {
    handleAddTag() {
      const tag = this.tag.trim()
      const { tags } = this.formData
      if (tag === '') {
        this.$Notice.warning({ title: '请输入标签内容。' })
      } else if (tags.length > 10) {
        this.$Notice.warning({ title: '最多可以添加10个标签。' })
      } else {
        tags.push(tag)
        this.tag = ''
      }
    },
    handleViewImg(url) {
      this.imgBigSrc = url
      this.visible = true
    },
    handleRemoveImg(file) {
      const { fileList } = this.$refs.upload
      fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess(res, file) {
      const { url, filename } = res.data
      file.url = url
      file.name = filename
      this.uploadList = this.$refs.upload.fileList
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确, 请选择 jpg 或者 png。'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '文件大小超过限制',
        desc: '文件  ' + file.name + ' 太大了, 最大 2M.'
      })
    },
    handleBeforeUpload(file) {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({ title: '最多可以上传5张图片。' })
      }
      return check
    },
    handleSubmit() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          const imgs = JSON.stringify(this.uploadList.map(item => item.url))
          this.__save({ ...this.formData, imgs })
        } else {
          this.$Message.error('填写有误，请检查')
        }
      })
    },
    handleReset() {
      this.$refs['formData'] && this.$refs['formData'].resetFields()
    },
    __save(formData) {
      goodsSaveFull(formData).then(result => {
        if (result.code === 50000) {
          this.$Message.success('保存成功')
          // 关闭当前标签并返回商品列表
          const { name } = this.$route
          this.$store.commit('removeTag', name)
          this.$store.commit('closePage', name)
          this.$router.replace({ name: 'goods-list', params: { refresh: true } })
          localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList)
        }
      })
    }
  }
}
</script>
