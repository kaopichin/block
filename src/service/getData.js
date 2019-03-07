import { BASEURL, fetch, post, patch, put ,get} from './http.js'


export const BASICURL = BASEURL;

//export const xx = data => post('', data);
//export const xx = data => get('', data);

//币库列表
export const blockList = data => get(`/block/coin`);
//更多列表
export const moreList = data => get(`${data}`);
//查询币种
export const searchCoin = data => get(`/block/search/${data}`);
//币种详情
export const detail = data => get(`/block/coin/details/${data}`);
//币种详情—英文
export const detailEn = data => get(`/block/coin/details/${data}/lang/en`);
//获取kline图
export const kline = (data,aa) => get(`/block/kline/${data}/type/${aa}`);


