import server from './server'

export function getShopInfos(id){
  return server({
    url:'/goods/getbyid',
    data:{
      id:id
    }
  })
}