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

size-1 = 120px;
size-2 = 60px;

initSize(size) {
  width: size;
  height: size;
  line-height: size;
}

.upload-list {
  display: inline-block;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;

  &-1 {
    initSize(size-1)
  }

  &-2 {
    initSize(size-2)
  }

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

.upload-camera {
  &-1 {
    initSize(size-1 - 2px)
  }

  &-2 {
    initSize(size-2 - 2px)
  }
}
</style>

<template>
  <Layout style="height: 100%">
    <Content class="content">
      <Row>
        <Col style="min-width: 340px" :lg="{ span: 6 }" :sm="{ span: 12 }">
          <Card dis-hover>
            <p slot="title">{{ formData.goodsName }}</p>
            <p>商品编号：{{ formData.goodsNo }}</p>
            <p>商品别名：{{ $helper.beautifyCell(formData.goodsAlias) }}</p>
            <p>规格：{{ formData.spec }}</p>
            <!-- <p>所属分类：{{ formData.categoryName }}</p> -->
            <p>产地：{{ $helper.beautifyCell(formData.madeIn) }}</p>
            <p>所在仓库：{{ $helper.beautifyCell(formData.storeName) }}</p>
            <p>库存：{{ formData.stockQty }}</p>
          </Card>
        </Col>
        <Col style="min-width: 320px" :lg="{ span: 8, offset: 1 }" :sm="{ span: 12, offset: 0 }">
          <Form ref="formData" :model="formData" :rules="formValidate" :label-width="90">
            <FormItem label="商品标签" prop="tags">
              <Input
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
              <Input v-model="formData.description" clearable type="textarea" placeholder="我是一只会喊66的洋白菜"></Input>
            </FormItem>
            <FormItem label="进价">
              <Input v-model="formData.unitPrice" placeholder="请在此输入进价">
                <Button slot="append">{{ `元/${formData.spec}` }}</Button>
              </Input>
            </FormItem>
            <FormItem label="售价">
              <Input v-model="formData.resalePrice" placeholder="请在此输入售价">
                <Button slot="append">{{ `元/${formData.spec}` }}</Button>
              </Input>
            </FormItem>
            <FormItem label="出售数量">
              <InputNumber style="width: 100%" v-model="formData.goodsAmount"></InputNumber>
            </FormItem>
            <FormItem label="主图" prop="mainImg">
              <div class="upload-list upload-list-1" v-for="item in uploadList1">
                <template v-if="item.status === 'finished'">
                  <img :src="item.url">
                  <div class="upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleViewImg(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemoveImg(item, $refs.uploadMain)"></Icon>
                  </div>
                </template>
                <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
              </div>
              <Upload
                v-show="uploadList1.length === 0"
                ref="uploadMain"
                :show-upload-list="false"
                :default-file-list="defaultFileList1"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :headers="{ 'x-csrf-token': token }"
                :data="{ goodsNo: formData.goodsNo }"
                type="drag"
                action="/goods/uploadImg"
                style="display: inline-block;width:58px;">
                <div class="upload-camera-1">
                  <Icon type="camera" size="20"></Icon>
                </div>
              </Upload>
            </FormItem>
            <FormItem label="轮播图" prop="imgs">
              <div class="upload-list upload-list-2" v-for="item in uploadList2">
                <template v-if="item.status === 'finished'">
                  <img :src="item.url">
                  <div class="upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleViewImg(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemoveImg(item, $refs.uploadImgs)"></Icon>
                  </div>
                </template>
                <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
              </div>
              <Upload
                ref="uploadImgs"
                :show-upload-list="false"
                :default-file-list="defaultFileList2"
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
                <div class="upload-camera-2">
                  <Icon type="camera" size="20"></Icon>
                </div>
              </Upload>
            </FormItem>
            <FormItem class="footer">
              <Button type="primary" @click="handleSubmit">确 定</Button>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">重 置</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <Modal title="View Image" v-model="visible">
        <img :src="imgBigSrc" v-if="visible" style="width: 100%">
      </Modal>
    </Content>
  </Layout>
</template>


<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import { goodsSaveFull } from '@/api'

export default {
  name: 'goods-desc',

  data() {
    const validateLength = (validateObj, msg) => {
      return (rule, value, callback) => {
        let temp = this
        for (const key of validateObj.split('.')) temp = temp[key]
        temp.length === 0 ? callback(new Error(msg)) : callback()
      }
    }

    return {
      visible: false,
      uploadList1: [],
      uploadList2: [],
      imgBigSrc: '',
      tag: '',
      formData: this.$route.params,
      formValidate: {
        tags: [
          { validator: validateLength('formData.tags', '请填写标签'), trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请填写商品描述', trigger: 'blur' }
        ],
        mainImg: [
          { validator: validateLength('uploadList1', '请上传主图'), trigger: 'blur' }
        ],
        imgs: [
          { validator: validateLength('uploadList2', '请至少上传一张图片'), trigger: 'blur' }
        ]
      },
    }
  },

  computed: {
    ...mapGetters(['token']),
    defaultFileList1() {
      if (!this.formData.mainImg) return []
      return [{ url: this.formData.mainImg, status: 'finished' }]
    },
    defaultFileList2() {
      if (!this.formData.imgs) return []
      return JSON.parse(this.formData.imgs).map(url => {
        return { url, status: 'finished' }
      })
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.formData = to.params
      if (vm.$helper.isEmptyObj(vm.defaultFileList1)) {
        vm.uploadList1 = vm.$refs.uploadMain.fileList
      } else {
        vm.uploadList1 = vm.defaultFileList1
      }
      if (vm.$helper.isEmptyObj(vm.defaultFileList2)) {
        vm.uploadList2 = vm.$refs.uploadImgs.fileList
      } else {
        vm.uploadList2 = vm.defaultFileList2
      }
    })
  },

  beforeRouteLeave(to, from, next) {
    this.$refs.uploadImgs.clearFiles()
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
    handleRemoveImg(file, { fileList }) {
      fileList.splice(fileList.indexOf(file), 1)
      this.__retrospect()
    },
    handleSuccess({ data }, file) {
      const { url, filename } = data
      file.url = url
      file.name = filename
      this.__retrospect()
    },
    __retrospect() {
      this.uploadList1 = this.$refs.uploadMain.fileList
      this.uploadList2 = this.$refs.uploadImgs.fileList
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
      const check = this.uploadList2.length < 5
      if (!check) {
        this.$Notice.warning({ title: '最多可以上传5张图片。' })
      }
      return check
    },
    handleSubmit() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          const mainImg = this.uploadList1.map(item => item.url).toString()
          const imgs = JSON.stringify(this.uploadList2.map(item => item.url))
          this.__save({ ...this.formData, mainImg, imgs })
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
