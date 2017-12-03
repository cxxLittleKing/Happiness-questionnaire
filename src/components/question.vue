<template>
  <div>
    <div class="header">
       <span @click="$router.back(-1)">
        <Icon type="chevron-left" style="margin:0 5px;"></Icon>返回</span>
    </div>
    <div class="dialog">老师回复48小时内，您没有继续追问，问题将被结束</div>
    <div id="bg">

      <div class="question">
        <Card :bordered="true">
          <div slot="title">
            <img height='40px' src="../assets/images/icon/headimg.png" alt="">
            <span style="margin-left: 30%;">{{question.time}}</span>
          </div>
          {{question.question}}
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    components: {},
    data() {
      return {
        question: ''
      }
    },
    methods: {
    },
    mounted() {
      this.question = this.$route.query.question
    }
  }

</script>

<style>
  @import '../../static/public.css';
  .dialog {
    position: absolute;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background: yellow;
    width: 100%;
    top: 37px;
    z-index: 999
  }

  .question {
    margin-top: 60px;
  }

</style>
