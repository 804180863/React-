import { Upload, Icon, Modal,message } from 'antd';
import React from 'react'
import PropTypes from 'prop-types'
import {reqDeleteImg} from '../../api/index'
export default class PicturesWall extends React.Component {
    static propTypes ={
        img: PropTypes.array
    }
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: []
        // fileList: [{
        //     uid: '-1',
        //     name: 'xxx.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // }],
    };
    //得到当前上传的图片
    getImgs =()=>{
       return this.state.fileList.map(file=> file.name)
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = async({ file,fileList }) => {
        if(file.status==='done'){
         const result =  file.response
            if(result.status ===0){
                message.success('上传成功')
                const {name,url} =result.data
                file=fileList[fileList.length-1]
                file.name=name
                file.url=url
            }else{
                message.error('上传失败')
            }
        }else if(file.status ==='removed'){
            const result =await reqDeleteImg(file.name)
            if(result.status===0){
                message.success('删除成功')
            }else {
                message.error('删除失败')
            }
        }
        this.setState({ fileList })
    }
    componentWillMount(){
        const imgs =this.props.imgs
        if(imgs && imgs.length>0){
          const fileList = imgs.map((img,index)=>({
                uid: index,
                name: img,
                status: 'done',
                url: 'http://localhost:5000/upload/'+img,
            }))
            this.state.fileList=fileList
        }
    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/manage/img/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    accept='image/*'
                    name="image"
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

