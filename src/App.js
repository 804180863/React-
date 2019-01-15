/**
 * Created by user on 2019/1/14.跟组件
 */
import React from 'react'
import {Switch,BrowserRouter,Route,Redirect} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'
//应用跟组件
export default class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>

                    <Route path='/login' component={Login}></Route>

                    <Route path='/' component={Admin}></Route>
                    <Redirect to='/login'/>

                </Switch>
            </BrowserRouter>
        )
    }
}