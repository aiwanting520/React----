import React,{Component} from 'react';
import {TabBar} from 'antd-mobile';
import PropsTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
const Item = TabBar.Item;
class NavFooter extends Component{
    static propTypes = {
        navList:PropsTypes.array.isRequired,
    }
    render(){
        const {navList} = this.props;
        const {pathname} = this.props.location;
        return (
            <TabBar>
                {
                    navList.map((item,index)=><Item
                        key={index}
                        title={item.text}
                        icon={{uri:require(`./images/${item.icon}.png`)}}
                        selectedIcon = {{uri:require(`./images/${item.icon}-selected.png`)}}
                        selected ={pathname === item.path}
                        onPress = {()=>this.props.history.replace(item.path)}//编程式导航点哪里路由跳转到哪里
                    />)
                }

            </TabBar>
        )
    }
}
export default withRouter(NavFooter);//将当前组件包装成路由组件返回