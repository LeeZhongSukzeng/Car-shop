<template>
  <div>
    <van-nav-bar title="砍价列表" fixed/>
    <div style="margin-top: 46px;margin-bottom: 60px;">
    <van-cell v-for="(item,index) in kanjiaList" :key="item._id">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #title>
        <van-tag color="#f2826a">砍价</van-tag>
        <span class="custom-title">
          {{item.pingpai}}
          {{item.xinghao}}
          {{item.color}}
        </span>
      </template>
      <template #label>
        <div class="tousu-peo">
          车辆售价:{{item.money}}&nbsp;&nbsp;&nbsp;&nbsp;砍价:{{item.kmoney}}
        </div>
        <div class="tousu-info">
          联系人电话：{{item.phone}}
        </div>

        <div class="tousuBox" v-show="showTime==true">
          <van-button class="tongyi" round icon="checked" size="mini" @click="Toagree(index)">同意</van-button>
          <van-button class="jujue" round icon="clear" size="mini" @click="Tojj(index)">拒绝</van-button>
          <van-button  class="huifu" round icon="chat" size="mini" @click="Tohf">回复</van-button>
          <van-button class="del" round icon="clear" size="mini" @click="Todel(index)">删除</van-button>

        </div>
        <div class="tousuBox" v-show="showTime==false" style="justify-content: flex-end">
          <van-button class="del" round icon="clear" size="small" @click="Todel(index)">删除</van-button>
        </div>
      </template>
    </van-cell>
    <van-dialog v-model="show" title="标题" show-cancel-button :showConfirmButton="showbtn">
      <van-field v-model="username" name="回复"  placeholder="回复" />
      <div style="margin: 16px;">
        <van-button round block type="info" @click="Tosub" native-type="submit" style="margin-top: 95px">提交</van-button>
      </div>
    </van-dialog>
<!--    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">投诉列表</van-divider>-->
<!--    <van-cell v-for="item in kanjiaList" :key="item._id">-->
<!--      &lt;!&ndash; 使用 right-icon 插槽来自定义右侧图标 &ndash;&gt;-->
<!--      <template #title>-->
<!--        <span class="custom-title">{{item.pingpai+item.xinghao}}</span>-->
<!--        <van-tag type="danger">砍价</van-tag>-->
<!--      </template>-->
<!--      <template #label>-->
<!--        <div>{{item.color}}</div>-->
<!--        <div>车辆售价:{{item.money}}&nbsp;&nbsp;&nbsp;&nbsp;砍价:{{item.kmoney}}</div>-->
<!--        <div>联系人电话：{{item.phone}}</div>-->
<!--      </template>-->
<!--    </van-cell>-->
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      kanjiaList: [],
      show: false,
      username: "",
      showbtn: false,
      showTime: false
    };
  },
  mounted() {
    this.$axios
      .get("http://localhost:8088/api/kanjia/getkanjialist")
      .then(res => {
        this.kanjiaList = res.data;
      });

    if (Cookies.get("userId") == "3") {
      this.showTime = true;
      this.$parent.showCar = false;
    } else {
      this.showTime = false;
      this.$parent.showCar = true;
    }
    this.$parent.showto = true;
  },
  methods: {
    Toagree(a) {
      //this.$toast("同意");
      document.getElementsByClassName("tongyi")[a].innerHTML = "已同意";
      document.getElementsByClassName("tongyi")[a].style.background='#59a2fc';
      document.getElementsByClassName("tongyi")[a].style.color='#ffffff';
    },
    Tojj(a) {
      //this.$toast("已拒绝");
      document.getElementsByClassName("jujue")[a].innerHTML = "已拒绝";
      document.getElementsByClassName("jujue")[a].style.background='#ff8590';
      document.getElementsByClassName("jujue")[a].style.color='#ffffff';
    },
    Todel(idx) {
     if(idx === -1) {
        console.log('删除失败')
     }else {
       this.kanjiaList.splice(idx,1);
     }
    },
    Tohf() {
      this.show = true;
    },
    Tosub() {
      this.$toast("回复成功");
      this.show = false;
    }
  }
};
</script>
<style scoped lang="scss">
  .tousuBox {
    .van-button {
      margin-right: 5px;
    }
  }
  .van-nav-bar {
    background: #e93b3d !important;
    font-size: 16px;
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
  .tousuBox[data-v-19dc1020] {
    margin-top: 110px;
    display: flex;
    justify-content: space-between;
  }
  .tongyi{
    .van-icon{
      color: #59a2fc;
    }
  }
  .jujue{
    .van-icon{
      color: #ff8590;
    }
  }
  .huifu{
    .van-icon{
      color: #69ee82;
    }
  }
  .del{
    .van-icon{
      color: #de0041;
    }
  }
  .van-button--info{
    background: #de0041;
  }
  .tousuBox[data-v-19dc1020][data-v-19dc1020]{margin-top: 80px;}
</style>