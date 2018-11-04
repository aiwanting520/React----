import {connect} from 'react-redux';

import Main from '../components/dashen';
import getUserInfo from '../redux/actions';

export default connect(
    state=>({user:state.user}),
    {getUserInfo},
)(Main)