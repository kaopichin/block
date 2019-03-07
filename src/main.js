// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Exporting from 'highcharts/modules/exporting.js';
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Exporting(Highcharts);
// import axios from 'axios'
import VueI18n from 'vue-i18n';
import LangEn from '../static/lang/en';
import LangCh from '../static/lang/ch';


Vue.config.productionTip = false;
Vue.use(VueI18n);
// Vue.use(axios);

// // 创建基本的axios配置
// var $http = axios.create({
//
// });
// 挂载到vue的原型
// Vue.prototype.$http = $http;




const i18n = new VueI18n({
  locale: 'zh_CN', // 语言标识
  messages :{
    'en_US': LangEn,
    'zh_CN': LangCh
  }
})





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>',
})
