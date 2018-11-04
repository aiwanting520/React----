import {AUTH_SUCCESS,ERROR_MSG,UPDATE_USER,RESET_USER} from './action-types'
import {reqRegister,reqUpdateUserInfo,reqgetUserInfo} from '../api/index';

export const authSuccess = user =>({type:AUTH_SUCCESS,data:user});
export const errMsg = msg =>({type:ERROR_MSG,data:msg});

export const updateUser = user =>({type:UPDATE_USER,data:user});
export const resetUser = msg =>({type:RESET_USER,data:msg});



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
//更新用户数据的异步action
export const updateUserInfo = data=>{
    const {header,post,company,salary,info,type} = data;
    //同步表单验证
    if(!header){
        return resetUser({msg:'请选择头像'});
    }else if(!post){
        return resetUser({msg:type === 'laoban'?'请输入招聘职位':'请输入应聘职位'});
    }else if (!info) {
        return resetUser({msg: type === 'laoban'?'请输入公司简介':'请输入个人简介'});
    }

    if(type === 'laoban'){
        if(!company){
            return resetUser({msg:'请输入公司名称'});
        }
        else if (!salary) {
            return resetUser({msg: '请输入薪资范围'});
            }
    }

    return dispatch =>{
        reqUpdateUserInfo(data)
            .then(res=>{
                const result = res.data;
                if(result.code === 0){
                    dispatch(updateUser(result.data));
                }else{
                    dispatch(resetUser({msg:result.msg}));
                }
            })
            .catch(err=>{
                dispatch(resetUser({msg:'网络输入不稳定，请重试'}));//这里的data指的是从用户拿到的数据
            })
    }
}
//获取用户信息的异步方法
export const getUserInfo = ()=>{
    return dispatch =>{
        reqgetUserInfo()
        .then(res=>{
            const result = res.data;
            if(result.code === 0){
                //请求成功
                dispatch(updateUser(result.data));
            }else{
                //请求失败
                dispatch(resetUser({msg:result.msg}));
            }
        })
        .catch(err=>{
            dispatch(resetUser({msg:'网络输入不稳定，请重试'}));
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