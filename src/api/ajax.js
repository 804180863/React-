/**
 * Created by user on 2019/1/15.
 */
import axios from 'axios'
import {message} from 'antd'
export default function ajax(url,data={},type='GET') {

    return new Promise((resolve,reject)=>{
        let promise
        if(type === 'GET'){
            promise= axios.get(url,{params:data})

        }else{
            promise= axios.post(url,data)
        }
        promise.then((respones)=>{
            resolve(respones.data)
        }).catch((err)=>{
           message.err('请求错误: ' + err.message)
        })
    })

}
