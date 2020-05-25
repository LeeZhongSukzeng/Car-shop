<template>
    <div class="oldcarmsg">
        <van-nav-bar :title="tit" @click-left="onClickLeft" left-arrow fixed/>
        <van-search
                v-model="values"
                show-action
                @search="searchInfo"
                placeholder="请输入搜索关键词"
        />
        <div style="margin-top: 96px;margin-bottom: 100px;" v-show="showfenlei">
            <van-list>
                <van-cell v-for="(data,index) in searchData" :key="data._id" class="checkbox-info-box">
                    <a class="info-box info-c" @click="getDataC(index)">
                        <div class="user-info-left">
                            <img :src="data.imgUrl"/>
                            <div class="user-info">
                                <p class="car-title">{{data.leixing}}</p>
                                <p class="car-info">
                                    <span>{{data.decs}}</span>
                                </p>
                            </div>
                        </div>
                        <van-icon name="circle" v-show="!data.checked"/>
                        <van-icon name="checked"  v-show="data.checked" color="#1989fa"/>
                    </a>
                </van-cell>
            </van-list>
            <div class="del-box">
                <span style="font-size: 14px; width: 54px">已选：{{this.delArray.length}}</span>
                <van-button round size="small" @click="del" >删除</van-button>
            </div>
        </div>
        <div style="margin-top: 96px;margin-bottom: 100px;" v-show="showpinpai">
            <van-list>
                <van-cell v-for="(data,index) in searchData" :key="data._id" class="checkbox-info-box">
                    <a class="info-box info-c" @click="getDataC(index)">
                        <div class="user-info-left">
                            <img :src="data.imgUrl"/>
                            <div class="user-info">
                                <p class="car-title">{{data.pinpai}}</p>
                                <p class="car-info">
                                    <span>{{data.decs}}</span>
                                </p>
                            </div>
                        </div>
                        <van-icon name="circle" v-show="!data.checked"/>
                        <van-icon name="checked"  v-show="data.checked" color="#1989fa"/>
                    </a>
                </van-cell>
            </van-list>
            <div class="del-box">
                <span style="font-size: 14px; width: 54px">已选：{{this.delArray.length}}</span>
                <van-button round size="small" @click="del" >删除</van-button>
            </div>
        </div>
        <div style="margin-top: 96px;margin-bottom: 100px;" v-show="showcolor">
            <van-list>
                <van-cell v-for="(data,index) in searchData" :key="data._id" class="checkbox-info-box">
                    <a class="info-box info-c" @click="getDataC(index)">
                        <div class="user-info-left">
                            <img :src="data.imgUrl"/>
                            <div class="user-info">
                                <p class="car-title">{{data.color}}</p>
                                <p class="car-info">
                                    <span>{{data.pinpai}}</span>
                                    <span>{{data.decs}}</span>
                                </p>
                            </div>
                        </div>
                        <van-icon name="circle" v-show="!data.checked"/>
                        <van-icon name="checked"  v-show="data.checked" color="#1989fa"/>
                    </a>
                </van-cell>
            </van-list>
            <div class="del-box">
                <span style="font-size: 14px; width: 54px">已选：{{this.delArray.length}}</span>
                <van-button round size="small" @click="del" >删除</van-button>
            </div>
        </div>

<!--        <van-dialog v-model="showedit" title="管理" show-cancel-button :beforeClose="beforeClose">-->
<!--            <van-field style="margin:0.5rem auto" v-model="value" placeholder="请输入信息"/>-->
<!--        </van-dialog>-->

        <!--         <van-tree-select-->
        <!--          :items="items"-->
        <!--          :main-active-index="mainActiveIndex"-->
        <!--          :active-id="activeId"-->
        <!--          @click-nav="onClickNav"-->
        <!--          @click-item="onClickItem"-->
        <!--        />-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tit: "",
                items: [],
                searchData: [],
                mainActiveIndex: 0,
                activeId: 0,
                value: "",
                showpinpai: false,
                showfenlei: false,
                showcolor: false,
                showIpt: "",
                values: "",
                values2: "",
                values3: "",
                showTime: false,
                delArray:[]//删除选中的索引

            };
        },

        mounted() {
            this.init();
            this.activeId = 1;
            this.items = [];
            if (this.$route.params.id == "a") {
                this.tit = "二手车分类管理";
                this.showfenlei = true;
                this.$axios.get("http://localhost:8088/api/getCarList").then(res => {
                    this.items = res.data.map((item) => {
                        return item
                    });
                    this.items.map((item) => {
                        return (item.checked = false);
                    });
                    this.searchData = this.items;
                   // console.log(this.searchData)
                });
            } else if (this.$route.params.id == "b") {
                this.tit = "二手车品牌管理";
                this.showpinpai = true;
                this.showfenlei = false;
                this.$axios.get("http://localhost:8088/api/getCarList").then(res => {
                    this.items = res.data.map((item) => {
                        //  console.log(item.pinpai);
                        return item;
                    });
                    this.items.map((item) => {
                        return (item.checked = false);
                    });
                    this.searchData = this.items;
                });

            } else if (this.$route.params.id == "c") {
                this.tit = "二手车颜色管理";
                this.showpinpai = false;
                this.showfenlei = false;
                this.showcolor = true;
                this.$axios.get("http://localhost:8088/api/getCarList").then(res => {
                    this.items = res.data.map((item) => {
                        // console.log(item.color);
                        return item;
                    });
                    this.items.map((item) => {
                        return (item.checked = false);
                    });
                    this.searchData = this.items;
                });

            } else if (this.$route.params.id == "d") {
                this.tit = "二手车车辆管理";

            }
        },
        methods: {
          onChange(event) {
            this.setData({
              checked: event.detail,
            });
          },
            onCancel() {
                //this.$toast("取消");
            },
            onClickLeft() {
                this.$router.push("/home");
            },
            onClickNav(index) {
                //console.log(index);
                this.mainActiveIndex = index;
            },

            onClickItem(event) {
                this.activeId = event.id;
                this.$router.push(`/carlist?name=${event.text}`);
            },
            ToDelete(a) {
                this.items.splice(a, 1);
            },
            // ToEdit(a) {
            //     this.showIpt = a;
            //     this.showedit = true;
            // },
            // beforeClose(action, done) {
            //     if (action === 'confirm') {
            //         this.items[this.showIpt].color = this.value;
            //         this.items[this.showIpt].leixing = this.value;
            //         this.items[this.showIpt].pinpai = this.value;
            //         setTimeout(done, 500)
            //     } else if (action === 'cancel') {
            //         done() //关闭
            //     }
            // },

            init() {
                // this.$axios
                //   .get("http://localhost:8088/api/carlist/getcarlist", {
                //     params: {
                //       typeid: 1
                //     }
                //   })
                //   .then(res => {
                //     console.log(res);
                //   });
            },
            getDataC(id) {
                let car = this.searchData[id];
                car.checked = !car.checked;
                this.$set(this.searchData, id, car);
                if(car.checked==true){
                    this.delArray.push(car);
                }else {
                    this.delArray.splice(car,1)
                }
               // console.log(this.delArray)
            },
            del(){
             this.searchData=this.searchData.filter(e=>{
                 console.log(e)
                 return !e.checked;
             });
             this.delArray=[]
            },
            searchInfo(){
                var input = this.values;
                if (input) {
                    this.searchData =  this.items.filter(function(car) {
                        //console.log(car)
                        return Object.keys(car).some(function(key) {
                            //console.log(key)
                            return String(car[key]).toLowerCase().indexOf(input) > -1
                        })
                    })
                }else if(input.length == 0){
                    this.searchData =  this.items
                } else {
                    return this.searchData
                }
            },
        },

    };
</script>

<style scoped>
    .van-search{
        position: fixed;
        top: 46px;
        z-index: 3;
        width: 100%;
    }
    .del-box{
        background: #fff;
        position: fixed;
        bottom: 0;
        width: 90%;
        z-index: 999;
        display: flex;
        align-items: center;
        padding: 0 16px;
        height: 50px;
        justify-content: space-between;
    }

    .van-button--round{
    background: linear-gradient(to right,#ff6034,#ee0a24);
        border: none;
        color: #fff;
    }
    .info-box{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }
    .user-info-left{
        display: flex;
        align-items: center;
    }
    .user-info{
        margin-left: 16px;
    }
    .info-box img{
        width: 37px;
        height: 37px;
        border-radius: 50%;
    }
    .van-submit-bar__button{
        width: 74px;
        height: 34px;
        line-height: 32px;
    }
    /*.van-submit-bar{*/
    /*    bottom: 48px;*/
    /*}*/
    .van-icon {
        font-size: 20px;
    }

    .oldcarmsg .van-swipe-cell {
        font-size: 0;
    }

    .wrapp {
        padding: 0 10px;
        font-size: 16px;
    }

    .item {
        white-space: nowrap;
        margin-top: 10px;
        overflow: hidden;
    }

    .check {
        padding: 0 10px;
        width: 40px;
        display: inline-block;
        position: relative;
        top: -30px;
    }

    .content {
        display: inline-block;
        padding: 12px;
        background-color: #fff;
        border-radius: 8px;
        white-space: normal;
    }

</style>