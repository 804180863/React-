import React, {Component} from 'react'
import { Card,Table,Icon,Button,Modal,Input,Select,Form,message} from 'antd';
import PropTypes from 'prop-types'
import {reqCategorys,reqAddCategory,reqUpdateCategorys} from '../../api/index'
const Option = Select.Option;
const Item =Form.Item
export default class Category extends Component {
    //设置状态
    state={
        catetorys:[],
        isShowAdd:false,
        showupdateclass:false,
        catetorysName:[]
    }
    //修改分类
    updateclass =(category)=>{
        this.category=category
        this.setState({
            showupdateclass:true
        })
    }
    updatehandleOk= async()=>{
        const categoryId =this.category._id
        const {categoryName} = this.form.getFieldsValue()
        const result =  await reqUpdateCategorys({categoryId,categoryName})
        console.log(categoryId,categoryName);
        if(result.status === 0){
            message.success('修改成功')
        }
        this.getCategorys()
        this.setState({
            showupdateclass:false
        })
    }
    //获取数据
    getCategorys = async()=>{
        const result = await reqCategorys('0')
        if(result.status===0){
            const catetorys =result.data
            this.setState({
                catetorys
            })
        }
    }
    //初始渲染数据
    componentDidMount(){
        this.getCategorys()
    }
    //初始渲染页面数据
    componentWillMount(){
        this.columns = [{
            title: '分类名称',
            dataIndex: 'name',
            render: (value)=><a href="javascript:">{value}</a>
        }, {
            title: '操作',
            width: 300,
            render: (category)=>{
                return(
                    <span>
                        &nbsp;&nbsp;<a href="javascript:" onClick={()=> this.updateclass(category)}>修改分类名</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="javascript:">查看子分类</a>
                    </span>
                )
            }
        }, ];
    }
    //显示添加页面
    showModal = () => {
        this.setState({
            isShowAdd: true,
        });
    }
    //提交添加请求并且获取数据显示
    handleOk = async() => {
        this.setState({
            isShowAdd: false,
        })
        //提交添加请求
        const {parentId,categoryName}=this.form.getFieldsValue()
        const result= await reqAddCategory(parentId,categoryName)
        if(result.status===0){
            message.success('添加成功')
        }
        this.getCategorys()
    }
    //关闭添加页面
    handleCancel= () => {
        this.setState({
            isShowAdd: false,
        });
    }
    render() {
        const columns =this.columns

        const {catetorys,isShowAdd,showupdateclass} =this.state

        const category= this.category ||{}
        return (
            <div>
                <Card>
                    <span style={{fontSize:18}}>一级分类列表</span>
                    <Button onClick={this.showModal} type="primary" style={{float:'right'}}><Icon type="plus-circle"/>添加品类</Button>
                </Card>
                <Table
                    bordered
                    rowKey="_id"
                    columns={columns}
                    dataSource={catetorys}
                    loading={!catetorys||catetorys.length===0}
                    pagination={{defaultPageSize:10 ,showSizeChanger:true ,showQuickJumper:true}}
                />
                <Modal
                    type='primary'
                    title="更新名称"
                    visible={showupdateclass}
                    onOk={this.updatehandleOk}
                    onCancel={()=> this.setState({showupdateclass:false})}
                >
                    <UpdateForm catetorysName={category.name} setForm={(form)=> this.form =form }/>
                </Modal>
                <Modal
                    type='primary'
                    title="添加分类"
                    visible={isShowAdd}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <AddForm catetorys={catetorys} setForm={(form)=> this.form =form }/>
                </Modal>


            </div>
        )
    }
}

//修改
class UpdateForm extends Component{
    //设置数据类型
    static propTypes = {
        catetorysName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired,
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render(){
        const {getFieldDecorator} =this.props.form
        const {catetorysName} =this.props
        return(
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:catetorysName
                        })(
                            <Input placeholder="请输入修改名称"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
UpdateForm = Form.create()(UpdateForm)
//添加
class AddForm extends Component{
    //设置数据类型
    static propTypes = {
        catetorys: PropTypes.array.isRequired,
        setForm: PropTypes.func.isRequired,
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render(){
        const {getFieldDecorator} =this.props.form
        const {catetorys} =this.props
        return(
            <Form>
                <Item label="所属分类">
                    {
                        getFieldDecorator('parentId',{
                            initialValue:'0'
                        })(
                            <Select>
                            <Option key='0' value='0'>一级分类</Option>
                            {
                                catetorys.map(c=><Option key={c._id} value={c._id}>{c.name}</Option>)
                            }
                            </Select>
                        )
                    }
                </Item>
                <Item label="分类名称">
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:''
                        })(
                        <Input placeholder="请输入分类名称"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
AddForm = Form.create()(AddForm)