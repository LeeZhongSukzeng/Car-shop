<template>
    <div class="shoppingcar">
        <van-nav-bar title="购物车" @click-left="onClickLeft" fixed left-arrow/>
        <div style="margin-top: 46px;margin-bottom:60px;">
            <div v-show="showTime">
                <van-contact-card
                        :type="cardType"
                        :name="currentContact.name"
                        :tel="currentContact.tel"
                        @click="showList = true"
                />

                <!-- 联系人列表 -->
                <van-popup v-model="showList" position="bottom">
                    <van-contact-list
                            v-model="chosenContactId"
                            :list="list"
                            @add="onAdd"
                            @edit="onEdit"
                            @select="onSelect"
                    />
                </van-popup>

                <!-- 联系人编辑 -->
                <van-popup v-model="showEdit" position="bottom">
                    <van-contact-edit
                            :contact-info="editingContact"
                            :is-edit="isEdit"
                            @save="onSave"
                            @delete="onDelete"
                    />
                </van-popup>
                <div class="count">
                    <div class="info" v-for="(item,index) in shopcarList">

                        <a class="details" @click="choose(index)">
                            <van-icon name="circle" v-show="!item.status"/>
                            <van-icon name="checked" v-show="item.status" color="#1989fa"/>
                            <img
                                    class="commodity"
                                    :src="item.imgUrl"
                                    alt="商品"
                            />
                            <div class="product_info">
                                <div class="product_name">{{item.pinpai}}  {{item.leixing}}</div>
                                <div class="format">
                                    <span>{{item.color}}</span>
                                    <span>{{item.decs}}</span>
                                </div>
                                <div class="price">¥ {{item.xianjia}}万  <span style="font-size:12px;text-decoration: line-through;color:#c5c5c5;">￥{{item.yuanjia}}万</span></div>

                                <a class="last" @click="ToDelete(item._id)">
                                    <van-icon name="delete"/>
                                </a>
                            </div>
                        </a>
                    </div>
                    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
                    </van-submit-bar>

                </div>
            </div>
            <!--            <div class="car-list" v-for="(item,index) in shopcarList" v-show="isShow">-->
            <!--                <van-card-->
            <!--                        :price="item.xianjia"-->
            <!--                        :desc="item.decs"-->
            <!--                        :title="item.pinpai"-->
            <!--                        :thumb="item.imgUrl"-->
            <!--                        :origin-price="item.yuanjia"-->
            <!--                >-->
            <!--                    <template #bottom>-->
            <!--                        <van-stepper v-model="values" @plus="addorder" @minus="jsorder" input-width="30px"/>-->
            <!--                        &lt;!&ndash;          <van-dropdown-menu>&ndash;&gt;-->
            <!--                        &lt;!&ndash;            <van-dropdown-item v-model="value1" :options="option1" />&ndash;&gt;-->
            <!--                        &lt;!&ndash;          </van-dropdown-menu>&ndash;&gt;-->
            <!--                    </template>-->
            <!--                    <template #footer>-->
            <!--                        <van-button size="mini" @click="Todel(item._id)">删除</van-button>-->
            <!--                    </template>-->
            <!--                </van-card>-->
            <!--            </div>-->
        </div>
        <!--        <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit"/>-->
        <!--    </div>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                values: 1,
                value: "",
                shopcarList: "",
                chosenContactId: null,
                editingContact: {},
                showList: false,
                showEdit: false,
                isEdit: false,
                isShow: false,
                list: [
                    {
                        name: "张三",
                        tel: "13000000000",
                        id: 0
                    }
                ],
                totalPrice: 0,
                showTime: true,
                value1: 0,

                // option1: [
                //   { text: "白色", value: 0 },
                //   { text: "黑色", value: 1 },
                //   { text: "棕色", value: 2 },
                //   { text: "蓝色", value: 3 }
                // ],
            };
        },
        computed: {
            cardType() {
                return this.chosenContactId !== null ? "edit" : "add";
            },

            currentContact() {//当前联系人
                const id = this.chosenContactId;
                return id !== null ? this.list.filter(item => item.id === id)[0] : {};
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.$axios.get("http://localhost:8088/api/getShopCar").then(res => {
                    this.shopcarList = res.data;
                    this.shopcarList.map((item) => {
                        return (item.status = false);
                    });
                });
            },
            choose(_id) {
                let theCar = this.shopcarList[_id];
                //拿到当前的索引值
                this.shopcarList.forEach((item) => {
                    item.status = false;
                });
                theCar.status = true;
                this.$set(this.shopcarList, _id, theCar);
               // console.log(this.shopcarList);
                for (let i = 0; i < this.shopcarList.length; i++) {
                    if (this.shopcarList[i].status == true) {   //判断商品选择的状态，如果选中
                        this.totalPrice = parseFloat(this.shopcarList[i].xianjia) * 1000000;
                        console.log(this.totalPrice)
                    }
                }
            },
            // 添加联系人
            onAdd() {
                this.editingContact = {id: this.list.length};
                this.isEdit = false;
                this.showEdit = true;
            },

            // 编辑联系人
            onEdit(item) {
                //item当前联系人对象
                this.isEdit = true;
                this.showEdit = true;
                this.editingContact = item;
            },

            // 选中联系人
            onSelect() {
                this.showList = false;
            },

            // 保存联系人
            onSave(info) {
                this.showEdit = false;
                this.showList = false;
                console.log(info)
                if (this.isEdit) {
                    this.list = this.list.map(item => (item.id === info.id ? info : item));
                } else {
                    this.list.push(info);
                }
                this.chosenContactId = info.id;
            },

            // 删除联系人
            onDelete(info) {
                this.showEdit = false;
                this.list = this.list.filter(item => item.id !== info.id);
                if (this.chosenContactId === info.id) {
                    this.chosenContactId = null;
                }
                // pinpai
            },
            onClickLeft() {
                this.$router.push("/home");
            },
            showPopup() {
                this.$router.push("/serviceManagent/insuranceDetail");
            },
            ToDelete(itemid) {
                this.$axios
                    .get("http://localhost:8088/api/delShopCar", {
                        params: {
                            _id: itemid
                        }
                    })
                    .then(res => {
                        this.init();
                        this.totalPrice = 0;
                    });
            },
            onSubmit(_id) {
                // this.$router.push("/user");
                //获取今天的时间
                var day2 = new Date();
                day2.setTime(day2.getTime());
                //下单时间
                var s2 =
                    day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
                //随机生成6位数订单号
                var cd = parseInt(Math.random() * (999999 - 100000) + 100000);
                //console.log(cd);
                let params;
                for (let i = 0; i < this.shopcarList.length; i++) {
                    if (this.shopcarList[i].status == true) {   //判断商品选择的状态，如果选中
                        params = {
                            imgurl: this.shopcarList[i].imgUrl,
                            carname: this.shopcarList[i].pinpai,
                            price: this.shopcarList[i].xianjia,
                            color: this.shopcarList[i].color,
                            ordertime: s2,
                            orderno: cd
                        };
                        console.log(params)
                    }
                }
                this.$axios
                    .get("http://localhost:8088/api/orderlist/addorder", {
                        params
                    })
                    .then(res => {
                        this.$toast("订单提交成功");
                        this.$router.push("/user");
                    });
                // console.log(params);
            }

        }
    };
</script>

<style lang="scss" scoped>
    .shoppingcar {
        .van-icon {
            font-size: 20px;
        }

        .van-card__content {
            text-align: left;
            margin-left: 0.2rem;
        }

        .van-card__origin-price {
            margin-right: 50px;
        }

        .van-stepper {
            width: 50%;
            display: inline-block;
        }

        .van-dropdown-menu {
            width: 50%;
            display: inline-block;
            background: none;
            height: auto;

            .van-dropdown-menu__item {
                /*height: 50px;*/
            }
        }
    }

    .info {
        width: 96%;
        background-color: #ffffff;
        padding: 10px;
        box-sizing: border-box;
        margin: 10px auto 0px;
    }

    .shop_top {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .shop_top img {
        margin-left: 15px;
        width: 8px;
    }

    .line {
        width: 2px;
        height: 20px;
        background: #eccd00;
        margin-left: 8px;
    }

    .shop_name {
        font-size: 14px;
        margin-left: 18px;
    }

    .details {
        display: flex;
        align-items: center;
    }

    .unchecked,
    .chosen {
        width: 18px;
        height: 18px;
    }

    .commodity {
        width: 80px;
        height: 80px;
        border-radius: 5px;
        margin-left: 10px;
    }

    .product_info {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin-left: 10px;
        align-items: flex-start;
        position: relative;
        top: 12px;
    }

    .product_name {
        font-size: 14px;
    }

    .format {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .format span {
        font-size: 12px;
        color: #777777;
        margin-right: 10px;
        padding: 2px;
        box-sizing: border-box;
        border-radius: 2px;
    }

    .price {
        font-size: 14px;
        color: red;
        margin-top: 8px;
    }

    .select {
        display: flex;
        align-items: center;
    }

    .less,
    .add {
        width: 17px;
    }

    .select span {
        margin: 0 10px;
    }

    .delete {
        width: 17px;
        height: 18px;
    }

    .last {
        margin-left: 90%;
        width: 20px;
        display: flex;
        position: relative;
        top: -20px;

    }

    .base {
        width: 100%;
        height: 55px;
        border-top: 1px solid #b8b8b8;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .select_all {
        width: 30%;
        padding-left: 20px;
        display: flex;
        align-items: center;
    }

    .select_all span {
        font-size: 15px;
        margin-left: 5px;
    }

    .rol {
        width: 70%;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }

    .total {
        width: 30%;
        font-size: 13px;
        display: flex;
        align-items: center;
    }

    .total span {
        font-size: 17px;
        color: red;
    }

    .submit_order {
        text-align: center;
        line-height: 55px;
        height: 55px;
        background: #eccd00;
        color: #ffffff;
        font-size: 18px;
        width: 50%;
    }
</style>