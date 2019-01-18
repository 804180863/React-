import React, {Component} from 'react'
import './header.less'
import {Col,Row,str,Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import {formateDate} from '../../utils/utils'
import {getWeather} from '../../api/index'
import MemoryUtils from '../../utils/MemoryUtils'
import StorageUtils from'../../utils/storageUtils'
import MenuConfig from '../../config/menuConfig'
class Header extends Component {
    state={
        sysTime:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }
    getTimer=()=>{
        this.Timer=setInterval(()=>{
            this.setState({
                sysTime:formateDate(Date.now())
            })
        },1000)
    }
    getMenuConfig=(path)=>{
        let title
        MenuConfig.forEach(menu=>{
            if(menu.key===path){
                title=menu.title
            }else if(menu.children){
                menu.children.forEach(item=>{
                    if(item.key===path){
                        title=item.title
                    }
                })
            }
        })
        return title
    }
    getCityWeather=async()=>{
        const {dayPictureUrl, weather}= await getWeather('北京')
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    headerexit=()=>{
        Modal.confirm({
            content: '您确定退出吗?',
            onOk: () => {
                StorageUtils.removeUser()
                MemoryUtils.user = {}
                this.props.history.replace('/login')
            },
            onCancel() {

            },
        })
    }
    componentDidMount(){
        this.getTimer()
        this.getCityWeather()
    }
    componentWillUnmount(){
        clearInterval(this.Timer)
    }
    render() {

        const {sysTime,dayPictureUrl,weather}=this.state
        const user=MemoryUtils.user
        const path=this.props.location.pathname
        const title=this.getMenuConfig(path)

        return (

            <div className="header">
                <Row className="header-top">
                    <span>欢迎,{user.username}</span>
                    <a href="javascript:" onClick={this.headerexit}>退出</a>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className='breadcrumb-title'>{title}</Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{sysTime}</span>
                        <span className='weather-img'>
                            <img  src={dayPictureUrl} alt="weather"/>
                        </span>
                        <span className='weather-detail'>{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default withRouter(Header)