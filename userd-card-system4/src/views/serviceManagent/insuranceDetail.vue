<template>
  <div>
    <van-panel title="保障详情" desc status="可投保">
      <div style="font-size:13px;">
        以下是各类车险的具体价格表：
        <br />1、车辆损失险：基础保费+裸车价格×1.0880%
        <br />2、盗抢险：基础保费+裸车价格×费率
        <br />3、玻璃单独破碎险：进口新车购置价×0.25%，国产新车购置价×0.15%
        <br />4、自燃损失险：新车购置价×0.15%
        <br />5、不计免赔特约险：(车辆损失险价格+第三方责任险价格)×20%
      </div>
    </van-panel>
    <van-cell-group title="投保人信息">
      <van-field v-model="name" placeholder="投保人姓名" />
      <van-field v-model="telnumber" type="number" placeholder="身份证号" />
      <van-cell center title="是否有医保">
        <template #right-icon>
          <van-switch v-model="checked" size="24" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-button size="small" type="info" @click="litb">立即投保</van-button>
  </div>
</template>
<style scoped>
  .van-cell__title,
  .van-cell__value {
    text-align: left;
  }
  .van-panel__content {
    padding: 10px;
  }
  .van-cell-group__title {
    text-align: left;
    color: black;
  }
  .van-panel__content[data-v-58d8c35c]{
    text-align: initial;
    line-height: 27px;
  }
</style>
<script>
  export default {
    data() {
      return {
        name: "",
        telnumber: "",
        checked: false
      };
    },
    methods: {
      litb() {
        if (this.name && this.telnumber) {
          this.$toast("投保成功,稍后将有销售人员与您联系")
          //this.$router.push("/serviceManagent/insurance");
        } else {
          this.$toast("请输入完整信息");
        }
      }
    }
  };
</script>