/**
 * Created by user on 2019/1/15.
 */
import ajax from './ajax'
import jsonp from 'jsonp'

//登陆
export const reLogin = (username,password) =>ajax('/login',{username,password},'POST')
//天气
export function getWeather(city) {
    return new Promise((resolve,reject)=>{
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(error,data)=>{
            if(!error){
                const {dayPictureUrl,weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else{
                alert('请求数据发生未知错误')
            }
        })
    })
}