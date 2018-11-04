import React,{Component} from 'react';
import PropsTypes from 'prop-types';
import {NavBar,List,InputItem,Button,TextareaItem} from 'antd-mobile';
import HeaderSelector from '../header-selector';
class LaobanInfo extends Component{
    static propsTypes = {
        user:PropsTypes.object.isRequired,
        updateUserInfo:PropsTypes.func.isRequired,
    }
    state = {
            header:'',//头像名称
            info:'',//Z职位要求
            post:'',//职位
            salary:'',//月薪
            company:'',//公司
        }
    handleChange =(name,val)=>{
        this.setState({
            [name]:val,
        })
    }
    //更新头像信息，方法传给selector子组件
    setHeader = header =>{
        this.setState({
            header,
        })
    }
    saveUserInfo = header =>{
        this.props.updateUserInfo({...this.state,type:'laoban'})
    }
    render(){
        const {msg} = this.props.user;
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader = {this.setHeader}/>
                {msg ? <p className = 'err-msg'>{msg}</p>:''}
                <InputItem onChange = {val => this.handleChange('post',val)}>招聘职位：</InputItem>
                <InputItem onChange = {val => this.handleChange('company',val)}>公司名称：</InputItem>
                <InputItem onChange = {val => this.handleChange('salary',val)}>职位薪资：</InputItem>
                <TextareaItem title="职位要求:" rows = {3} onChange = {val => this.handleChange('info',val)}></TextareaItem>
                <Button type="primary">保存</Button>
            </div>
        )
    }
}
export default LaobanInfo;