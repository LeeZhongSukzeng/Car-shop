<template>
  <div style="margin-bottom: 60px;">
    <van-tabs v-model="active" @change="changeTab">
      <van-tab title="系统通知">
        <van-notice-bar
                color="#1989fa"
                background="#ecf9ff"
                left-icon="info-o"
        >系统消息主要是通知系统内部信息
        </van-notice-bar>
      </van-tab>
      <van-tab title="打折通知">
        <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o" v-show="showTime==false">
          打折通知是打折力度最大的车辆进行通知
        </van-notice-bar>
      </van-tab>
      <van-tab title="车展通知">
        <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o" v-show="showTime==false">
          车展信息主要是车展活动的最新通知
        </van-notice-bar>
      </van-tab>
    </van-tabs>
    <van-cell v-for="(item,index) in dataList" :key="item._id">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <!--      <template #title>-->
      <!--        <van-tag type="danger">{{namelist[active]}}</van-tag>-->
      <!--      </template>-->
      <!--      <template #label>-->
      <!--        <div>{{item.fbmain}}</div>-->
      <!--        <div>发布人:{{item.fbuser}}&nbsp;&nbsp;&nbsp;&nbsp;发布时间:{{item.fbtime}}</div>-->
      <!--      </template>-->
      <van-panel :title="item.fbuser" :status="item.fbtime">
        <template>{{item.fbmain}}</template>
        <template #footer>
          <van-button round size="mini" class="btn" @click="modify(item,index)" v-show="showTime==true">修改
          </van-button>
          <van-button round size="mini" type="danger" @click="Todel(index)" v-show="showTime==true">删除
          </van-button>
        </template>
      </van-panel>
    </van-cell>
    <van-popup
            v-model="show"
            closeable
            close-icon-position="top-left"
            position="bottom"
            :style="{ height: '50%' }"
    >
      <van-cell-group style="margin-top:1rem">
        <van-field v-model="editList.fbmain" label="内容" placeholder="内容"/>
      </van-cell-group>
      <van-button round plain @click="updatetongzhi">确定</van-button>
    </van-popup>
  </div>
</template>
<script>
  import Cookies from "js-cookie";
  export default {
    data() {
      return {
        active: 0,
        dataList: [],
        namelist: ["系统通知", "车展通知", "打折通知"],
        showTime: false,
        show: false,
        editList: {
          fbmain:'',fbtype:'',fbtime:'',fbuser:''
        },
        editIndex:'',


      };
    },
    mounted() {
      this.getdata();
      if (Cookies.get("userId") == "3") {
        this.showTime = true;
        this.$parent.showCar = false;
      } else {
        this.showTime = false;
        this.$parent.showCar = true;
      }
      this.$parent.showto = true;
    },
    methods: {
      getdata() {
        this.$axios
                .get("http://localhost:8088/api/tongzhi/gettongzhilist", {
                  params: {
                    fbtype: 1 + this.active
                  }
                })
                .then(res => {
                  this.dataList = res.data;
                });
      },
      changeTab() {
        this.getdata();
      },
      Todel(idx) {
        if (idx === -1) {
          console.log('删除失败')
        } else {
          this.dataList.splice(idx, 1);
        }
      },
      modify(item,index){
        this.show=true;
        this.editIndex = index;
        this.editList ={
          fbuser:item.fbuser,
          fbtype: item.fbtype,
          fbtime:item.fbtime,
          fbmain: item.fbmain,
        };

      },
      updatetongzhi(){
        this.$set(this.dataList,this.editIndex,this.editList);
        this.show=false;
        console.log(this.dataList);
        console.log(this.editList)
      }
    }
  };
</script>
<style scoped>
  .van-panel__footer {
    display: flex;
    justify-content: flex-end;
  }

  .van-panel {
    border-bottom: 1px solid #ebedf0
  }

  .van-cell:not(:last-child)::after {
    border-bottom: none
  }

  [class*=van-hairline]::after {
    border: none;
  }

  .van-panel__content {
    padding: 0 16px;
  }

  .van-panel__header-value {
    color: #646566;
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