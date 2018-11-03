import React,{Component} from 'react';
import {Grid,List} from 'antd-mobile';
import PropTypes from 'prop-types';
class HeaderSelector extends Component{
    static propTypes = {
        setHeader:PropTypes.func.isRequired,
    }
    //设置图片状态
    state ={
        icon:null,
    }
    //点击头像的事件
    setHeader =({icon,text})=>{
        //console.log(obj,index);,更新自身
        this.setState({
            icon,
        })
        //更新父组件
        this.props.setHeader(text);
    }
    render(){
        const {icon} = this.state;
        const headerUI = icon ? <div>请选择头像<img src={icon}/></div>:'请选择头像';
        const data = Array.from(new Array(20)).map((_val, i) => ({
            icon: require(`./avatars/头像${i+1}.png`),
            text: `头像${i+1}`,
        }));

        return (
            <div>
                <List renderHeader={() => headerUI}>
                    <Grid data={data} columnNum={5} onClick={this.setHeader}/>
                </List>
            </div>
        )
    }
}
export default HeaderSelector;