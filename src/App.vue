<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!--<select class="lang" @change="selectLang">-->
      <!--<option class="langOption" :value="1">中文</option>-->
      <!--<option class="langOption" :value="2">English</option>-->
    <!--</select>-->
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {},
    mounted (){
      window.scrollTo(0,0);
      if(this.$route.query.lang){
        this.$i18n.locale=this.$route.query.lang
      }else{
        this.$i18n.locale='zh_CN'
      }
    },
    methods:{
      // selectLang(ele){
      //   //console.log(ele.target.value)
      //   if(ele.target.value==1){
      //     this.$i18n.locale='zh_CN'
      //     this.$router.query.lang
      //   }else if(ele.target.value==2){
      //     this.$i18n.locale='en_US'
      //   }
      // }
    }
  }
</script>

<style>
  /*common*/

  html {
    -webkit-text-size-adjust: 100%;
    font-size: 100px;
    height:100%;
    font-family: Droidsansfallback,"Droid Sans","Heiti SC",Helvetica,HelveticaNeue,Arial,sans-serif;
    overflow: hidden;
    overflow-y:scroll;
  }

  body {
    height:100%;
    max-width: 750px;
    min-height: 100%;
    min-width: 320px;
    margin: 0 auto;
    color: #333;
    -webkit-overflow-scrolling: touch;
    font-size: .14rem;
    background-color: #f8f8f8;
    overflow: hidden;
    overflow-y:scroll;
  }

  body::-webkit-scrollbar {
    width: 0;
    display: none;
    height: 0;
    color: transparent;
  }

  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, form, p, ul, input {
    margin: 0;
    padding: 0;
  }

  /*nav*/
  .van-nav-bar{color:#fff!important;background-color: #1873B9!important;}
  .van-nav-bar .van-icon{color:#fff!important;background-color: #1873B9!important;}
  .van-nav-bar .van-nav-bar__text{color:#fff!important;}
  .van-nav-bar .backIcon{
    width:.22rem;
    height:.18rem;
    position: relative;
    top:4px;
  }
  .van-nav-bar .shareIcon{
    width:.22rem;
    height:.21rem;
    position: relative;
    top:4px;
  }

  /*cardTitle*/

  .cardTitle{
    width:93.6%;
    font-size: .14rem;
    color:#666;
    height:.32rem;
    line-height: .32rem;
    display: inline-block;
    text-align: left;
    text-indent: .3rem;
  }
  .lang{
    position:absolute;
    top:.08rem;
    right:12%;
    z-index: 99;
    font-size: .12rem;
    line-height: .3rem;
    /*display: inline-block;*/
    text-align: left;
    height: .3rem;
    width:.6rem;
    color:#fff;
    background-color: #1873B9;
    border: none;
    outline: none;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
  }
</style>
