<template>
  <div style="margin-bottom: 100px;">
    <van-nav-bar title="砍价" />
<!--    <van-cell title="汽车图片" />-->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" width="100%" class="homeBanner" />
      </van-swipe-item>
    </van-swipe>
    <van-cell title="基本信息" />
    <van-card
      tag="911"
      price="99.9万"
      desc="保时捷中的经典"
      title="保时捷911"
      to="/serviceManagent/bargaintwo"
      thumb="http://c1.xinstatic.com/c/20181213/1017/5c11c12f52d1e195183.png"
      origin-price="120万"
    >
      <template #tags>
        <van-tag plain type="danger">进口大气</van-tag>
      </template>
    </van-card>
    <van-field v-model="tlphone" type="tel" label="手机号" placeholder="请输入手机号" />
    <van-field v-model="kmoney" type="number" label="心里价位" placeholder="请输入心里价位" />
    <van-button type="info" round @click="getdijia">获取底价</van-button>
  </div>
</template>
<script>
export default {
  name: "bargain",
  data() {
    return {
      images: [
        "http://c1.xinstatic.com/c/20181213/1017/5c11c12f52d1e195183.png",
        "https://panovr.autoimg.cn/pano/g29/M06/0E/9D/ChcCSFwlmleAPRBQAACBqarAdY8112.png",
        "https://panovr.autoimg.cn/pano/g28/M06/11/49/ChsEfVwlmlKALEgBAACUjDgFnBM395.png"
      ],
      tlphone: "",
      kmoney: ""
    };
  },
  methods: {
    getdijia() {
      if (this.tlphone == "") {
        this.$toast("请输入手机号");
        return false;
      }
      if (this.kmoney == "") {
        this.$toast("请输入心里价位");
        return false;
      }
      let args = {
        phone: this.tlphone,
        kmoney: this.kmoney,
        pingpai: "保时捷",
        xinghao: "911",
        color: "红色",
        money: "500万"
      };
      this.$axios
        .get("http://localhost:8088/api/kanjia/createkanjia", {
          params: args
        })
        .then(res => {
          alert("添加成功");
          this.$router.push("/adminstration/kanjia");
        });
    }
  }
};
</script>
<style  scoped>
  .van-swipe {
    height: 190px;
  }
  .van-button--info{
    background: #de0041;
    border: none;
    width: 90%;
  }
  .van-nav-bar {

    position: fixed;
    width: 100%;
  }

</style>