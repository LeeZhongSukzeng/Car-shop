<template>
  <div class="newcarlist">
    <van-nav-bar title="车辆列表" fixed/>
    <div class="newcarMain">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" @change="ToPp" :options="option1" />
        <van-dropdown-item v-model="value2" @change="ToJg" :options="option2" />
      </van-dropdown-menu>
      <van-card
        v-for="item in newCarList"
        :price="item.xianjia+'万'"
        :desc="item.decs"
        :title="item.pinpai"
        :thumb="item.imgUrl ? item.imgUrl : './assets/img/csx.png'"
        :origin-price="item.yuanjia+'万'"
        :key="item._id"
      >
        <template #tags>
          <van-tag plain type="danger">{{item.color}}</van-tag>
        </template>
         <template #footer>

            <van-button size="mini" class="btn" round @click="ToCarList(item._id,item.pinpai,item.color,item.year,item.leixing,item.yuanjia,item.xianjia,item.decs,item.imgUrl)">加购</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      value1: 0,
      value2: "a",
      option1: [
        { text: "品牌", value: 0 },
        { text: "本田", value: 1 },
        { text: "哈弗H6", value: 2 },
        { text: "力帆轩朗", value: 3 },
        { text: "大众夏朗", value: 4 },
        { text: "奇瑞", value: 5 },
      ],
      option2: [
        { text: "价格", value: "a" },
        { text: "从低到高", value: "b" },
        { text: "从高到低", value: "c" }
      ],
      newCarList: [],
      newCarList1: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //   /api/getCarList
    init() {
      this.$axios.get("http://localhost:8088/api/getCarList").then(res => {
        this.newCarList = res.data;
        this.newCarList1 = res.data
      });
    },
    onSearch(val) {
      const a = this.newCarList1
      if(val=="本田"){
          this.newCarList = a.filter(item => item.pinpai=="本田")
      }else if(val=="哈弗H6") {
          this.newCarList = a.filter(item => item.pinpai=="哈弗H6")
      }else if(val=="力帆轩朗") {
          this.newCarList = a.filter(item => item.pinpai=="力帆轩朗")
      }else if(val=="大众夏朗") {
          this.newCarList = a.filter(item => item.pinpai=="大众夏朗")
      }else if(val=="奇瑞") {
          this.newCarList = a.filter(item => item.pinpai=="奇瑞")
      }else {
          this.$toast("暂无商品");
      }
    },
    onCancel() {
      this.$toast("取消");
    },
    ToPp() {
        const a = this.newCarList1
        if(this.value1=="0") {
            this.newCarList = a
        }else if(this.value1==1) {
            this.newCarList = a.filter(item => item.pinpai=="本田")
        }else if(this.value1=="2") {
            this.newCarList = a.filter(item => item.pinpai=="哈弗H6")
        }else if(this.value1=="3") {
            this.newCarList = a.filter(item => item.pinpai=="力帆轩朗")
        }else if(this.value1=="4") {
            this.newCarList = a.filter(item => item.pinpai=="大众夏朗")
        }else if(this.value1=="5") {
            this.newCarList = a.filter(item => item.pinpai=="奇瑞")
        }
    },
    ToJg() {
      if (this.value2 == "b") {
        function dg(property) {
          return function(a, b) {//比值函数 起到数字升序排序的作用
            var value1 = a[property];//所有车辆现价
            var value2 = b[property];
            return value1 - value2;
          };
        }
        this.newCarList = this.newCarList.sort(dg("xianjia"));//sort()无法实现数字顺序,需借助比值函数
      } else {
        function gd(property) {
          return function(a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return -(value1 - value2);
          };
        }
        this.newCarList = this.newCarList.sort(gd("xianjia"));
      }
    },
    ToCarList(a,b,c,d,e,f,g,h,i) {
      // /api/addshopcar
      let args = {
        id: parseInt(a),
        pinpai: b,
        color: c,
        year: d,
        leixing: e,
        yuanjia: f,
        xianjia: g,
        decs: h,
        imgUrl: i
      };
      this.$axios
        .get("http://localhost:8088/api/addshopcar", {
          params: args
        })
        .then(res => {
          console.log(res);
          this.$toast("添加成功");
          this.$router.push("/shopcar");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
  .van-search{
    position: fixed;
    top: 46px;
    z-index: 3;
    width: 100%;
  }
.newcarlist{
  margin-bottom: 1rem;
}
.newcarlist .van-card__content {
  text-align: left;
  margin-left: 0.2rem;
}
  .van-search,.van-dropdown-menu{
    position: fixed;
    top: 46px;
    left: 0;
    width: 100%;
    z-index: 3;
  }
  .van-dropdown-menu{
    top: 100px;
  }
.newcarMain{
  margin: 150px 0 60px 0;
}
</style>