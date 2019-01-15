import store from 'store'
const KEY ='user_key'
function setItem(name,value) {
    if(value && typeof value !== 'function'){
        store.set(name,value)
    } else{
        alert('不支持使用此类型数据')
    }
}
function getItem(name) {
    return store.get(name) || ''
}

function removeItem(name) {
    store.remove(name)
}
export default{
        saveUser(user){
            setItem(KEY,user)
        },
        getUser(){
            return getItem(KEY)
        },
        removeUser(){
            removeItem(KEY)
        },
}

