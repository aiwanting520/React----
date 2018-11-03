import {connect} from 'react-redux';
import LaobanInfo from  '../components/laoban-info';
import {updateUserInfo} from  '../redux/actions';

export default connect(
    state => ({user: state.user}),//user是redurce的方法，产生新的状态
    {updateUserInfo}
)(LaobanInfo)