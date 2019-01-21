import React, {Component} from 'react'

import {Icon,Button,Select,Form,Input,message} from 'antd'
import {reqCategorys,reqAddUpdateCategory} from  '../../api'
import RichTextEditor from './rich-text-editor'
import PicturesWall from './pictures-Wall'

const Item =Form.Item
const Option=Select.Option
class Saveupdata extends Component {

    state={
        categorys:[],
        subCategorys:[],
    }
    getCategorys =async(parentId)=>{
        const result =await reqCategorys(parentId)
        const categorys=result.data
        if(parentId==='0'){
            this.setState({
                categorys
            })
        }else{
            this.setState({
                subCategorys: categorys
            })
        }
    }
    renderOption=()=>{
        const {categorys,subCategorys}=this.state
       const  options = categorys.map(c=>(
            <Option key={c._id} value={c._id}>{c.name}</Option>

        ))
        const  subOptions = subCategorys.map(c=>(
            <Option key={c._id} value={c._id}>{c.name}</Option>

        ))
        return {options,subOptions}
    }
    //显示二级分类列表
    ShowSubCategory =(parentId)=>{
        this.getCategorys(parentId)
        const product = this.props.location.state
        product.categoryId=''
    }
    submit = async() => {
        const {name,desc,price,category1,category2}= this.props.form.getFieldsValue()
        let pCategoryId,categoryId
        if(!category2 ||category2 ==='未选择'){
            pCategoryId = '0'
            categoryId=category1
        }else{
            pCategoryId=category1
            categoryId=category2
        }
        const detail=this.refs.editor.getContent()
        //扽到图片
        const imgs=this.refs.imgs.getImgs()
        const product={name,desc,price,pCategoryId,categoryId,detail,imgs}
        const p=this.props.location.state
        if(p){
            product._id =p._id
        }
        const result=await reqAddUpdateCategory(product)
        if(result.status===0){
            message.success('保存成功')
            this.props.history.replace('/commodity/product/index')
        }else{
            message.error('上传成功')
        }
    }
    componentDidMount(){
        this.getCategorys('0')
        const product = this.props.location.state
        if(product && product.pCategoryId!=='0'){
            this.getCategorys(product.pCategoryId)
        }

    }
    render() {
        const{options,subOptions}=this.renderOption()
        const product = this.props.location.state || {}
        const {getFieldDecorator} =this.props.form

        const formItemLayout={
            labelCol:{ span :2},
            wrapperCol:{ span: 12}
        }
        let initValue1 = '未选择'
        let initValue2 ='未选择'
        if(product.pCategoryId==='0'){
            initValue1 = product.categoryId
        }else if(product.pCategoryId){
            initValue1 = product.pCategoryId
            initValue2 = product.categoryId || '未选择'
        }


        return (
            <div>
                <div>
                    <h2>
                    <a href="javascript:" onClick={()=>this.props.history.goBack()} >
                        <Icon type="arrow-left" />
                    </a>&nbsp;&nbsp;&nbsp;
                        {product._id ? '编辑商品' : '添加产品'}
                        <Form>
                            <Item label="商品名称" {...formItemLayout}>
                                {getFieldDecorator('name',{
                                    initialValue: product.name
                                })(
                                   <Input  placeholder='请输入商品名称'/>
                                )}
                            </Item>
                            <Item label="商品描述" {...formItemLayout}>
                                {getFieldDecorator('desc',{
                                    initialValue: product.desc
                                })(
                                    <Input  placeholder='请输入描述'/>
                                )}
                            </Item>
                            <Item label="商品价格" {...formItemLayout} wrapperCol={{span: 4}}>
                                {getFieldDecorator('price',{
                                    initialValue: product.price
                                })(
                                    <Input  placeholder='请输入价格' addonAfter='元' />
                                )}
                            </Item>
                            <Item label="商品分类" {...formItemLayout} >

                                {   options.length>0?
                                    getFieldDecorator('category1',{
                                    initialValue: initValue1
                                })(
                                    <Select style={{ width:180}} onChange={value=>this.getCategorys(value)}>
                                        {options}
                                    </Select>
                                ):null
                                }
                                &nbsp;&nbsp;&nbsp;
                                {
                                    subOptions.length>0?
                                    getFieldDecorator('category2',{
                                    initialValue: initValue2
                                })(
                                    <Select style={{ width:180}}>
                                        {subOptions}
                                    </Select>
                                ): null
                                }
                            </Item>
                            <Item label="商品图片" {...formItemLayout} wrapperCol={{span: 4}}>
                                <PicturesWall imgs={product.imgs} ref="imgs"/>
                            </Item>
                            <Item label="商品详情" {...formItemLayout} wrapperCol={{span: 20}}>
                                <RichTextEditor ref="editor" detail={product.detail}/>
                            </Item>
                            <Button type='primary' onClick={this.submit}>提交</Button>
                        </Form>
                    </h2>
                </div>

            </div>

        )
    }
}
export default Form.create()(Saveupdata)