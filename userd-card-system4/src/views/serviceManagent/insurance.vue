<template>
  <div>
    <van-nav-bar title="保险列表" />
    <van-search v-model="value" placeholder="请输入关键字" />
    <van-tabs v-model="active" @change="varttabChange">
      <van-tab title="驾驶人意外险">

      </van-tab>
      <van-tab title="车主无忧险">

      </van-tab>
    </van-tabs>
    <van-swipe-cell v-for="(item) in searchBx" :key="item._id">
      <van-card
              :num="item.insurancenumber"
              :price="item.insuranceprice"
              :desc="item.introduction"
              :title="item.title"
              class="goods-card"
              thumb="http://pimg1.4008000000.com/app_images/baoxian/v10/baoxian_index/qybximgczwy.jpg"
      >
        <template #tags>
          <van-tag plain type="danger">{{item.labname}}</van-tag>
        </template>
        <template #footer>
          <van-button size="mini" round @click="showPopup" class="btn">立即投保</van-button>
        </template>
      </van-card>
    </van-swipe-cell>
  </div>
</template>
<script>
  export default {
    name: "bargain",
    data() {
      return {
        active: 0,
        value: "",
        imgsList: [
          require("../../assets/img/jqx.png"),
          require("../../assets/img/csx.png"),
          require("../../assets/img/ssx.png"),
          require("../../assets/img/szx.jpg")
        ],
        datalist: [],

      };
    },
    methods: {

      showPopup() {
        this.$router.push("/serviceManagent/insuranceDetail");
      },
      getinsuranceList() {
        this.$axios
                .get("http://localhost:8088/api/insurance/getsurance", {
                  params: {
                    type: +this.active
                  }
                })
                .then(res => {
                  console.log(res, "请求成功");
                  if (res.status == 200) {
                    this.datalist = res.data;
                  }
                });
      },
      varttabChange(index) {
        console.log();
        this.getinsuranceList();
      }
    },
    mounted() {
      this.getinsuranceList();
    },
    computed:{
      searchBx:function () {
        if(!this.value) {
          return this.datalist;
        }
        return this.datalist.filter(v=>{
          return v.title.includes(this.value)
        });

      },

    },
  };
</script>
<style scoped>
  .van-swipe-cell{
    margin:10px 0;
  }
  .van-card__thumb{
    top: 12px;
  }
  .btn{
    color:#fff ;
    background: #ffb800;
    padding: 0 4px;
    border: none;
  }
</style>