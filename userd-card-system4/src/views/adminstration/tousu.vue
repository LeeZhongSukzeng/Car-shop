<template>
  <div>
    <van-nav-bar title="投诉列表" />
    <van-cell v-for="(item,index) in tousuList" :key="item._id">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #title>
        <van-tag color="#f2826a">单号</van-tag>
        <span class="custom-title">{{item.danhao}}</span>
      </template>
      <template #label>
        <div class="tousu-peo">
          <span>投诉人：{{item.user}}</span>
          <span>投诉时间：{{item.tstime}}</span>
        </div>
        <div class="tousu-info">
          投诉内容：
          <span>{{item.tscontent}}</span>
        </div>

        <div class="tousuBox">
          <van-button round type="danger" size="mini" @click="Todel(index)">删除</van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tousuList: [
      ],
      show: false,
      username: "",
      showbtn: false
    };
  },
  mounted() {
    this.$axios
      .get("http://localhost:8088/api/tousu/gettousulist")
      .then(res => {
        this.tousuList = res.data;
      });
  },
  methods: {
    Todel(idx) {
      console.log(idx);
      if(idx === -1){
        return console.log('删除失败')
      }else {
        this.tousuList.splice(idx,1);
      }

      //this.$toast("已删除");
    },
  }
};
</script>
<style lang="scss" scoped>
.tousuBox {
  margin-top: 110px;
  .van-button {
    margin-right: 5px;
  }
}
.van-nav-bar {
  background: #de0041 !important;
  font-size: 16px;
  position: fixed;
  width: 100%;
}
.van-cell{
  position: relative;
  top: 50px;

}
.van-cell:last-child{
  margin-bottom: 60px;
}
  .van-tag{
    position: absolute;
    left: 16px;

  }
  .custom-title{
    position: absolute;
    left: 66px;
    top: 7px;
  }
  .tousu-info{
    position: absolute;
    top: 62px;
    word-wrap:break-word;
    word-break:break-all;
    overflow: hidden;
    span{
      color: #323233 !important;
    }

  }
  .tousu-peo {
    position: absolute;
    top: 40px;
    span {
      padding-right: 10px;

    }
  }
.tousuBox[data-v-67c81db6]{
  display: flex;
  justify-content: flex-end;
}
.van-button--info{
  background: #de0041;
}
</style>