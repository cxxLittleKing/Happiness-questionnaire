<template>
  <div>
    <div class="header">
      <span @click="$router.back(-1)">
        <Icon type="chevron-left" style="margin:0 5px;"></Icon>返回</span>
    </div>
    <div id="bg">
      <div class=" pay_user1">
        <img v-show="month.length!=0" src="../assets/images/icon/tag_y.png" height='60px' alt="">
        <img v-show="month.length==0" src="../assets/images/icon/tag_g.png" height='60px' alt="">
      </div>
      <div style="text-align:center;">
        <img src="../assets/images/icon/headimg.png" alt="">
        <div>
          <h5>{{name}}</h5>
        </div>
      </div>
      <div class="server">
        <div>您购买了
          <span :class="{month:true,month_guoqi:month.length==0}">{{ month}}个月VIP的问答服务
            <span class="month_fu"></span>
          </span>
        </div>
        <div> 有效截止：{{ end_time}}</div>
        <button class="kaitong" @click="kaitong"></button>
      </div>

    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import {
    XInput,
    Group,
    XButton
  } from 'vux'
  export default {
    components: {
      XInput,
      XButton,
      Group
    },
    data() {
      return {
        taocan: []
      }
    },
    computed: mapState({
      name() {
        return this.$store.state.user_name;
      },
      month() {
        return this.$store.state.duration;
      },
      end_time() {
        return this.$store.state.end_time;
      }
    }),
    methods: {
      login() {
        this.$router.push({
          path: '/index'
        })
      },
      kaitong() {
        this.$router.push({
          path: '/pay'
        })
      }
    },
    watch: {

    },
    mounted() {

    }
  }

</script>

<style>
  @import '../../static/public.css';

  .pay_user1 {
    text-align: right;
    margin-right: 20px;
  }

  .server {
    margin-top: 50px;
    width: 100%;
    ;
    height: 200px !important;
    background: url(../assets/images/bg/login_bg.png) no-repeat;
    background-size: 100% 50%;
    text-align: center;
  }

  .server div {
    height: 50px;
    line-height: 50px;
  }

  .kaitong {
    background: url(../assets/images/btn/kaitong_btn.png) no-repeat;
    height: 45px;
    width: 200px;
    background-size: 100%;
    border: 0;
    display: block;
    margin: 30px auto;
  }

  .month_fu {
    background: url(../assets/images/icon/crown_y.png) no-repeat;
    position: absolute;
    right: -9px;
    top: -8px;
    width: 25px;
    height: 25px;
    background-size: 80%;
    z-index: 12;
  }

  .month {
    background: #a65609;
    padding: 5px 15px;
    color: #fff;
    margin-left: 5px;
    position: relative;
    border-radius: 15px;
  }

  .month_guoqi {
    background: #b3afaf;
  }

  .month_fu_guoqi {
    background: url(../assets/images/icon/crown_g.png) no-repeat;
  }

</style>
