// pages/shopCar/shopCar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopingCar:[],
    total:0,
  },
  // 设置缓存
  setStor(){
    wx.setStorageSync('shopingCar', this.data.shopingCar)
  },
  // 弃货
  clearShop(e){
    let index = e.currentTarget.dataset.index
    let arr = Object.assign([],this.data.shopingCar)
    arr.splice(index,1)
    this.setData({
      shopingCar:arr
    })
    this.setTotal()
    this.setStor()
  },
  // 去给钱
  toPay(){
    if(this.data.total != 0){
      wx.navigateTo({
        url: '/pages/pay/pay?total='+this.data.total,
      })
    }else{
      wx.showToast({
        icon:"none",
        title: '没有可支付项~',
      })
    }
  },
  // 计算总价
  setTotal(){
    let total = 0
    this.data.shopingCar.forEach(item=>{
      total += item.num*item.price
    })
    this.setData({
      total:total.toFixed(2)
    })
  },
  // 增加数量
  setNum(e){
    let index = e.currentTarget.dataset.index
    let arr = Object.assign([],this.data.shopingCar)
    if(e.currentTarget.dataset.set == "0"){
      if(arr[index].num+1<=arr[index].data.Qty){
        arr[index].num+=1
      }else{
        wx.showToast({
          icon:'none',
          title: '没有那么多存货！',
        })
      }
    }else{
      if(arr[index].num-1>0){
        arr[index].num-=1
      }else{
        arr.splice(index,1)
      }
    }
    this.setData({
      shopingCar:arr
    })
    this.setTotal()
    this.setStor()
  },
  inpNum(e){
    let index = e.currentTarget.dataset.index
    let arr = Object.assign([],this.data.shopingCar)
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
    if(value > arr[index].data.Qty)value=arr[index].data.Qty
    if(value < arr[index].data.Qty)value = 1
    arr[index].num = value
    this.setData({
      shopingCar:arr
    })
    this.setTotal()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '购物车',
    })
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
    let arr = wx.getStorageSync('shopingCar')?wx.getStorageSync('shopingCar'):[]
    this.setData({ 
      shopingCar:arr
    })
    this.setTotal()
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