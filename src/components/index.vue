<template>
  <div>
    <div class="header">
      <span @click="$router.back(-1)">
        <Icon type="chevron-left" style="margin:0 5px;"></Icon>返回</span>
    </div>
    <div id="bg">
      <div class="user">
        <span class="user_logo" @click="toPersonal"></span>
        <div class=" pay_user">
          <img src="../assets/images/btn/question_mark.png" height='23px' alt="">
          <img src="../assets/images/icon/tag_y.png" height='60px' alt="">
        </div>
      </div>
      <div class="title_logo">
        <h3>幸福
          <em>
            <em class="logo-pic"></em>
          </em>问答</h3>
      </div>
      <group class="weui-cells_form">
        <x-input v-model="ask" @keyup.native.enter='doAsk' placeholder="请输入您的问题" style=" padding: 0;" class="weui-vcode">
          <x-button slot="right"  @click.native="doAsk" type="primary" style="border-top-left-radius: 0;
        border-bottom-left-radius: 0;background-color: #1b7ced;height: 34px;" mini>提问</x-button>
        </x-input>
      </group>
      <div class="chance">(您有一次免费提问机会)</div>
      <div class="expert">
        <div v-show="!list" style="text-align:center;">
          <img v-show='questions.length==0' style="max-height: 220px;" src="../assets/images/bg/question.png" alt="">
          <div v-show='questions.length!=0'>
            <Card :bordered="false">
              <p slot="title">
                <Icon type="ios-information"></Icon>我的提问</p>
              <div class="qusetion" @click="doQuestion(item)" v-for="item in questions">
                {{item.question}}
              </div>
            </Card>
          </div>
        </div>

        <button :class="{expert_btn:expert_btn,bottom_btn:bottom_btn}" @click="doexpert">幸福专家</button>
        <div v-if="list">
          <div class="experts" v-for="item in experts" @click="selectExperts(item)">
            <div class="userimg">
              <img src="../assets/images/icon/userimg.png" style="vertical-align:middle;" height='50px' alt="">
            </div>
            <div class="expertsList">
              <div class="expertsList_line1">
                <span class="name">{{item.name}}</span>
                <span>
                  <img height='14px' src="../assets/images/icon/Location.png" alt=""> </span>
                {{item.location}}
              </div>
              <div class="expertsList_line2">
                {{item.degree}}
              </div>
            </div>

          </div>

          <Modal v-model="modal6" class-name="vertical-center-modal" ok-text='' cancel-text=''>
            <div class="modal1">
              <img src="../assets/images/icon/userimg.png" style="margin-top: 40px;height:55px;" alt="">
              <div class="selectExpert_fu">
                <span class="name">{{selectExpert.name}}</span>
                <div class="location">
                  <img height='14px' src="../assets/images/icon/Location.png" style="margin-right: 10px;" alt="">{{selectExpert.location}} </div>
                <div class="expertsList_line2">
                  {{selectExpert.degree}}
                </div>
                <div class="introduction">
                  <p> {{selectExpert.introduction}}</p>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    TransferDom,
    XInput,
    XButton,
    Group,
    Cell,
    XSwitch,
    Popup
  } from 'vux'
  export default {

    directives: {
      TransferDom
    },

    components: {
      XInput,
      XButton,
      Group,
      XSwitch,
      Popup,
      Cell
    },
    data() {
      return {
        account: '',
        password: '',
        list: 'true',
        ask: '',
        questions: [],
        expert_btn: true,
        bottom_btn: false,
        experts: new Array(),
        modal6: false,
        selectExpert: new Array(),
        loading: true
      }
    },
    methods: {
      doAsk() {
        var date = new Date()
        this.$http.post(`http://183.131.126.105:9000/basic/data/manage?key=i_comapi_st_qustion`, {
            user_id: this.$store.state.user_id,
            question: this.ask,
            time: date.toLocaleDateString()
          })
          .then( (response)=> {
            this.findQustion()
            this.ask=''
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      doQuestion(item) {
        console.log(item)
        this.$router.push({
          path: '/question',
          query: {
            question: item
          }
        })
      },
      toPersonal() {
        this.$router.push({
          path: '/personal'
        })
      },
      doexpert() {
        this.bottom_btn = !this.bottom_btn
        this.list = !this.list
      },
      selectExperts(item) {
        this.modal6 = true
        this.selectExpert = item
      },

      findQustion() {
        let that = this
        this.$http.get(
            `/api/basic/data?key=i_comapi_st_qustion&user_id=${that.$store.state.user_id}`
          )
          .then((response) => {
            console.log(response)
            this.questions=response.data.data
            this.questions.reverse()
          })
          .catch(function (error1) {
            console.log(error1);
          });
      },
      findExpert() {
        let that = this
        this.$http.get(
            `/api/basic/data?key=s_comapi_st_expertsList`
          )
          .then((response) => {
            this.experts = response.data.data;
            console.log(this.experts)
          })
          .catch(function (error1) {
            console.log(error1);
          });
      }
    },
    watch:{
    
     },
    mounted() {
      this.findQustion();
      this.findExpert();
    }
  }

</script>

<style>
  @import '../../static/public.css';
  #bg {
    background-color: #fafafa;
  }

  .user {
    height: 80px;
    position: relative;
  }

  .title_logo {
    text-align: center;
  }

  .user_logo {
    position: absolute;
    top: 15px;
    height: 40px;
    width: 40px;
    background: url(../assets/images/icon/headimg.png) no-repeat;
    background-size: 100%;
  }

  .pay_user {
    position: absolute;
    right: 30px;
    top: 0;
  }

  .logo-pic {
    display: inline-block;
    width: 80px;
    height: 60px;
    background: url(../assets/logo.png) no-repeat;
    background-size: 95%;
    vertical-align: middle
  }

  .chance {
    color: #bd1e16;
    font-size: 10px;
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

  .weui-cells_form input {
    border: 1px solid #a5a5a5;
    height: 30px;
  }

   ::-webkit-input-placeholder {
    color: #a5a5a5;
    font-size: 14px;
    line-height: 50px;
    box-sizing: border-box;
    padding-left: 7px;
  }

  .expert {
    padding-top: 10px;
  }

  .expert_btn {
    background: #fff url(../assets/images/icon/arrow.png) no-repeat 1px;
    margin: auto;
    display: block;
    width: 90px;
    text-align: right;
    border: 1px solid #d09b10;
    border-radius: 5px;
  }

  .bottom_btn {
    position: fixed;
    left: 40%;
    bottom: 0
  }

  .ivu-card-head p,
  .ivu-card-head-inner {
    text-align: left;
  }

  .qusetion {
    height: 45px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    padding-top: 5px;
  }

  .experts {
    height: 80px;
    border-bottom: 1px solid #ddd;
  }

  .expertsList {
    width: 75%;
    float: left;
  }

  .userimg {
    width: 25%;
    float: left;
    line-height: 80px;
    text-align: center;
  }

  .name {
    font-size: 16px;
    font-weight: bold;
    color: #434343;
  }

  .expertsList_line1 {
    margin-top: 20px;
    margin-left: 10px;
  }

  .expertsList_line2 {
    color: #999;
    margin-top: 5px;
    margin-left: 10px;
  }

  .expertsList_line1 span {
    margin-right: 10px;
  }

  .weui-cells_form input {
    height: 33px;
  }

  .modal1 {
    text-align: center;
  }

  .ivu-modal-footer,
  .ivu-modal-close {
    display: none
  }

  .ivu-modal-content {
    height: 350px;
    background: url(../assets/images/bg/popup.png) no-repeat;
    background-size: 100%;
  }

  .selectExpert_fu {
    position: relative;
  }

  .location {
    position: absolute;
    top: 5px;
    right: 15px;
  }

  .introduction {
    padding: 20px;
    margin-top: 20px;
  }

</style>
<style lang="less">
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }

</style>
