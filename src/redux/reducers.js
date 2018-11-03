/*
 包含多个用于生成新的state的reducer函数的模块
 */
import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROR_MSG} from './action-types';
import {getRedirectPath} from '../utils';
const initUserState = {
    username: '',
    type: '',
    msg: '',
    redirectTo:'',
}
//定义异步注册发送ajax请求的代码
function user(preState = initUserState,action) {
    switch (action.type){
        case AUTH_SUCCESS:
            return {username:action.data.username,type:action.data.type,msg:'',redirectTo:getRedirectPath(action.data.type,action.data.header)};
        case ERROR_MSG:
            return {...action.data}//{msg:result.msg,username:data.username,type:data.type}
        default:
            return preState;
    }
}
// 返回合并后的reducer函数
export default combineReducers({
    user,
})
