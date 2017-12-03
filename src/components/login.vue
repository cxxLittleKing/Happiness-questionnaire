<template>
  <div>
    <div class="header">
      <p style="text-align:center;">幸福问卷</p>
    </div>
    <div id="bg">
      <span class="logo"></span>
      <group class="group">
        <x-input v-model="account" title='帐号：' id="input"></x-input>
        <x-input v-model="password" title='密码：' type='password' id="input"></x-input>
        <x-button type="primary" id="btn" @click.native="login">登录</x-button>
      </group>

    </div>
  </div>
</template>

<script>
  import {
    XInput,
    Group,
    XButton
  } from 'vux'
  export default {
    name: 'HelloWorld',
    components: {
      XInput,
      XButton,
      Group
    },
    data() {
      return {
        account: 'cxx',
        password: '123456'
      }
    },
    methods: {
      login() {
        if (this.account === '' || this.password === '') {
          this.$Message.error('账号或密码不能为空');
        } else {
          this.$http.get(
              `/api/basic/data?
        key=s_comapi_st_userdata&user_name=${this.account}&user_pwd=${this.password}`
            )
            .then((response) => {
              //  console.log(response)
              if (response.data.data.length !== 0) {
                this.$store.commit('setUserId', response)
                this.$router.push({
                  path: '/index'
                })
              } else {
                this.$Message.error('请输入正确的账号和密码');
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
  }

</script>

<style>
  @import '../../static/public.css';
  .logo {
    display: block;
    height: 100px;
    width: 100px;
    border: 2px solid #a4a4a4;
    border-radius: 100%;
    background: url(../assets/logo.png) no-repeat;
    background-size: 85%;
    background-position-y: 25px;
    background-position-x: 8px;
    margin: 30px auto;
  }

  .group {
    display: block;
    width: 100%;
    height: 200px !important;
    background: url(../assets/images/bg/login_bg.png) no-repeat;
    background-size: 100% 50%;
    margin: 0 auto;
  }

  #btn {
    background-color: #ff9b3b;
    width: 55%;
    height: 45px;
    margin: 10px auto;
  }

  input {
    background-color: transparent;
  }

  .weui-cells {
    background-color: transparent !important;
  }

  .weui-cells::after {
    border: none !important;
  }

  .weui-cells::before {
    border: none !important;
  }

  .weui-cell::before {
    border: none !important;
  }

  .weui-cell_hd::before {
    border: none;
  }

</style>
