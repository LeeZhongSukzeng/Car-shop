<template>
    <div style="overflow-y: auto;
    margin-bottom: 1.2rem;">
        <van-nav-bar title="保险分类管理" fixed/>
        <van-tabs v-model="active" @change="varttabChange">
            <van-tab title="驾驶人意外险"></van-tab>
            <van-tab title="车主无忧险"></van-tab>
        </van-tabs>
        <van-search
                v-model="values1"
                placeholder="请输入搜索关键词"
                @search="onSearch"
        />
        <div style="margin-top: 146px;margin-bottom: 80px;height: 300px;">
            <van-swipe-cell v-for="(item,index) in datalist" :key="item._id">
                <van-card
                        :tag="item.labname"
                        :num="item.insurancenumber"
                        :price="item.insuranceprice"
                        :desc="item.introduction"
                        :title="item.title"
                        class="goods-card"
                        thumb="http://pimg1.4008000000.com/app_images/baoxian/v10/baoxian_index/qybximgczwy.jpg"
                >
                    <!--                        <template #tags>-->
                    <!--                          <van-tag plain type="danger">{{item.labname}}</van-tag>-->
                    <!--                        </template>-->

                    <template #footer>
                        <van-button size="mini" @click="deleteitem(item._id)">删除</van-button>
                        <van-button size="mini" class="btn" @click="modify(item)">修改</van-button>
                    </template>
                </van-card>
                <!--            <template #right>-->
                <!--                <van-button-->
                <!--                        square-->
                <!--                        text="删除"-->
                <!--                        type="danger"-->
                <!--                        class="delete-button"-->
                <!--                        @click="deleteitem(item._id)"-->
                <!--                />-->
                <!--            </template>-->
            </van-swipe-cell>
        </div>
        <van-button round plain @click="showPopup">新增保险</van-button>
        <van-popup
                v-model="show"
                closeable
                close-icon-position="top-left"
                position="bottom"
                :style="{ height: '70%' }"
        >
            <van-cell-group style="margin-top:1rem">
                <van-field v-model="title" label="标题" placeholder="请输入标题"/>
                <van-field v-model="introduction" label="描述" placeholder="请输入描述"/>
                <van-field v-model="labname" label="标签" placeholder="请输入标签"/>
                <van-field v-model="insurancenumber" label="数量" type="number" placeholder="请输入数量"/>
                <van-field v-model="insuranceprice" label="价钱" type="number" placeholder="请输入价钱"/>
            </van-cell-group>
            <van-button round plain @click="addinsurance">确定</van-button>

        </van-popup>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                active: 0, //0为强制保险1为商业保险
                show: false,
                title: "",
                introduction: "",
                labname: "",
                insurancenumber: 0,
                insuranceprice: 0,
                datalist: [],
                datalist2: [],
                _id: "",
                values1: ""
            };
        },
        methods: {
            onSearch(val) {
                console.log(this.datalist2.filter(item => item.title == val));
                if (this.datalist2.filter(item => item.title == val).length == 0) {
                    this.$toast("暂无此数据");
                    this.datalist = [];
                } else {
                    this.datalist = this.datalist2.filter(item => item.title == val);
                }
            },
            onCancel() {
                this.$toast("取消");
            },
            showPopup() {
                this.title = "";
                this.introduction = "";
                this.labname = "";
                this.insurancenumber = "";
                this.insuranceprice = "";
                this.type = "";
                this.show = true;
            },
            addinsurance() {
                let args = {};
                if (this._id) {
                    args = {
                        title: this.title,
                        introduction: this.introduction,
                        labname: this.labname,
                        insurancenumber: this.insurancenumber,
                        insuranceprice: this.insuranceprice,
                        type: this.active,
                        _id: this._id
                    };
                } else {
                    args = {
                        title: this.title,
                        introduction: this.introduction,
                        labname: this.labname,
                        insurancenumber: this.insurancenumber,
                        insuranceprice: this.insuranceprice,
                        type: this.active
                    };
                }
                this.$axios
                    .get("http://localhost:8088/api/insurance/createsurance", {
                        params: args
                    })
                    .then(res => {
                        console.log(res);
                        this.$toast("添加成功");
                        this.show = false;
                        this.getinsuranceList();
                    });
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
                            this.datalist2 = res.data;
                        }
                    });
            },
            deleteitem(_itemid) {
                this.$axios
                    .get("http://localhost:8088/api/insurance/deletesurance", {
                        params: {
                            _id: _itemid
                        }
                    })
                    .then(res => {
                        console.log(res, "请求成功");
                        if (res.status == 200) {
                            this.$toast("删除成功");
                            this.getinsuranceList();
                        }
                    });
            },
            varttabChange(index) {
                this.getinsuranceList();
            },
            modify(data) {
                let {
                    title,
                    introduction,
                    labname,
                    insurancenumber,
                    insuranceprice,
                    type,
                    _id
                } = data;
                this.title = title;
                this.introduction = introduction;
                this.labname = labname;
                this.insurancenumber = insurancenumber;
                this.insuranceprice = insuranceprice;
                this.type = type;
                this._id = _id;
                this.show = true;
            }
        },
        mounted() {
            this.getinsuranceList();
        }
    };
</script>
<style scoped>
    .van-search, .van-tabs {
        position: fixed;
        top: 46px;
        z-index: 1;
        width: 100%;
    }

    .van-button--normal[data-v-b6e0b698] {
        position: fixed;
    }

    .van-search {
        top: 90px;
    }

    .goods-card {
        margin: 0;
        background-color: #fff;
    }

    .delete-button {
        height: 100%;
    }

    .van-card__desc {
        text-align: initial
    }

    .van-card__title {
        font-size: 14px;
        text-align: initial;
    }

    .van-card__bottom {
        text-align: initial;
        display: flex;
    }

    .van-card__price {
        color: #de0041;
    }

    .van-card__content {
        left: 10px;
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

    .btn {
        color: #fff;
        background: #59a2fc;
        padding: 0 4px;
        border: none;
    }
</style>