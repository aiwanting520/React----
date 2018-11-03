/*
 用户注册的路由组件
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {NavBar, WingBlank,List,InputItem,WhiteSpace, Radio, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import Logo from '../logo/index';
import '../assets/less/index.less';
class Register extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,//username\type\msg
        register:PropTypes.func.isRequired,
    }
    state = {
        username: '',
        password: '',
        rePassword: '',
        type: 'dashen'
    }

    // 处理输入框/单选框变化, 收集数据到state
    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    // 注册
    register = async() => {
        //获取状态数据
        const{username,password,rePassword,type} = this.state;
        //发送ajax请求
        this.props.register({username,password,rePassword,type});

    }
    // 跳转到login路由
    toLogin = () => {
        this.props.history.replace('/login')
    }


    render() {
        const {type} = this.state;
        //处理注册页面跳转问题
        const {msg,redirectTo} = this.props.user;
        //如果满足重定向的条件
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
                <WingBlank>
                    {msg ? <p className = 'err-msg'>{msg}</p>:''}
                    <List>
                        <InputItem
                            placeholder='输入用户名'
                            onChange={val => this.handleChange('username', val)}
                        >
                            用户名:
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            placeholder='输入密码'
                            onChange={val => this.handleChange('password', val)}
                        >
                            密&nbsp;&nbsp;&nbsp;码:
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            placeholder='输入确认密码'
                            onChange={val => this.handleChange('rePassword', val)}
                        >
                            确认密码:
                        </InputItem>
                        <WhiteSpace/>
                        <List.Item>
                            <span style={{marginRight: 30}}>用户类型:</span>
                            <Radio checked={this.state.type==='dashen'}
                                   onClick={() => {this.handleChange('type', 'dashen')}}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.type==='laoban'}
                                   onClick={() => {this.handleChange('type', 'laoban')}}>老板</Radio>
                        </List.Item>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已经有账号</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default Register;