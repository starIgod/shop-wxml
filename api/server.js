export default function({url="",data="",methods="GET"}){
  return new Promise((resolve,reject)=>{
    let basUrl = 'https://demo.urshop.cn/api/v1'
    let datas = ""
    if(data){
      let str = ""
      for(let i in data){
        str+=`${i}=${data[i]}&`
      }
      datas = str.slice(0,-1)
    }
    let putUrl = methods=="GET"?`${basUrl}${url.length!=0?url:''}${datas.length==0?'':'?'+datas}`:`${basUrl}${url.length!=0?url:''}`
    wx.request({
      url: putUrl,
      data:methods=='GET'?{}:data,
      method:methods,
      success:(res)=>{
        resolve(res)
      },
      fail:err=>{
        reject()
      }
    })
  })
}