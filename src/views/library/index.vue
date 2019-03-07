<template>
  <div id="library">
    <van-nav-bar
      :title=title
      @click-left=""
      @click-right="">
      <a href="backPage" slot="left"><img class="backIcon" src="../../../static/img/back@2x.png" alt="" slot="left"></a>
    </van-nav-bar>
    <form action="/">
      <van-search
        class="searchIn"
        v-model="value"
        :placeholder="$t('common.search')"
        show-action
        @focus="showhot"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="search">
      <p class="cardTitle">{{$t('common.popularSearches')}}</p>
      <div class="hotCard">
        <span @click="toWords">BTC</span>
        <span @click="toWords">ETH</span>
        <span @click="toWords">XRP</span>
        <span @click="toWords">LTC</span>
        <span @click="toWords">LTC</span>
        <span @click="toWords">ECH</span>
        <span @click="toWords">EOS</span>
        <span @click="toWords">ECH</span>
        <span @click="toWords">EOS</span>
      </div>
    </div>
    <div class="allBox">
      <table border="1" cellspacing="0" cellpadding="0"
             style="border-collapse: collapse;border-width:0; border-style:hidden;">
        <tr class="boxTitle">
          <td>{{$t('common.name')}}</td>
          <td>{{$t('common.latestPrice')}}</td>
          <td>{{$t('common.quote')}}</td>
        </tr>
      </table>
    </div>
    <div v-for="item in libraryData">
      <van-row class="vanTr" justify="center" align="center">
        <div  @click="toDetail(item.key_id)">
        <van-col span="12" class="vanLeft vanCol" justify="center" align="center">
          <van-row>
            <van-col span="4" justify="center" align="center">
              <img :src='item.icon' alt="">
            </van-col>
            <van-col span="6" offset="1" justify="center" align="left" class="leftname">
              {{item.symbol}}
            </van-col>
            <van-col span="13" align="left" justify="center" class="leftid">
              {{item.name}}
            </van-col>
          </van-row>
          <van-row>
            <van-col span="24" align="left">
              <p class="">&nbsp;{{$t('common.marketValue')}}&nbsp;&nbsp;&nbsp;$<label>{{(item.market_cap*0.000000001).toFixed(2)}}</label>&nbsp;{{$t('common.billion')}}</p>
            </van-col>
          </van-row>
          </van-col>
          <van-col span="6" class="vanCenter vanCol" justify="center" align="right">
            <span>$</span>
            {{item.price_usd}}
          </van-col>
          <van-col span="6" class="vanRight vanCol" v-if="item.percent_change_1h >= '0'" justify="center" align="right">
            <van-col span="24">
              <span class="greenRate">{{item.percent_change_1h}}%</span>
            </van-col>
            <van-col span="24">
              <p class="">&nbsp;{{$t('common.vol')}}&nbsp;$<label>{{(item.volume_24h*0.000000001).toFixed(2)}}</label>&nbsp;{{$t('common.billion')}}
              </p>
            </van-col>
          </van-col>
          <van-col span="6" class="vanRight vanCol" v-else justify="center" align="right">
            <span class="redRate">{{item.percent_change_1h}}%</span>
            <p class="prVolSpan">
              &nbsp;{{$t('common.vol')}}&nbsp;$<label>{{(item.volume_24h*0.000000001).toFixed(2)}}</label>&nbsp;{{$t('common.billion')}}
            </p>
          </van-col>
        </div>
        </van-row>
    </div>
    <van-loading color="black" size="1rem" class="loadingBox"/>
    <p class="getMore" @click="getMore">加载更多</p>
  </div>
</template>

<script>
  import {blockList, searchCoin, moreList} from '@/service/getData';
  import {NavBar, Tabs, Tab, Pagination, Loading, Popup, Search, Toast,Row, Col} from 'vant';
  import $ from 'jquery';
  export default {
    data() {
      return {
        title: this.$t('common.currencyLibrary'),
        all: this.$t('common.all'),
        libraryData: [],
        searchData: [],
        currentPage: 1,
        value: '',
        id: ''
      }
    },
    name: "library",
    components: {
      [NavBar.name]: NavBar,
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
      [Pagination.name]: Pagination,
      [Loading.name]: Loading,
      [Popup.name]: Popup,
      [Search.name]: Search,
      [Toast.name]: Toast,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    mounted() {
      this.getLibrary()
    },
    methods: {
      //获取数据
      getLibrary() {
        let _this = this;
        blockList().then(res => {
          if(res.status == 200) {
            _this.libraryData = res.data.data;
            _this.nextUrl = res.data.next_page_url;
            // console.log(res.data.data);
          }else{
            Toast.fail('数据加载失败');
            $('.getMore').text('暂无数据');
            $('.getMore').css({'color':'#333','background-color':'#fff'})
          }
        })
      },
      //获取更多
      getMore() {
        $('.loadingBox').css("display", "block");
        setTimeout(() => {
          $('.loadingBox').css("display", "none");
          var _this = this;
          var next = _this.nextUrl;
          var replaceNext = next.replace('http://192.168.0.108:8001', "");
          // console.log(replaceNext);
          moreList(replaceNext).then(res => {
            if(res.status == 200) {
              _this.newData = res.data.data;
              _this.libraryData = _this.libraryData.concat(_this.newData);
              _this.nextUrl = res.data.next_page_url;
            }else {
              Toast.fail('数据加载失败');
              $('.getMore').text('暂无数据');
              $('.getMore').css({'color':'#333','background-color':'#fff'})
            }
          })
        }, 600)
      },
      //查看详情
      toDetail(e) {
        this.$router.push({path: '/detail', query: {id: e}});
      },
      //显示搜索热点
      showhot() {
        $('.search').css("display", "block");
      },
      //选择搜索热点
      toWords(e) {
        var hotWords = e.target.innerText;
        $('.van-field__control').val(hotWords);
        // console.log($('.van-field__control').val());
        this.onSearch(hotWords);
        $('.search').css("display", "none");
      },
      //搜索数据
      onSearch() {
        var _this = this;
        var key = $('.van-field__control').val();
        searchCoin(key).then(res => {
          _this.libraryData = res.data;
          // console.log(_this.libraryData);
        })
      },
      //取消搜索
      onCancel() {
        $('.searchIn').val('');
        setTimeout(() => {
          $('.search').css("display", "none");
        }, 200);
      },
    }
  }
</script>

<style>
  .vanTr{
    /*overflow: hidden;*/
    padding:0.05rem 0 0.05rem 0;
    margin:0;
    border-bottom: 1px solid #DEDEDE;
  }
  .vanCol{
    overflow: hidden;
  }
  .vanLeft{
    padding-left: .07rem;
  }
  .vanLeft img{
    width: .2rem;
    height: .2rem;
    margin-top:.03rem;
    margin-left:.045rem;
  }
  .leftname{
    color: #333;
    font-size: .14rem;
    margin-top:.05rem;
    overflow: hidden;
  }
  .leftid{
    font-size: .1rem;
    color: #777;
    font-style: normal;
    max-width: 1.1rem;
    overflow: hidden;
    padding-top:.085rem;
  }
  .vanLeft p{
    font-weight: 200;
    color: #777;
    font-size: .12rem;
    height: .12rem;
    line-height: .12rem;
    margin:.02rem 0 0 .05rem;
  }
  .vanCenter{
    font-weight: bold;
    color: #1873B9;
    font-size: .16rem;
    padding-right: .05rem;
    padding-top:.12rem;
  }
  .vanRight{
    font-size: .12rem;
    padding-right: .1rem;
  }
  .vanRight span{
    color: #fff;
    display: inline-block;
    border-radius: .04rem;
    height: .2rem;
    line-height: .2rem;
    padding: .01rem .07rem;
    margin-top:.03rem;
  }
  .vanRight p{
    color: #777;
    font-size: .12rem;
    height: .12rem;
    line-height: .12rem;
    margin-top:.06rem;
  }


  /*search*/

  .searchCard .searchIn {
    width: 88%;
    height: .3rem;
    border-radius: 15px;
    outline: none;
    border: none;
    box-shadow: 0 0 10px 2px #d4d4d4;
    text-indent: .36rem;
    float: left;
  }

  .searchCard i {
    position: absolute;
    display: inline-block;
    left: .1rem;
    top: .06rem;
    width: .2rem;
    height: .2rem;
    background: url("../../../static/img/icon-search@2x.png") no-repeat center/ .2rem .2rem;
  }

  .searchCard .cancel {
    /* display: inline-block; */
    width: 10%;
    height: .3rem;
    line-height: .3rem;
    text-align: center;
    font-size: .14rem;
    color: #79AEDF;
    margin-left: .05rem;
    float: left;
  }

  .search {
    display: none;
  }

  .hotCard {
    height: auto;
    width: 93.6%;
    margin-left: 3.2%;
    margin-bottom: .1rem;
    background: #fff;
    box-shadow: 0 0 5px .5px #d4d4d4;
    border-radius: .08rem;
  }

  .hotCard span {
    display: inline-block;
    width: 30%;
    height: .35rem;
    line-height: .35rem;
    font-size: .12rem;
    text-align: center;
  }

  /*tabs*/
  .van-tabs--line .van-tabs__wrap {
    height: 22px;
    width: 93.6%;
    margin-left: 3.2%;
  }

  .van-tabs__wrap--scrollable .van-tab {
    flex: 0 0 11%;
    -webkit-flex: 0 0 11%;
  }



  .allBox {
    height: auto;
    width: 100%;
    margin: .1rem 0;
    border-top: 1px solid #DEDEDE;
    border-bottom: 1px solid #DEDEDE;
    float: left;

  }

  .allBox td {
    font-size: .14rem;
    border: 1px solid #DEDEDE;
    text-align: center;
    border-right: 0;
    border-left: 0;
    overflow: hidden;
  }

  .allBox td:nth-child(2) {
    text-align: right;
    padding-right: .05rem;
  }

  .allBox table {
    width: 100%;
    height: auto;
    color: #333;
    border-left: 0;
    border-right: 0;
    max-width: 100%;
    overflow: hidden;
  }

  .allBox .boxTitle td {
    height: .5rem;
    font-size: 15px;
  }

  .allBox .boxTitle td:last-child {
    padding-right: .1rem;
  }

  .allBox .boxTitle td:first-child {
    width: 50%;
    text-align: left;
    text-indent: .35rem;
  }

  .allBox .boxTitle td:nth-child(2) {
    width: 25%;
  }

  .allBox .boxTitle td:last-child {
    width: 25%;
    text-align: right;
  }

  .coinTr td:first-child {
    position: relative;
    text-align: left;
    padding-left: .07rem;
  }

  .coinTr td:first-child span {
    color: #333;
    font-size: .14rem;
    display: inline-block;
    position: relative;
    left: .15rem;
    top: -.05rem;
    height: .3rem;
  }

  .coinTr td:first-child p {
    font-weight: 200;
    color: #777;
    font-size: .12rem;
    height: .12rem;
    line-height: .12rem;
    position: relative;
    top: -.09rem;
  }

  .coinTr td:first-child i {
    font-size: .1rem;
    color: #777;
    font-style: normal;
    display: inline-block;
    position: relative;
    left: .2rem;
    top: .07rem;
    height: .3rem;
    line-height: .3rem;
    max-width: 1.1rem;
    overflow: hidden;
  }

  .coinTr td:first-child img {
    position: relative;
    left: .05rem;
    top: .05rem;
    width: .2rem;
    height: .2rem;
    float: left;
  }

  .coinTr td:nth-child(2) {
    font-weight: bold;
    color: #1873B9;
    font-size: .16rem;
  }

  .greenRate {
    background-color: #34a853;
  }

  .redRate {
    background-color: #ea4235;
  }

  .coinTr td:nth-child(3) p {
    color: #777;
    font-size: .12rem;
    height: .12rem;
    line-height: .12rem;
    position: relative;
    top: -.05rem;
    text-align: right;
  }

  .coinTr td:nth-child(3) span {
    display: inline-block;
    border-radius: .04rem;
    height: .2rem;
    line-height: .2rem;
    padding: .01rem .07rem;
    position: relative;
    top: -.01rem;
  }

  .coinTr td:nth-child(3) {
    font-size: .12rem;
    color: #fff;
    text-align: right;
    padding-right: .1rem;
    box-sizing: border-box;
  }

  .getMore {
    width: 93.6%;
    font-size: .14rem;
    color: #fff;
    background-color: #1873B9;
    height: .32rem;
    line-height: .32rem;
    display: inline-block;
    margin: .2rem 3.2%;
    text-align: center;
    max-width: 100%;
  }

  /*vant css*/
  .van-tab--active {
    color: #2982C7;
  }

  .van-tabs__line {
    background-color: #2982C7;
  }

  .loadingBox {
    margin: -100% 36%;
    float: left;
    /*position: absolute;*/
    display: none;
    z-index:9999;
  }
</style>
