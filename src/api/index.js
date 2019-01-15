/**
 * Created by user on 2019/1/15.
 */
import ajax from './ajax'
const BASE ="http://localhost:5000"
//登陆
export const reLogin = (username,password) =>ajax('/login',{username,password},'POST')
//注册
