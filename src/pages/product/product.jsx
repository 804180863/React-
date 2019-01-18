import React, {Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Detail from './detail'
import Index from './index'
import Saveupdata from './save-updata'
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/commodity/product/detail' component={Detail}></Route>
                <Route path='/commodity/product/index' component={Index}></Route>
                <Route path='/commodity/product/saveupdata' component={Saveupdata}></Route>
                <Redirect to="/commodity/product/index"/>
            </Switch>
            
            
            
        )
    }
}