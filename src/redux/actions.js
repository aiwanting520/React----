import {AUTH_SUCCESS,ERROR_MSG} from './action-types'
import {reqRegister} from '../api/index';

export const authSuccess = user =>({type:AUTH_SUCCESS,data:user});
export const errMsg = msg =>({type:ERROR_MSG,data:msg});
export const register = data=>{
    const {username,password,rePassword,type} = data;
    //同步表单验证
    if(!username){
        return errMsg({username,password,msg:'请输入用户名'});
    }else if(!password){
        return errMsg({username,password,msg:'请输入密码'});
    }else if(password !== rePassword){
        return errMsg({username,password,msg:'两次密码输入不一致'});
    }else if (!type) {
        return errMsg({username, password, msg: '请选择账号类型'});
    }
    return dispatch =>{
        reqRegister(data)
        .then(res=>{
          const result = res.data;
          if(result.code === 0){
              dispatch(authSuccess(result.data));
          }else{
              dispatch(errMsg({msg:result.msg,username:data.username,type:data.type}));//这里的data?
          }
        })
        .catch(err=>{
            dispatch(errMsg({msg:'网络输入不稳定，请重试',username:data.username,type:data.type}));//这里的data指的是从用户拿到的数据
        })
    }
}

/*
  修改步骤：
  1. actions / action-types
  2. reducers
  3. 容器组件
  4. 入口文件
  5. UI组件
 */