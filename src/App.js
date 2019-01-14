/**
 * Created by user on 2019/1/14.跟组件
 */
import React from 'react'
import {Switch,BrowserRouter,Route} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'
//应用跟组件
export default class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/admin' component={Admin}></Route>
                    <Route path='/' component={Login}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}