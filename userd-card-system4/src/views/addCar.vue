<template>
  <div>
    <van-nav-bar fixed title="发布车源" @click-left="onClickLeft" left-arrow />
    <van-cell title="信息录入" />
    <!-- 输入任意文本 -->
    <van-field v-model="pinpai" label="品牌" placeholder="别克" />
    <van-field v-model="color" label="颜色" placeholder="白色" />
    <van-field v-model="year" label="出产年份" placeholder="2020年" />
    <van-field v-model="leixing" label="类型" placeholder="SUV" />
    <van-field v-model="decs" label="描述" placeholder="2.0T涡轮蒸鸭" />
    <van-field v-model="yuanjia" label="原价" placeholder="200万" />
    <van-field v-model="xianjia" label="现价" placeholder="190万" />
    <van-cell title="上传图片" />
    <van-uploader :after-read="afterRead" />

    <div>
      <van-button round plain @click="addcar">发布车源</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pinpai: "",
      color: "",
      year: "",
      leixing: "",
      decs: "",
      yuanjia: "",
      xianjia: "",


    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      let fd = new FormData();//创建form对象
      fd.append('upImgs', file.file);//通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      this.$axios.post("http://localhost:8088/upload", fd).then(res => {
        console.log(res);
        this.imgUrl = res.data.filename;
        this.$toast("上传成功");
        
      }).catch(err => {
        alert(err)
      })
    },
    addcar() {
      if (
        this.pinpai == "" ||
        this.color == "" ||
        this.year == "" ||
        this.leixing == "" ||
        this.decs == "" ||
        this.yuanjia == "" ||
        this.xianjia == ""
      ) {
        this.$toast("请填写完整");
        return false;
      }
      let args = {
        pinpai: this.pinpai,
        color: this.color,
        year: this.year,
        leixing: this.leixing,
        yuanjia: this.yuanjia,
        xianjia: this.xianjia,
        decs: this.decs,
        imgUrl: this.imgUrl
      };
      console.log(args);
      return this.$axios
        .get("http://localhost:8088/api/createCarList", {
          params: args
        })
        .then(res => {
          console.log(res);
          this.$toast("添加成功");
          this.$router.push("/home");
        });
    }
  }
};
</script>
<style scoped>
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