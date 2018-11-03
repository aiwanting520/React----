import {connect} from 'react-redux';
import Register from  '../components/register/index';
import {register} from  '../redux/actions';

export default connect(
    state => ({user: state.user}),//user是redurce的方法，产生新的状态
    {register}
)(Register)