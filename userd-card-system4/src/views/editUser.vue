<template>
  <div>
    <van-nav-bar title="修改个人信息" @click-left="onClickLeft" left-arrow />
    <van-cell-group class="editBox">
      <van-field
        :value="account"
        v-model="account"
        label="用户名:"
        icon="question-o"
        placeholder="请输入用户名"
        bind:click-icon="onClickIcon"
      />
      <van-field :value="pass" v-model="pass" type="password" label="密码:" placeholder="请输入密码" />
    </van-cell-group>
    <van-button  round size="normal" @click="editUser">保存</van-button>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      id:1,
      account: "",
      pass: ""
    };
  },
  mounted() {
      this.account = Cookies.get("userName")
  },
  methods: {
      onClickLeft() {
      this.$router.push("/user");
    },
      editUser() {
          let params = {
            id:this.id,
            account: this.account,
            password: this.pass
          };
          console.log(params)
          this.$axios
          .get("http://localhost:8088/api/login/updateAccount",{
            params: {
              account: this.account,
              password: this.pass
            }
          }).then(res => {
            console.log(res)
            this.$toast('修改成功');
            this.$router.push("/user")

          })
      }
  }
};
</script>

<style scoped>
  .editBox{
    margin-top: 16px;
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