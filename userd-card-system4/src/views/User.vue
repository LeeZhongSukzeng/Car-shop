<template>
    <div class="user">
        <van-nav-bar title="个人中心" fixed/>
        <div style="overflow: auto;margin:46px 0 60px 0">
            <van-grid center class="userTop" :border="false">
                <van-grid-item
                        icon="https://img.yzcdn.cn/vant/cat.jpeg"
                        :text="actName"
                />
            </van-grid>
            <van-cell-group class="userList" v-show="userorGl==true">
                <van-cell class="yuyue" icon="clock" title="预约详情" :to="{ name: 'userlist', params: { id: 'a' }}"
                          value="&gt;"/>
                <van-cell class="dindan" icon="balance-list" title="订单详情" :to="{ name: 'userlist', params: { id: 'b' }}"
                          value="&gt;"/>
                <van-cell class="baoxian" icon="umbrella-circle" title="保险详情" to="/serviceManagent/insurance"
                          value="&gt;"/>
                <van-cell class="tousu" icon="service" title="投诉建议" to="/serviceManagent/serve" value="&gt;"/>
                <van-cell class="tongzhi" icon="bell" title="通知详情" to="/serviceManagent/inform" value="&gt;"/>
                <van-cell class="kanjia" icon="descending" title="砍价" to="/serviceManagent/bargainlist" value="&gt;"/>
                <van-cell class="xiugai" icon="edit" title="修改个人信息" to="/edituser" value="&gt;"/>
            </van-cell-group>
            <van-cell-group class="userList" v-show="userorGl==false">
                <van-cell class="yuyue" icon="clock" title="预约管理" :to="{ name: 'userlist', params: { id: 'h' }}"
                          value="&gt;"/>
                <van-cell class="yonghu" icon="friends" title="用户管理" to="/usermsg" value="&gt;"/>
                <van-cell class="tonzhi" icon="bell" title="通知管理" to="/serviceManagent/inform" value="&gt;"/>
            </van-cell-group>
            <van-button class="cardBtn" type="default" size="small" @click="ToLgoin">退出登录</van-button>
        </div>
    </div>
</template>

<script>
    import Cookies from "js-cookie";

    export default {
        data() {
            return {
                actName: "小楼一夜听春雨",
                userorGl: true
            };
        },
        mounted() {
            console.log(Cookies.get("userId"));
            console.log(Cookies.get("userName"));
            if (Cookies.get("userName") == "" || Cookies.get("userName") == undefined) {
                this.actName = "小楼一夜听春雨";
            } else {
                this.actName = Cookies.get("userName");
            }
            if (Cookies.get("userId") == "3") {
                this.userorGl = false;
            } else {
                this.userorGl = true;
            }
        },
        methods: {
            ToLgoin() {
                this.$router.push("/login");
            }
        }
    };
</script>

<style lang="scss" scoped>

    .userTop {
        display: block;
        margin: 0 auto;

    }

    .userList {
        text-align: left;
    }

    .user .van-grid-item__icon {
        font-size: 100px;
    }

    .van-cell {
        line-height: 38px;
    }

    .van-icon {
        font-size: 20px;
        top: 7px;
    }

    .yuyue {
        .van-icon {
            color: #59a2fc;
        }
    }

    .dindan {
        .van-icon {
            color: #de0041;
        }
    }

    .baoxian {
        .van-icon {
            color: #01e3bd
        }
    }

    .tousu {
        .van-icon {
            color: #42b983
        }
    }

    .tongzhi {
        .van-icon {
            color: #f1bd31
        }
    }

    .kanjia {
        .van-icon {
            color: #ef9525
        }
    }

    .xiugai {
        .van-icon {
            color: #1acbe4
        }
    }

    .yonghu {
        .van-icon {
            color: #de0041
        }
    }

    .tonzhi {
        .van-icon {
            color: #42b983
        }
    }
</style>
