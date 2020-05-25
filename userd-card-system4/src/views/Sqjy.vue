<template>
  <div class="yysq">
    <van-nav-bar fixed title="禁用申请" @click-left="onClickLeft" left-arrow />
    <textarea placeholder="请输入200字以内" v-model="sq"></textarea>
    <van-button round @click="Tojy">申请禁用</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return{
      sq: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push("/home");
    },
    Tojy() {
        if(this.sq==""){
          this.$toast("请填入信息")
        }else {

          this.$toast("申请成功");
        }
        
    }
  }
};
</script>

<style lang="scss" scoped>
.yysq {
  overflow: hidden;
  textarea {
    display: block;
    width: 6rem;
    height: 3rem;
    border: 1px solid gray;
    margin: 1rem auto;
    margin-bottom: 0.5rem;
    font-size: 14px;
  }
  .subSq {
    width: 3rem;
  }
}
.van-button--normal {
  padding: 0 15px;
  font-size: 14px;
  position: absolute;
  left: 6%;
  width: 90%;
  bottom: 64px;
  background: #de0041;
  color: #fff !important;

}
</style>