import server from './server'

export function getClassify() {
  return server({
    url:'/category/sublist',
    data:{
      loadsub:false,
      catId:0
    }
  })
}
export function getShopList({id,page=1,size=12}) {
  return server({
    url:'/search/findbycid',
    data:{
      cid:id,
      page:page,
      size:size,
    }
  })
}

export function getSubList(id){
  return server({
    url:'/category/sublist',
    data:{
      catId:id
    }
  })
}