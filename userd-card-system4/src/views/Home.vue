<template>
    <div class="home">
        <van-nav-bar title="首页" v-show="showTime==true"/>
        <van-nav-bar title="二手车" left-text="南宁" fixed v-show="showTime==false">
<!--            <van-icon name="chat-o" slot="right"/>-->
            <van-button icon="manager-o" class="icon-link" slot="right" @click="Toregester"/>
        </van-nav-bar>
        <!--      <van-search-->
        <!--              shape="round"-->
        <!--              background="#fffff"-->
        <!--              placeholder="请输入搜索关键词"-->
        <!--      />-->

        <van-swipe :autoplay="3000" v-show="showTime==false">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" width="100%" class="homeBanner"/>
            </van-swipe-item>
        </van-swipe>
        <p class="apps-title" v-show="showTime==true">车辆管理</p>
        <van-grid column-num="4" v-show="showTime==true">

            <van-grid-item use-slot :to="{ name: 'oldcar', params: { id: 'a' }}">
                <van-icon name="wap-nav" class="grid-icon fenlei-icon"/>
                <p style="font-size:12px;margin-top:0.1rem;color:gray">分类管理</p>
            </van-grid-item>
            <van-grid-item use-slot :to="{ name: 'oldcar', params: { id: 'b' }}">
                <van-icon name="gem" class="grid-icon pinpai-icon"/>
                <p style="font-size:12px;margin-top:0.1rem;color:gray">品牌管理</p>
            </van-grid-item>
            <van-grid-item use-slot :to="{ name: 'oldcar', params: { id: 'c' }}">
                <van-icon name="brush-o" class="grid-icon color-icon"/>
                <p style="font-size:12px;margin-top:0.1rem;color:gray">颜色管理</p>
            </van-grid-item>

            <van-grid-item use-slot to="/toconmsg">
                <van-icon name="question" class="grid-icon wenti-icon"/>
                <p style="font-size:12px;margin-top:0.1rem;color:gray">问题管理</p>
            </van-grid-item>
            <van-grid-item use-slot :to="{ name: 'addcar'}">
                <van-icon name="plus" class="grid-icon fabu-icon"/>
                <p style="font-size:12px;margin-top:0.1rem;color:gray">发布车源</p>
            </van-grid-item>
        </van-grid>
        <p class="apps-title" v-show="showTime==true" style="margin-top: 10px">服务管理</p>
        <van-grid column-num="4" v-show="showTime==true">

            <van-grid-item use-slot to="/adminstration/insuranceClass" >
                <van-icon name="umbrella-circle" class="grid-icon baoxian-icon"/>
                <p style="font-size:12px;margin-top:0.1rem;color:gray">保险管理</p>
            </van-grid-item>
            <van-grid-item use-slot to="/adminstration/tousu">
                <van-icon name="service" class="grid-icon tousu-icon"/>
                <p style="font-size:12px;margin-top:0.1rem;color:gray">投诉管理</p>
            </van-grid-item>
            <van-grid-item use-slot to="/adminstration/tongzhi">
                <van-icon name="volume" class="grid-icon tongzhi-icon"/>
                <p style="font-size:12px;margin-top:0.1rem;color:gray">发布通知</p>
            </van-grid-item>

            <van-grid-item use-slot to="/adminstration/kanjia">
                <van-icon name="column" class="grid-icon kanjia-icon"/>
                <p style="font-size:12px;margin-top:0.1rem;color:gray">砍价管理</p>
            </van-grid-item>
        </van-grid>
        <van-grid column-num="3" v-show="showTime==false">
            <van-grid-item use-slot to="/yysq">
                <van-icon name="todo-list" class="grid-icon" style="background: #ff5653"/>
                <p style="font-size:12px;margin-top:0.1rem;color:gray">预约申请</p>
            </van-grid-item>
            <van-grid-item use-slot to="/sqjy">
                <van-icon name="close" class="grid-icon" style="background: #f1bd31"/>
                <p style="font-size:12px;margin-top:0.1rem;color:gray">申请禁用</p>
            </van-grid-item>
            <van-grid-item use-slot to="/carsonsoult">
                <van-icon name="chat" class="grid-icon" style="background: #01e3bd"/>
                <p style="font-size:12px;margin-top:0.1rem;color:gray">问题咨询</p>
            </van-grid-item>
        </van-grid>

        <div class="tjList" v-show="showTime==false">
            <h3>
                <span></span>推荐
            </h3>
            <van-card
                    v-for="(item,index) in shoopList"
                    :price="item.xianjia"
                    :desc="item.decs"
                    :title="item.pinpai"
                    :thumb="item.imgUrl"
                    :origin-price="item.yuanjia"
            >
                <template #tags>
                    <van-tag plain type="danger">{{item.color}}</van-tag>
                </template>
                <template #footer>
                    <van-button size="mini" class="abc" @click="ToSc(index)">收藏</van-button>
                </template>
            </van-card>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Cookies from "js-cookie";

    export default {
        name: "Home",
        mounted() {
            this.init();
            if (Cookies.get("userId") == "3") {
                this.showTime = true;
                this.$parent.showCar = false;
            } else {
                this.showTime = false;
                this.$parent.showCar = true;
            }
            this.$parent.showto = true;
        },
        data() {
            return {
                images: [
                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586348536582&di=93f3e9a4162d4c781d04d1fd81fa3324&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F5487dacd7489e.jpg",
                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586348556481&di=6858963c0bc5b6fb023e8ef4b11f4710&imgtype=0&src=http%3A%2F%2Fdik.img.kttpdq.com%2Fpic%2F103%2F71778%2F1b68f879af668780.jpg"
                ],
                active: 0,
                shoopList: [],
                showTime: false
            };
        },
        methods: {
            init() {
                this.$axios.get("http://localhost:8088/api/login/getTjShop").then(res => {
                    this.shoopList = res.data;
                });
            },
            ToSc(a) {
                if (
                    document.getElementsByClassName("abc")[a].children[0].innerHTML =
                        "收藏"
                ) {
                    document.getElementsByClassName("abc")[a].children[0].innerHTML =
                        "已收藏";
                } else {
                    document.getElementsByClassName("abc")[a].children[0].innerHTML =
                        "收藏";
                }
            },
            Toregester(){
                this.$router.push('/');
            }
        }
    };
</script>
<style lang="scss" scoped>
    .homeBanner {
        height: 4rem;
    }

    .van-search {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 999;
    }

    .tjList {
        overflow: auto;
        background: #ffffff;
        margin-bottom: 1rem;

        h3 {
            span {
                display: inline-block;
                width: 2px;
                height: 0.3rem;
                background: #de0041;
                vertical-align: text-top;
                margin-left: 0.3rem;
                margin-right: 0.1rem;
            }

            height: 1rem;
            line-height: 1rem;
            font-size: 14px;
            font-weight: 500;
            text-align: left;
        }
    }

</style>
<style lang="scss" >
    #app .van-swipe__indicators {
        bottom: 0.4rem !important;
    }

    .home .van-card {
        margin-top: 0 !important;
        background: #ffffff;
    }

    .home .van-card__content {
        text-align: left;
        margin-left: 0.2rem;
    }

    .van-grid-item__content::after {
        border-width: 0;
    }

    .grid-icon {
        font-size: 22px;
        color: #ffffff;
        border-radius: 40%;
        padding: 6px;
    }

    .jinyon-icon {
        background: linear-gradient(110deg, #ffb2e6, #ff6c6e);
    }

    .yuyue-icon {
        background: linear-gradient(110deg, #63f2fe, #4382f5);
    }

    .fenlei-icon {
        background: linear-gradient(#5aeee5, #1acbe4);
    }

    .pinpai-icon {
        background: linear-gradient(#face59, #ef9525);
    }

    .color-icon {
        background: linear-gradient(#fa7af3, #ec29df);
    }

    .fabu-icon {
        background: linear-gradient(#62f88c, #21eb49);
    }

    .wenti-icon {
        background: linear-gradient(#bf6bfb, #9126ed);
    }
    .baoxian-icon{
        background: linear-gradient(#1dcaff,#189ffc);
    }
    .tousu-icon{
        background: linear-gradient(#fe6431,#fb3b07);
    }
    .tongzhi-icon{
        background: linear-gradient(#fead33,#ff9602);
    }
    .kanjia-icon{
        background: linear-gradient(#81a4ff,#6592ff);
    }
    .van-nav-bar__text {
        color: #fff;
        font-size: 15px;
    }

    .van-nav-bar__right {
        .van-icon {
            font-size: 15px;
        }
    }
    .apps-title{font-size: 14px;display: flex;padding: 10px 10px 6px 10px}
    .apps-title:before{
        content: "";
        width: 3px;
        height: 12px;
        background: #de0041;
        position: relative;
        top: 4px;
        right: 4px;}
    .van-hairline--top::after{border-top-width: 0}
    .icon-link{background: #de0041;border: none}
</style>
