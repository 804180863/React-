import React, {Component} from 'react'
import {Form,Button,Input,Icon} from 'antd'
import logo from '../../assets/images/logo.png'
import './index.less'
export default class Login extends Component {

    render() {
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo}></img>
                    React项目: 后台管理系统
                </div>
                <LoginForm></LoginForm>
            </div>
        )
    }
}
class LoginForm extends React.Component{
    uesrRule=(ruler,value,callback)=>{
        if(!value){
            callback('请输入用户名')
        }else if(value.length<4 || value.length>8){
            callback('用户名长度在4到8位')
        }else if(!/^\w+$/.test(value)){
            callback('用户名只允许输入英文和数字')
        }else{
            callback()
        }
    }
    Submitadmin=(e)=>{
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-content">
            <div className="login-box">
                <div className="title">用户登陆</div>
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{validator:this.uesrRule}],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{
                            type: 'string',
                            required: true,
                            whitespace: true,
                            message: '请输入密码!!!'
                        },
                            {
                                min: 4,
                                max: 8,
                                message: '密码必须是4到8位'
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="safety"/>} type="password" placeholder="请输入密码" />
                    )}
                </Form.Item>
                <div className="login-form">
                    <Button type="primary" className="login-form-button" onClick={this.Submitadmin}>登陆</Button>
                </div>
            </div>
        </div>
        )

    }
}
LoginForm = Form.create({})(LoginForm);