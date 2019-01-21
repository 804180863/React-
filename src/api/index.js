/**
 * Created by user on 2019/1/15.
 */
import ajax from './ajax'
import jsonp from 'jsonp'

//登陆接口
export const reLogin = (username,password) =>ajax('/login',{username,password},'POST')
// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')
//获取一级二级分类接口
export const reqCategorys =(parentId)=> ajax('/manage/category/list',{parentId})
//获取添加分类接口
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add', {parentId, categoryName}, 'POST')
//获取更新分类接口
export const reqUpdateCategorys =({categoryId,categoryName})=> ajax('/manage/category/update',{categoryId,categoryName},'POST')
//获取制定页面的商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})
//搜索商品接口
export const reqSeachProducts = ({pageNum, pageSize,searchType,searchName})=>ajax('/manage/product/search',{
    pageNum,
    pageSize,
    [searchType]:searchName
})
//删除图片
export const reqDeleteImg =(name)=> ajax('/manage/img/delete',{name},'post')
//添加图片接口
export const reqAddUpdateCategory=(product)=>ajax('/manage/product/' +(product._id ? 'update' : 'add'),product,'POST')
//天气接口
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