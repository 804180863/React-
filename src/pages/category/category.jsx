import React, {Component} from 'react'
import { Card,Table,Icon,Button,Modal,Input,Select,Form,message} from 'antd';
import PropTypes from 'prop-types'
import {reqCategorys,reqAddCategory,reqUpdateCategorys} from '../../api/index'
const Option = Select.Option;
const Item =Form.Item
export default class Category extends Component {
    //设置状态
    state={
        parentId:'0',
        parentName:'',
        catetorys:[],
        subCategory:[],
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
        this.form.resetFields()
        const result =  await reqUpdateCategorys({categoryId,categoryName})

        if(result.status === 0){
            message.success('修改成功')
        }
        this.getCategorys()
        this.setState({
            showupdateclass:false
        })
    }

    //获取数据
    getCategorys = async(pId)=>{
        const parentId = pId || this.state.parentId
        const result = await reqCategorys(parentId)
        if(result.status===0){
            const catetorys =result.data
            if(parentId === '0'){
                this.setState({
                    catetorys
                })
            }else{
                this.setState({
                    subCategory:catetorys
                })
            }

        }
    }
    //查看二级分类数据
    SeeClassSonName=(category)=>{
        this.setState({
            parentName:category.name,
            parentId:category._id
        },()=>{
            this.getCategorys()
        })
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
                        {this.state.parentId === '0' ? <a href="javascript:" onClick={()=> this.SeeClassSonName(category)}>查看子分类</a>: ''}

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
        if(parentId===this.state.parentId || parentId==='0' ){
            this.getCategorys(parentId)
        }

    }
    //关闭添加页面
    handleCancel= () => {
        this.setState({
            isShowAdd: false,
        });
    }
    //显示一级分类
    showoneRclass =()=>{
        this.setState({
            parentId:'0',
            parentName:'',
            subCategory:[]
        })
    }
    render() {
        const columns =this.columns

        const {catetorys,isShowAdd,showupdateclass,parentId,parentName,subCategory} =this.state

        const category= this.category ||{}
        return (
            <div>
                <Card>
                    {
                        parentId === '0' ?
                            <span style={{fontSize:18}}>一级分类列表</span>:
                            <span style={{fontSize:18}}> <a href="javascript:" onClick={this.showoneRclass}>一级分类列表</a>
                                <Icon type="arrow-right" /> {parentName}</span>

                    }



                    <Button onClick={this.showModal} type="primary" style={{float:'right'}}><Icon type="plus-circle"/>添加品类</Button>
                </Card>
                <Table
                    bordered
                    rowKey="_id"
                    columns={columns}
                    dataSource={parentId=== '0' ? catetorys : subCategory}
                    loading={catetorys.length===0}
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
                    <AddForm catetorys={catetorys} parentId={parentId} setForm={(form)=> this.form =form }/>
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
        const {catetorys,parentId} =this.props
        return(
            <Form>
                <Item label="所属分类">
                    {
                        getFieldDecorator('parentId',{
                            initialValue: parentId
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