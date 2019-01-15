import React, {Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import {Row,Col} from 'antd'
import MemoryUtils from '../../utils/MemoryUtils'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import './admin.less'
import Home from '../../pages/home/home'
import Category from '../../pages/category/category'
import Product from '../../pages/product/product'
import Role from '../../pages/role/role'
import User from '../../pages/user/user'
import Bar from '../../pages/charts/bar'
import Line from '../../pages/charts/line'
import Pie from '../../pages/charts/pie'
/*后台管理
* */
export default class Admin extends Component {

    render() {
        const user =MemoryUtils.user
        if(!user || !user._id){
            return <Redirect to="/login"/>
        }
        return (
            <Row className="container">
                <Col span={4}>
                    <LeftNav></LeftNav>
                </Col>
                <Col span={20} className="main">
                    <Header/>
                    <div className='content'>
                    <Switch>
                        <Route path='/home' component={Home}></Route>
                        <Route path='/category' component={Category}></Route>
                        <Route path='/product' component={Product}></Route>
                        <Route path='/role' component={Role}></Route>
                        <Route path='/user' component={User}></Route>
                        <Route path='/charts/bar' component={Bar}></Route>
                        <Route path='/charts/line' component={Line}></Route>
                        <Route path='/charts/pie' component={Pie}></Route>
                        <Redirect to="/home"/>
                    </Switch>
                    </div>
                    <Footer/>
                </Col>
            </Row>
        )
    }
}