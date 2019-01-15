/**
 * Created by user on 2019/1/14.入口函数
 */
import App from './App'
import React from 'react'
import {render} from  'react-dom'
import storageUtils from './utils/storageUtils'
import MemoryUtils from './utils/MemoryUtils'
const user=storageUtils.getUser()
if(user && user._id){
    MemoryUtils.user=user
}

render(<App/>,document.getElementById('root'))