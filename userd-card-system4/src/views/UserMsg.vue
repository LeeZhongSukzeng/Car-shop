<template>
  <div class="usermsg">
    <van-nav-bar title="用户管理" @click-left="onClickLeft" left-arrow />
    <van-swipe-cell v-for="(item,index) in items">
      <van-cell :border="false" :title="item.nickname" />
      <template #right>
        <van-button square type="danger" @click="ToDelete(item._id)">删除</van-button>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: []
      };
    },
    mounted() {
      this.init()
    },
    methods: {
      onClickLeft() {
        this.$router.push("/user");
      },
      // /api/login/getUser
      init() {
        this.$axios
                .get("http://localhost:8088/api/login/getUser")
                .then(res => {
                  console.log(res.data);
                  this.items = res.data
                });
      },
      ToDelete(itemid) {
        this.$axios
                .get("http://localhost:8088/api/login/delAccount",{
                  params: {
                    _id: itemid
                  }
                })
                .then(res => {
                  this.init()
                });
      }
      // ToDelete(idx){
      //   if(idx==-1){
      //     console.log('删除失败')
      //   }else{
      //     this.items.splice(idx,1);
      //   }
      // }
    }
  };
</script>

<style scoped>
  .usermsg .van-swipe-cell {
    font-size: 0;
  }
</style>