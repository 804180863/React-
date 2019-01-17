import React, {Component} from 'react'
import { Card,Table,Icon,Button } from 'antd';
import {reqCategorys} from '../../api/index'
export default class Category extends Component {
    state={
        catetorys:[]
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
    render() {
        const columns =this.columns

        const {catetorys} =this.state
        return (
            <div>
                <Card>
                    <span style={{fontSize:18}}>一级分类列表</span>
                    <Button type='primary' style={{float:'right'}}><Icon type="plus-circle" />添加品类</Button>
                </Card>
                <Table
                    bordered
                    rowKey="_id"
                    columns={columns}
                    dataSource={catetorys}
                    loading={!catetorys||catetorys.length===0}
                    pagination={{defaultPageSize:10 ,showSizeChanger:true ,showQuickJumper:true}}
                />

            </div>
        )
    }
}