import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,Switch,Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import Register from './containers/register';
import Login from './components/login/index';
import Main from './containers/main';
import store from './redux/store';
ReactDOM.render(
    (
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route component={Main}/>
                </Switch>
            </HashRouter>
        </Provider>
    ),
    document.getElementById('app')
)