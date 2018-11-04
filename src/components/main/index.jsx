import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import Cookies from 'js-cookie';

import LaobanInfo from '../../containers/laobaninfo';
import DashenInfo from '../../containers/dasheninfo';
import Dashen from '../../containers/dashen';
import Laoban from '../../containers/laoban';
import Message from '../../containers/message';
import Personal from '../../containers/personal';
import NavFooter from '../nav-footer';
import PropTypes from 'prop-types';
class Main extends Component{
    static propTypes = {
        user:PropTypes.object.isRequired,
        getUserInfo:PropTypes.func.isRequired,
    }
    //与state相同，都用于保存状态数据
    navList = [
        {
            path: '/laoban', // 路由路径
            component: Laoban,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]
    render(){

        //3.本地有cookie,并且redux有值，直接使用
        const userId = Cookies.get(userid);
        //1.未登录（用户一上来就访问登录页面），本地没有cookie,跳转到登录
        if(!userId){
            //登录
            this.props.history.replace('/login');
            return
        }
        //2.本地有cookie，登录了刷新了，redux更新没有状态（重置为空），根据cookie重新发送请求，（cookie保存的是user_id,数据库中对用用户的id值）请求当前用户的状态数据，保存在redux中
        const {_id} = this.props.user;
        if(!_id){//如果没有id我们就说redu没有更新状态
            //发送请求，请求用户数据
            this.props.getUserInfo();
            return
        }
        const {navList} = this;
        //获取当前路由路径
        const {pathname} = this.props.location;
        console.log(pathname);
        //遍历数组找到其中的一条对象，这条对象上的路径与浏览器端切换的路径一致
        const currentNav = navList.find(nav =>pathname === nav.path);


        return (
           <div>
               {currentNav?<NavBar>{currentNav.title}</NavBar>:''}
               <Switch>
                   <Route path="/laobanInfo" component={LaobanInfo} />
                   <Route path="/laoban" component={Laoban} />
                   <Route path="/dashenInfo" component={DashenInfo} />
                   <Route path="/dashen" component={Dashen} />
                   <Route path="/message" component={Message} />
                   <Route path="/personal" component={Personal} />
               </Switch>
               <NavFooter navList={navList}/>
           </div>
        )
    }
}
export default Main;