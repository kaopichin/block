<template>
  <div id="detail">
    <van-nav-bar
      :title='coinInfo.name'
      @click-left="onClickLeft"
      @click-right="onClickRight">
      <img class="backIcon" src="../../../static/img/back@2x.png" alt="" slot="left">
      <!--<img class="shareIcon" src="../../../static/img/icon_share@2x.png" alt="" slot="right">-->
    </van-nav-bar>
    <div class="innerBox">
      <div class="coinCard">
        <div class="coinInner">
          <img class="coinIcon" :src='coinInfo.icon' alt="">
          <div class="coinName">
            <p>{{coinInfo.symbol}}</p>
            <p>{{coinInfo.name}}</p>
          </div>
          <div class="coinPrice">
            <p class="priceCNY">$&nbsp;{{coinInfo.price_usd}}</p>
            <p class="priceNew" v-if="coinInfo.percent_change_24h >= '0'"><span class="greenSpan">{{coinInfo.percent_change_24h}} %</span><span>{{$t('common.quote24')}}&nbsp; </span></p>
            <p class="priceNew" v-else><span class="redSpan">{{coinInfo.percent_change_24h}} %</span><span>{{$t('common.quote24')}}&nbsp; </span></p>
          </div>
        </div>
      </div>
      <p class="cardTitle">{{$t('common.theWholeNetWorkMarket')}}</p>
      <div class="quotes cardBoxes">
        <div class="quoOne quoBox boxes">
          <span>{{$t('common.marketValue')}}</span>
          <span><i>$</i>{{(coinInfo.market_cap*0.000000001).toFixed(2)}} {{$t('common.billion')}}</span>
          <span>{{$t('common.ranking')}}：{{coinInfo.rank}}</span>
        </div>
        <div class="quoTwo quoBox boxes">
          <span>{{$t('common.tradingVolume')}}(24H)</span>
          <span><i>$</i>{{(coinInfo.volume_24h*0.000000001).toFixed(2)}}  {{$t('common.billion')}}</span>
        </div>
        <div class="quoThree quoBox boxes">
          <span>{{$t('common.usdPrice')}}</span>
          <span><i>$</i>{{coinInfo.price_usd}}</span>
        </div>
        <div class="quoFour quoBox boxes">
          <span>{{$t('common.bitPrice')}}</span>
          <span>{{coinInfo.price_btc}}  BTC</span>
        </div>
      </div>
      <p class="cardTitle">
        {{coinInfo.name}}{{$t('common.chart')}}
      </p>
      <div class="box">
        <div id="container" class="container"></div>
      </div>
      <p class="cardTitle">{{$t('common.basicInformation')}}</p>
      <div class="baseCard cardBoxes">
        <div class="baseOne boxes baseBox">
          <span>{{$t('common.name')}}</span><span>{{coinInfo.name}}、{{coinInfo.symbol}}、{{coinInfo.key_id}}</span>
        </div>
        <div class="baseFour boxes baseBox">
          <span>{{$t('common.liquidity')}}</span><span>{{(coinInfo.total_supply*0.0001).toFixed(2)}}&nbsp;&nbsp;{{$t('common.thousand')}} {{coinInfo.symbol}}</span>
        </div>
        <div class="baseFive boxes baseBox">
          <span>{{$t('common.totalAmountOfIssuance')}}</span><span>{{(coinInfo.max_supply*0.0001).toFixed(2)}}&nbsp;&nbsp;{{$t('common.thousand')}} {{coinInfo.symbol}}</span>
        </div>
        <div class="baseSix boxes">
          {{coinInfo.description}}
          <!--<span>{{$t('common.more')}}</span>-->
        </div>
      </div>

      <p class="cardTitle">{{$t('common.link')}}</p>
      <div class="linkCard cardBoxes">
        <div class="linkOne boxes linkBox" v-for=" item in coinDes">
          <span v-if="item.type==0">{{$t('common.website')}}</span>
          <span v-if='item.type==1'>{{$t('common.browser')}}</span>
          <span v-if="item.type==2">{{$t('common.community')}}</span>
          <span v-if='item.type==3'>{{$t('common.messageBoard')}}</span>
          <span v-if="item.type==4">{{$t('common.chat')}}</span>
          <span v-if='item.type==5'>{{$t('common.sourceCode')}}</span>
          <span><a class="linkes" :href='item.url' target="_blank" >{{item.url}}</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Cell, CellGroup, Icon, NavBar, Toast} from 'vant';
  import {detail, detailEn, kline} from '@/service/getData';
  import $ from 'jquery';

  import Highcharts from 'highcharts/highstock';
  import HighchartsMore from 'highcharts/highcharts-more';
  import HighchartsDrilldown from 'highcharts/modules/drilldown';
  import Highcharts3D from 'highcharts/highcharts-3d';
  HighchartsMore(Highcharts);
  HighchartsDrilldown(Highcharts);
  Highcharts3D(Highcharts);

  export default {
    name: 'detail',
    data() {
      return {
        stockChart: null,
        id: 0,
        coinInfo: [],
        coinDes: [],
        time:'1y'
      }
    },
    components: {
      [NavBar.name]: NavBar,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Icon.name]: Icon,
      [Toast.name]: Toast,
    },
    mounted() {
      this.charts();
      this.getInfo();
    },
    methods: {
      //获取币种详情
      getInfo() {
        let coinId = this.$route.query.id;
        if (this.$i18n.locale == 'zh_CN') {
          let _this = this;
          detail(coinId).then(res => {
            if(res.status == 200) {
              _this.coinInfo = res.data;
              // console.log(res.data);
              _this.coinDes = res.data.extend;
              _this.volume24 = res.data.volume_24h;
              _this.volume = _this.volume24 * 0.000000001;
            }else{
              $('.innerBox').text('暂无数据');
              $('.innerBox').css({'padding':'48% 0 0 43.5%'});
            }
          })
        } else {
          let _this = this;
          detailEn(coinId).then(res => {
            if(res.status == 200) {
              _this.coinInfo = res.data;
              _this.coinDes = res.data.extend;
              _this.volume24 = res.data.volume_24h;
              _this.volume = _this.volume24 * 0.000000001;
            }else{
              $('.innerBox').text('No Data');
              $('.innerBox').css({'padding':'48% 0 0 43.5%'});
            }
          })
        }
        return coinId;
      },
      //vant methods
      onClickLeft() {
        history.go(-1)
      },
      onClickRight() {
      },
      //图表
      charts() {
        var coinId = this.$route.query.id;
        var aa=this.time;
        // console.log(aa);
        kline(coinId,aa).then(res => {
          // console.log(res);
          if(res.status !== 200){
            // Toast.fail('图表加载失败');
            $('.box').text('暂无数据');
            $('.box').css({'padding':'45% 0 0 38.2%'})
          }else {
            var pot = res.data;

            var a = pot.market_cap_by_available_supply;
            var b = pot.price_btc;
            var c = pot.price_usd;
            var d = pot.volume_usd;

            var marketCap = [];
            var priceBtc = [];
            var priceUsd = [];
            var volume = [];
            var dataLength = a.length,
              // set the allowed units for data grouping
              groupingUnits = [
                [
                  'minute', // unit name
                  [1] // allowed multiples
                ],
                [
                  'month', [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12]
                ]
              ],
              i = 0;
            for (i; i < dataLength; i += 1) {
              marketCap.push([
                a[i][0], // the date
                a[i][1], // num
              ]);
              priceBtc.push([
                a[i][0], // the date
                b[i][1], // num
              ]);
              priceUsd.push([
                a[i][0], // the date
                c[i][1], // num
              ]);
              volume.push([
                a[i][0], // the date
                d[i][1] // the volume
              ]);
            }
            Highcharts.setOptions({
              lang: {
                rangeSelectorZoom: ''
              }
            });
          }
          // create the chart
          Highcharts.stockChart('container', {
            chart: {
              type: 'line',
              zoomType: 'x'
            },
            //底部选择器
            navigator: {
              color: '#a732a5',
              fillOpacity: 0.05,
              dataGrouping: {
                smoothed: true
              },
              lineWidth: 1,
              adaptToUpdatedData: false,
              series: {
                data: marketCap,
              }
            },
            //底部滚动条
            scrollbar: {
              liveRedraw: false,
              enabled: false
            },
            //去掉水印
            credits: {
              enabled: false
            },
            //标题
            // title: {
            //   text:s
            // },
            //图例
            legend: {
              enabled: true,
              align: "center",
              verticalAlign: 'bottom',
              layout : 'horizontal',
            },
            //提示框
            tooltip: {
              shared: true,
              borderColor: '#666',
              borderRadius: 5,
              followPointer: true,
              followTouchMove: true,
              split: false,
              xDateFormat: '%Y-%m-%d-%H:%M:%S',
              // valueDecimals:2
            },
            //范围选择器
            rangeSelector: {
              buttons: [{
                type: 'day',
                count: 1,
                text: '1d',
                dataGrouping: {
                  forced: true,
                  units: [['minute', [1]]]
                }
              },
                {
                  type: 'day',
                  count: 7,
                  text: '7d',
                  dataGrouping: {
                    forced: true,
                    units: [['minute', [1]]]
                  }
                }, {
                  type: 'month',
                  count: 1,
                  text: '1m',
                  dataGrouping: {
                    forced: true,
                    units: [['hour', [1]]]
                  }
                }, {
                  type: 'year',
                  count: 1,
                  text: '1y',
                  dataGrouping: {
                    forced: true,
                    units: [['day', [1]]]
                  }
                },  {
                  type: 'all',
                  text: 'All',
                  dataGrouping: {
                    forced: true,
                    units: [['day', [1]]]
                  }
                }],
              inputEnabled: false, // it supports only days
              selected: 4 // 1d
            },
            //x轴
            xAxis: {
              dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%y-%m',
                year: '%Y'
              },
              events: {
                afterSetExtremes(e){
                  var chart = $('#container').highcharts();
                  // chart.showLoading('Loading data from server...');
                  this.time = e.rangeSelectorButton.text;
                  var timeType = this.time;
                  console.log(timeType);
                  console.log(coinId);
                  kline(coinId,timeType).then(res => {
                    chart.a[i][0].setData(res.data);
                    chart.hideLoading();
                  });

                }
              }
              //minRange: 3600 * 1000 // one hour
            },
            //y轴
            yAxis: [{
              labels: {
                align: 'left',
                x: -20,
                y: -2,
                style: {'color': '#56b5ea'}
              },
              // title: {
              // text: 'Price(USD)'
              // },
              height: '65%',
              lineWidth: 1,
              lineColor: '#56b5ea',
              minRange:1
            }, {
              labels: {
                align: 'left',
                x: 0,
                y: -2,
                style: {'color': '#009f72'}
              },
              title: {
                // text: 'Price(USD)'
              },
              height: '65%',
              lineWidth: 1,
              lineColor: '#009f72',
              opposite: false,
              maxRange: 0.1
            }, {
              labels: {
                align: 'center',
                x: 25,
                y: 10,
                style: {'color': '#ff9f00'}
              },
              title: {
                // text: 'Price(USD)'
              },
              height: '65%',
              lineWidth: 1,
              lineColor: '#ff9f00',
              opposite: false,
              maxRange: 0.1
            }, {
              labels: {
                align: 'left',
                x: 5,
                y: -3,
                style: {'color': '#8b8b8b'}
              },
              title: {
                // text: '24hVol'
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 1,
              lineColor: '#8b8b8b',
              minRange: 1,
              opposite: false,
            }
            ],
            series: [{
              type: 'line',
              name: 'marketCap',
              tooltip: {
                valueSuffix: 'USD'
              },
              data: marketCap,
              dataGrouping: {
                units: [['minute', [1]]]
              },
              color: '#56b5ea',
              yAxis: 0
            }, {
              type: 'line',
              name: 'price(USD)',
              tooltip: {},
              data: priceUsd,
              dataGrouping: {
                units: [['minute', [1]]]
              },
              color: '#009f72',
              yAxis: 1
            }, {
              type: 'line',
              name: 'price(BTC)',
              tooltip: {},
              data: priceBtc,
              dataGrouping: {
                units: [['minute', [1]]]
              },
              color: '#ff9f00',
              yAxis: 2
            }, {
              type: 'column',
              name: '24hVol',
              tooltip: {
                valueSuffix: 'USD'
              },
              data: volume,
              yAxis: 3,
              color: '#8b8b8b',
              dataGrouping: {
                units: [['minute', [1]]]
              },
            },
            ]
          });
        });
      }
    }
  }
</script>

<style scoped>


  /*coinCard*/

  .coinCard {
    height: auto;
    width: 93.6%;
    margin: .2rem 3.2% 0 3.2%;
    border: 1px solid #DEDEDE;
    float: left;
  }

  .coinInner {
    height: auto;
    width: 90%;
    margin: 0 5%;
    float: left;
  }

  .coinCard .coinIcon {
    width: 12%;
    height: 12%;
    margin: 5% 3% 5% 0;
    float: left;
  }

  .coinName {
    height: auto;
    width: 25%;
    float: left;
    margin-top: 5%;
  }

  .coinName p {
    text-align: left;
  }

  .coinName p:first-child {
    font-size: .14rem;
    margin-bottom: .05rem;
  }

  .coinName p:last-child {
    font-size: .13rem;
    color: #666666;
  }

  .coinPrice {
    height: auto;
    width: 55%;
    float: left;
    text-align: right;
    margin-top: 5%;
  }

  .priceCNY {
    height: .16rem;
    width: 100%;
    float: left;
    text-align: right;
    margin-bottom: .08rem;
  }

  .priceCNY span {
    float: right;
  }

  .priceNew {
    height: .13rem;
    width: 100%;
    display: block;
    position: relative;
    float: left;
  }

  .priceCNY span:first-child {
    color: #666;
    font-size: .14rem;
    position: relative;
    top: .0rem;
  }

  .priceCNY span:last-child {
    color: #333;
    font-size: .16rem;
    float: left;
  }

  .priceNew span:first-child {
    font-size: .13rem;
    position: relative;
    float: right;
  }

  .priceNew span:last-child {
    color: #666;
    font-size: .13rem;
    position: absolute;
    right:.5rem;
    top:-.023rem;
    float: right;


  }

  /*chart*/

  .box {
    margin-left: 3.2%;
  }

  /*quotes*/

  .cardBoxes {
    width: 93.6%;
    height: auto;
    margin: 0 3.2%;
    border: 1px solid #DEDEDE;
    float: left;
  }
  .cardBoxes .linkOne:last-child{
    border-bottom: none;
  }
  .boxes span {
    font-size: .14rem;
    line-height: .53rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .boxes {
    float: left;
    width: 90%;
    border-bottom: 1px solid #DEDEDE;
    text-align: left;
    margin: 0 5%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .quotes .quoBox:last-child {
    border-bottom: none;
  }

  .quoBox span:first-child {
    display: inline-block;
    width: 35%;
  }

  .quoBox span:nth-child(2) {
    display: inline-block;
    width: 40%;
    text-indent: .1rem;
  }

  .quoBox span:nth-child(3) {
    color: #1873B9;
    float: right;
    width: 23%;
  }

  .quoBox i {
    font-style: normal;
    color: #666;
    font-size: .13rem;
    position: relative;
    top: -.01rem;
    margin-right: .02rem;
  }

  .quoThree span:last-child {
    width: 50%;
  }

  /*base*/
  .baseBox span {
    display: inline-block;
  }

  .baseBox span:first-child {
    width: 35%;
  }

  .baseThree span:last-child {
    color: #1873B9;
  }

  .baseSix {
    font-size: .13rem;
    line-height: .24rem;
    overflow: auto;
    text-overflow: initial;
    white-space: normal;
    border-bottom: none;
    padding:.15rem 0;
  }

  .baseSix span {
    font-size: .12rem;
    color: #1873B9;
    line-height: .21rem;
  }

  /*link*/
  .linkCard {
    margin-bottom: .2rem;
  }

  .linkBox span {
    display: inline-block;
  }

  .linkBox span:first-child {
    width: 17%;
  }
  .linkBox span:last-child {
    color: #1873B9;
    width: 81%;
    height:100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .linkBox .linkes{
    width: 95%;
    height:100%;
    float: left;
    color:#1873B9;
  }

  .baseCard span:last-child {
    font-size: .13rem;
  }

  .linkCard span:last-child {
    font-size: .12rem;
  }

  .linkFour {
    border-bottom: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .box {
    width: 93.6%;
    height: 400px;
    display: inline-block;
    border: 1px solid #dfdfdf;
    overflow: hidden;
    position: relative;
  }

  .box h3 {
    position: absolute;
    top: -10px;
    left: 10px;
    z-index: 1000;
  }

  .changeOTC {
    float: right;
    margin-top: .08rem;
  }

  .greenSpan{
    color: #04a82b;
  }
  .redSpan{
    color: #C52E2E;
  }
</style>
