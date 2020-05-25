<template>
  <div style="margin-bottom: 100px;">
    <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="info-o"
    >目前只有款车可以进行砍价</van-notice-bar>
    <van-card
      tag="A7"
      price="89万"
      desc="奥迪A7,线条完美"
      title="奥迪A7"
      thumb="https://panovr.autoimg.cn/pano/g29/M0B/0E/9F/ChcCSFwlml2AH73bAACSo_o2ZOI427.png"
      origin-price="100万"
    >
      <template #tags>
        <van-tag plain type="danger">帅气不失动力</van-tag>
      </template>
      <template #footer>
        <van-button size="mini" to="/serviceManagent/bargainone">去砍价</van-button>
      </template>
    </van-card>
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
      <template #footer>
        <van-button size="mini" to="/serviceManagent/bargaintwo">去砍价</van-button>
      </template>
    </van-card>
  </div>
</template>
<script>
export default {
  name: "bargain",
  data() {
    return {};
  }
};
</script>
<style  scoped>
.van-swipe {
  height: 190px;
}
</style>