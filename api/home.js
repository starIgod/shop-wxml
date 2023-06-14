import server from './server'

export function getSwiper(){
  return server({
    url:'/common/banner',
    data:{
      name:'homehotbanner'
    }
  })
}
export function getHomeCategory(){
  return server({
    url:'/category/homecategories'
  })
}
export function getTrait(){
  return server({
    url:'/common/banner',
    data:{
      name:'homehotbanner-second-mobile'
    }
  })
}
export function getHot(){
  return server({
    url:'/search/findbycid',
    data:{
      cid:105,
      size:20
    }
  })
}