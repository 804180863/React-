import React, {Component} from 'react'
import { Card,Table,Icon,Button,Modal,Input,Select,Form,message} from 'antd';
import PropTypes from 'prop-types'
import {reqCategorys,reqAddCategory} from '../../api/index'
const Option = Select.Option;
const Item =Form.Item
export default class Category extends Component {
    state={
        catetorys:[],
        isShowAdd:false
    }
    getCategorys = async()=>{
        const result = await reqCategorys('0')
        if(result.status===0){
            const catetorys =result.data
            this.setState({
                catetorys
            })
        }
    }
    componentDidMount(){
        this.getCategorys()
    }
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
                        &nbsp;&nbsp;<a href="javascript:">修改分类</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="javascript:">查看子分类</a>
                    </span>
                )
            }
        }, ];
    }
    showModal = () => {
        this.setState({
            isShowAdd: true,
        });
    }
    handleOk = async() => {
        this.setState({
            isShowAdd: false,
        })
        //提交添加请求
        const {parentId,categoryName}=this.form.getFieldsValue()
        const result= await reqAddCategory(parentId,categoryName)
        console.log(result);
        if(result.status===0){
            message.success('添加成功')
        }
        this.getCategorys()
    }
    handleCancel= () => {
        this.setState({
            isShowAdd: false,
        });
    }
    render() {
        const columns =this.columns

        const {catetorys,isShowAdd} =this.state
        return (
            <div>
                <Card>
                    <span style={{fontSize:18}}>一级分类列表</span>
                    <Button onClick={this.showModal} type='primary' style={{float:'right'}}><Icon type="plus-circle" />添加品类</Button>

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
class AddForm extends Component{
    static propTypes = {
        categorys: PropTypes.array.isRequired,
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
                            initialValue:'0'
                        })(
                        <Input placehoder="请输入分类名称"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
AddForm = Form.create()(AddForm)