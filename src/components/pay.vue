<template>
  <div>
    <div class="header">
      <span @click="$router.back(-1)">
        <Icon type="chevron-left" style="margin:0 5px;"></Icon>返回</span>
    </div>
    <div id="bg">
      <div class="vip">
        <Card :bordered="false">
          <div slot="title">选择vip套餐</div>
          <div class="list" :class="{package:index1==index}" v-for="(item,index) in taocang" @click="doPackage(item.id,index,item.duration)">
            {{item.cost}}元/{{item.duration}}个月
          </div>
        </Card>
        <div>
          <button class="current" @click="current">微信支付</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
        taocang: null,
        index1: null, //高亮判断
        package_id: '', //套餐编码
      }
    },
    methods: {
      doPackage(id, index, month) {
        this.index1 = index
        this.package_id = id
        this.$store.commit('doMonth', month) //购买月份的个数
      },
      taocans() {
        this.$http.get(
            `/api/basic/data?key=s_comapi_st_packageList`
          )
          .then((response) => {
            console.log(response);
            this.taocang = response.data.data
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      current() {
        if (this.package_id === '') {
          this.$Message.error('请选择套餐,谢谢')
        }
        var _this = this
        var date = new Date()
        _this.$http.post(`/api/basic/data/manage?key=i_buy_package`, {
            user_id: _this.$store.state.user_id,
            package_id: _this.package_id,
            begin_time: date.toLocaleDateString(),
            end_time: date.toLocaleDateString()
          })
          .then((response) => {
            this.$Message.success('恭喜你支付成功,谢谢您的购买')
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    },
    mounted() {
      this.taocans()
    }
  }

</script>
<style>
  @import '../../static/public.css';
  .list {
    border-bottom: 1px solid #ddd;
    display: block;
    height: 75px;
    line-height: 75px;
  }

  .ivu-card-body {
    padding: 0 15px;
  }

  .vip {
    margin-top: 20%;
  }

  .current {
    color: #fff;
    font-size: 19px;
    height: 45px;
    width: 90%;
    background: #02c802;
    ;
    border: 0;
    display: block;
    margin: 30px auto;
    border-radius: 10px;
  }

  .package {
    background: url(../assets/images/icon/right_icon.png) no-repeat 80% center;
  }

</style>
