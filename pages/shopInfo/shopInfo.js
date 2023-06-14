// pages/shopInfo/shopInfo.js
import {getShopInfos} from '../../api/getShopInfos'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stoLeng:0,
    storCar:[],
    bannerList:[],
    shopInfo:{},
    putObj:{},
    putCar:{},
    isShowPut:false,
    isChecked:true,
    price:0,
    num:0,
    total:"0.00",
    stock:0,
  },
  // 选择规格子选项
  putCars(e){
    let cla = e.currentTarget.dataset.cla
    let info = e.currentTarget.dataset.info
    let putObj = Object.assign({},this.data.putObj)
    putObj[cla.Name] = info
    this.setData({
      putObj:putObj,
      num:0
    })
    this.setPrice()
    this.getStor()
  },
  // 输入框设置数量
  setNum(e){
    let text = e.detail.value
    if(text.length == 0){
      text = '0'
    }
    let value
    if(e.detail.value[0] == "0"){
      value = text.slice(1)
    }
    value = parseFloat(text.replace(/\D/g,""))
    if(value > this.data.stock){
      value = this.data.stock
    }
    this.setData({
      num:value
    })
    this.setTotal()
  },
  // 更新单价
  setPrice(){
    let arr = []
    let isTr = false
    let isF = 0
    for(let i=0;i<this.data.shopInfo.AttrValueList.length;i++){
      for(let n in this.data.putObj){
        isTr = true
        if(this.data.shopInfo.AttrValueList[i].AttributesXml.indexOf(n+": "+this.data.putObj[n].Name) == -1){
          isF += 1
          isTr = false
          break
        }
      }
      if(isTr){
        arr.push(this.data.shopInfo.AttrValueList[i])
        break 
      }
    }
    if(this.data.shopInfo.AttrValueList.length==0||isF == this.data.shopInfo.AttrValueList.length){
      let Obj = Object.assign({},this.data.shopInfo)
      arr.push({
        Id:Obj.Id,
        Price:Obj.Price,
        Qty:Obj.StockQuantity
      })
    }
    console.log(arr,'最后arr');
    let price = arr[0].Price.replace(/¥/,"")
    price = price.replace(/,/g,"")
      // 设置默认值
    arr[0].keyInfo = {name:Object.keys(Object.assign({},this.data.putObj)),value:Object.assign({},this.data.putObj)},
    this.setData({
      price:parseFloat(price),
      stock:arr[0].Qty,
      putCar:arr[0]
    })
    console.log("更新单价");
    this.getStor()
  },
  // -数量按钮
  reduceNum(){
    if(this.data.num-1>=0){
      this.setData({
        num:this.data.num-1
      })
    }
    this.setTotal()
  },
  // +数量按钮
  addNum(){
    if(this.data.num+1<=this.data.stock){
      this.setData({
        num:this.data.num+1
      })
    }
    this.setTotal()
  },
  // 设置总价
  setTotal(){
    this.setData({
      total:(this.data.price*this.data.num).toFixed(2)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 购物车数量圆点
  setSto(){
    this.setData({
      stoLeng:wx.getStorageSync('shopingCar')?wx.getStorageSync('shopingCar').length:0
    })
  },
  onLoad(options) {
    wx.showLoading({
      title: '获取数据中~',
    })
    this.setSto()
    this.setTotal()
    // 设置标题
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    // 请求商品总数据
    getShopInfos(options.id).then(res=>{
      let Obj = {}
      let infoObj = Object.assign({},res.data.Data)
      // 判断有无数据
      if(!infoObj.Id){
        wx.showToast({
          icon: "error",
          title: '商品数据错误',
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1000)
        return 
      }
      // 有无规格标题，没有设置默认
      if(infoObj.Attrs && infoObj.Attrs.length!=0){
        infoObj.Attrs.forEach(item=>{
          let name = "规格"
          if(item.Name==""){
            item.Name = name
          }else{
            name = item.Name
          }
          Obj[name] = item.Values[0]
        })
      }
      // 赋予商品信息
      this.setData({
        shopInfo:infoObj, //获修正后的总数据
        bannerList:infoObj.Pictures,
        putObj:Obj, //首选项数据
      })
      this.setPrice()
      console.log('首选项执行');
      this.getStor()
      wx.hideLoading()
    })
  },
  // 检测缓存数量
  getStor(){
    console.log("执行缓存数量");
    let arr = []
    let isTrue = false
    arr = this.data.storCar.filter((item,index)=>{
      if(item.data.AttributesXml&&item.data.AttributesXml!=""){
        return this.data.putCar.AttributesXml == item.data.AttributesXml
      }else if(item.data.Id == this.data.putCar.Id&&item.data.keyInfo.name.length!=0){
        item.data.keyInfo.name.forEach(iName=>{
          if(item.data.keyInfo.value[iName].Id==this.data.putCar.keyInfo.value[iName].Id){
            return isTrue = true
          }
        })
        if(isTrue){
          return true
        }
      }else{
        if(item.shopInfos.Id==this.data.putCar.Id)return true
      }
    })
    console.log(arr,'arr');
    if(arr.length != 0){
      this.setData({
        num:arr[0].num,
        price:arr[0].price,
      })
    }else{
      this.setData({
        num:0,
        price:parseFloat(this.data.shopInfo.Price.replace(/¥/,"")),
      })
    }
    this.setTotal()
    this.setData({
      storCar:wx.getStorageSync('shopingCar')?wx.getStorageSync('shopingCar'):[],
      stoLeng:wx.getStorageSync('shopingCar')?wx.getStorageSync('shopingCar').length:0
    })
  },
  toCar(){
    wx.redirectTo({
      url: '/pages/shopCar/shopCar',
    })
  },
  toHome(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  },
  // 返回按钮
  backTo(){
    wx.navigateBack()
  },
  setPutBtn(){
    this.setData({
      isChecked:true,
      isShowPut:false
    })
  },
  // 加入购物车按钮
  showPutCar(){
    this.setData({
      isShowPut:true
    })
    if(this.data.isChecked){
      this.setData({
        isChecked:false
      })
    }else{
      if(this.data.total != '0.00'){
        // 初始化数据
        let Obj = {
          banner:Object.assign([],this.data.bannerList),
          shopInfos:Object.assign({},this.data.shopInfo),
          specs:{name:Object.keys(Object.assign({},this.data.putObj)),value:Object.assign({},this.data.putObj)},
          data:Object.assign({},this.data.putCar),
          price:this.data.price,
          num:this.data.num,
        }
        // 默认提示信息
        let showAddChong = true
        let isChongAdd = -1
        let isAddInd = -1
        let irRet = false
        // 车没东西直接添加
        if(this.data.storCar.length==0){
          this.setData({
            storCar:[Obj]
          })
        }else{
          this.data.storCar.forEach((stoIte,stoInd)=>{
            if(irRet)return
            if(stoIte.data.Id == this.data.putCar.Id||stoIte.shopInfos.Id == this.data.putCar.GoodsId){
              if(stoIte.specs.name.length!=0&&this.data.putCar.keyInfo.name.length!=0){
                let isChong = 0
                stoIte.specs.name.forEach((stNamIte,stNamInd)=>{
                  isChong += 1
                  if(stoIte.specs.value[stNamIte].Id!=this.data.putCar.keyInfo.value[stNamIte].Id){
                    isChongAdd = 0
                    isChong = 0
                  }else{
                    if(isChong==stoIte.specs.name.length){
                      showAddChong = false
                      isAddInd = stoInd
                      isChongAdd = 1
                      irRet = true
                      return
                    }
                  }
                })
              }else{
                if(stoIte.shopInfos.Id == this.data.putCar.GoodsId){
                  isChongAdd = 0
                }else{
                  showAddChong = false
                  isAddInd = stoInd
                  isChongAdd = 1
                  irRet = true
                  return
                }
              }
            }else{
              isChongAdd = 0
            }
          })
          if(isChongAdd==1){
            let arr = [...this.data.storCar]
            arr[isAddInd] = Obj
            this.setData({
              storCar:arr
            })
          }else if(isChongAdd==0){
            this.setData({
              storCar:[...this.data.storCar,Obj]
            })
          }
        }
        wx.setStorageSync('shopingCar', this.data.storCar)
        wx.showToast({
          title: showAddChong?`添加了${this.data.num}个商品`:"修改成功",
        })
        this.setSto()
      }else{
        wx.showToast({
          icon:'none',
          title: '请选择数量~',
        })
      }
    }
  },
  // 立即购买-清除缓存
  clearStor(){
    wx.showToast({
      title: '清理车',
    })
    wx.removeStorageSync('shopingCar')
    this.getStor()
    // if(wx.getStorageSync('shopingCar').length!=0){
    //   wx.redirectTo({
    //     url: '/pages/shopCar/shopCar',
    //   })
    // }else{
    //   wx.showToast({
    //     icon:"none",
    //     title: '购物车空',
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})