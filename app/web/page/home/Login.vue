<template>
  <div class="login_warp">
    <div class="login_bg"></div>
    <Form class="login_content"
      ref="formCustom"
      :model="formCustom"
      :rules="ruleCustom"
      :label-width="0">
      <div class="logo">
        <img class="logo-image"
          src="../../assets/login_images/logo.png"
          alt="wolf erp logo">
        <div class="welcome">欢迎使用蔬畅 ERP管理系统</div>
      </div>
      <FormItem class="gid" prop="username">
        <Input
          size="large"
          v-model="formCustom.username"
          placeholder="请输入您的用户名">
        </Input>
      </FormItem>
      <FormItem class="gid" prop="password">
        <Input
          size="large"
          type="password"
          v-model="formCustom.password"
          placeholder="请输入您的密码">
        </Input>
      </FormItem>
      <div class="jump-to submit" @click="handleLogin">登录</div>
    </Form>
  </div>
</template>

<script>
// import LoginAPI from '@/api/loginAPI'

export default {
  name: 'login',

  data() {
    return {
      formCustom: {
        username: '',
        password: ''
      },
      ruleCustom: {
        username: [
          { required: true, message: '用户名不能为空！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空！', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    handleLogin() {

    }
  }
}
</script>

<style lang="stylus" scoped>
.login_warp {
  height 100%
  left 0
  overflow hidden
  position absolute
  top 0
  width 100%
}

.login_bg {
  background rgba(0, 0, 0, 0) url('../../assets/login_images/background.png') no-repeat scroll 50% 50% / cover
  height 100%
  transition transform 0.5s linear 0s, -webkit-transform 0.5s linear 0s
  width 100%

  &:hover {
    transform scale(1.3)
  }
}

.login_content {
  left 50%
  position absolute
  top 50%
  transform translate(-50%, -50%)
  width 425px
  z-index 100

  .logo {
    .logo-image {
      display block
      width 100%
    }

    .welcome {
      font-size 21px
      text-align center
      color #fff
      margin-bottom 30px
    }
  }

  .jump-to {
    width 420px
    height 56px
    line-height 56px
    margin 16px auto 8px
    border 1px solid #DFE3EB
    border-radius 4px
    font-size 18px
    text-align center
    cursor pointer
    color #B0C1D4
    background #EAF0F6

    &:hover {
      color #888
      background #DDDDDD
    }
  }

  .jump-to.is-ok {
    background #5488F9
    color #fff
  }

  .gid {
    margin-bottom 30px
    width 420px
  }

  // .last {
  //   margin-bottom 0px
  // }
}
</style>
