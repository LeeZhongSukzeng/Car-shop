<template>
    <div class="userList">
        <van-nav-bar @click-left="onClickLeft" title="管理列表" left-arrow fixed/>
        <van-search
                v-model="values"
                show-action
                @search="searchInfo"
                placeholder="请输入搜索关键词"
        />
        <div style="margin-top: 96px;margin-bottom: 60px">
        <van-swipe-cell v-show="active==0" v-for="(item,index) in searchData">
            <van-cell>
                <div>
                    <van-icon name="manager"/>
                    <span>{{item.username}} </span>
                    <van-button round size="mini" @click="Todel(item._id)" style="float: right;border-color:#e93b3d;color:#e93b3d ">删除</van-button>
                    <van-button round size="mini" @click="modify(item,index)" style="float: right;margin-right: 10px">修改</van-button>
                </div>
                <p>申请时间：{{item.sqtime}}</p>
                <p>预约时间：{{item.yytime}} </p>
            </van-cell>
        </van-swipe-cell>
        <van-popup
                v-model="show"
                closeable
                close-icon-position="top-left"
                position="bottom"
                :style="{ height: '50%' }"
        >
            <van-cell-group style="margin-top:1rem">
                <van-field v-model="editList.yytime" label="预约时间" placeholder="预约时间"/>
            </van-cell-group>
            <van-button round plain @click="updatetongzhi">确定</van-button>
        </van-popup>
        <van-card
                v-show="active==1"
                v-for="(item,index) in searchData"
                :price="item.price*10000"
                :desc="item.color"
                :title="item.carname"
                :thumb="item.imgurl"
        >
            <template #price-top>
                <div>下单日期: {{item.ordertime}}</div>
                <div>订单号: {{item.orderno}}</div>
                <van-button round size="mini" class="abc" @click="delOrder(index)" style="float: right;border-color:#e93b3d;color:#e93b3d;">删除</van-button>
                <van-button round size="mini" class="abc" @click="delOrder(index)" style="float: right; margin-right: 10px; ">取消</van-button>
            </template>
        </van-card>
        <van-swipe-cell v-show="active==6" v-for="(item,index) in searchData">
            <van-cell>
                <div>
                    <van-icon name="manager"/>
                    <span>{{item.username}} </span>
                    <van-button round size="mini" class="chuli" @click="ToSc(index)" style="float: right;border-color:#e93b3d;color:#e93b3d;color: #e93b3d; ">处理</van-button>
                    <van-button round size="mini" @click="Todel(item._id)" style="float: right; margin-right: 10px;">取消</van-button>
                </div>
                <p>申请时间：{{item.sqtime}}</p>
                <p>预约时间：{{item.yytime}} </p>
            </van-cell>
        </van-swipe-cell>
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                shopcarList: [],
                tit: "",
                yygllist: [],
                show: false,
                editList: {
                    username:'',sqtime:'',yytime:''
                },
                editIndex:'',
                values:'',
                searchData:[]
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                if (this.$route.params.id == "a") {
                    this.active = 0;
                    this.$axios.get("http://localhost:8088/api/getyy").then(res => {
                        // this.$toast("订单获取成功");
                        this.yygllist = res.data;
                        this.yygllist.map((item) => {
                            return (item.checked = false);
                        });
                        this.searchData = this.yygllist;
                    });

                    this.tit = "预约详情";
                } else if (this.$route.params.id == "b") {
                    this.active = 1;
                    this.tit = "订单详情";
                    this.$axios.get("http://localhost:8088/api/getorder").then(res => {
                        // this.$toast("订单获取成功");
                        this.shopcarList = res.data;
                        this.shopcarList.map((item) => {
                            return (item.checked = false);
                        });
                        this.searchData = this.shopcarList;
                        //console.log(this.searchData)
                    });
                } else if (this.$route.params.id == "c") {
                    this.active = 2;
                    this.tit = "保险详情";
                } else if (this.$route.params.id == "d") {
                    this.active = 3;
                    this.tit = "服务详情";
                } else if (this.$route.params.id == "e") {
                    this.active = 4;
                    this.tit = "通知详情";
                } else if (this.$route.params.id == "f") {
                    this.active = 5;
                    this.tit = "砍价详情";
                } else if (this.$route.params.id == "h") {
                    this.active = 6;
                    this.tit = "预约管理";
                    this.$axios.get("http://localhost:8088/api/getyy").then(res => {
                        //this.$toast("订单获取成功");
                        this.yygllist = res.data;
                        this.yygllist.map((item) => {
                            return (item.checked = false);
                        });
                        this.searchData = this.yygllist;
                    });
                } else if (this.$route.params.id == "i") {
                    this.active = 7;
                    this.tit = "投诉管理";
                } else if (this.$route.params.id == "g") {
                    this.active = 8;
                    this.tit = "禁用管理";
                } else if (this.$route.params.id == "k") {
                    this.active = 9;
                    this.tit = "砍价管理";
                }
            },
            searchInfo(){
                var input = this.values;
                if (input) {
                    this.searchData =  this.shopcarList.filter(function(car) {
                        //console.log(car)
                        return Object.keys(car).some(function(key) {
                            //console.log(key)
                            return String(car[key]).toLowerCase().indexOf(input) > -1
                        })
                    })
                }else if(input.length == 0){
                    this.searchData =  this.shopcarList
                } else {
                    return this.searchData
                }
            },
            onClickLeft() {
                this.$router.push("/user");
            },
            ToSc(a) {

                document.getElementsByClassName("chuli")[a].children[0].innerHTML = "已处理";
                document.getElementsByClassName("chuli")[a].style.background='#de0041';
                document.getElementsByClassName("chuli")[a].style.color='#ffffff';
            },
            Todel(a) {
                this.$axios
                    .get("http://localhost:8088/api/delyy", {
                        params: {
                            _id: a
                        }
                    })
                    .then(res => {
                        this.$toast("删除成功");
                        this.init()
                    });

            },
            delOrder(idx){
                if(idx === -1) {
                    console.log('删除失败')
                }else {
                    this.searchData.splice(idx,1);
                }
            },
            modify(item,index){
                this.show=true;
                this.editIndex = index;
                this.editList ={
                    username:item.username,
                    yytime: item.yytime,
                    sqtime:item.sqtime,
                };

            },
            updatetongzhi(){
                this.$set(this.yygllist,this.editIndex,this.editList);
                this.show=false;

            },
        },
        computed:{

        },

    };
</script>

<style lang="scss" scoped>
    .van-search{
        position: fixed;
        top: 46px;
        z-index: 3;
        width: 100%;
    }
    .userList {
        .van-card__content {
            text-align: left;
            margin-left: 0.2rem;
        }

        .van-swipe-cell {
            font-size: 0;

            .van-button {
                height: 100%;
            }
        }
    }

    .van-cell {
        p {
            color: #868788;
        }

        .van-icon {
            padding-right: 10px;
        }
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