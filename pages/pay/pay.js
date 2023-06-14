// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifBack:false,
    total:0,
    isShowPag:false,
    storAr:[],
  },
  backTo(){
    if(this.data.ifBack){
      wx.showToast({
        icon:"none",
        title: '不给钱想走？',
      })
    }else{
      wx.navigateBack()
    }
  },
  pay(){
    this.setData({
      isShowPag:true
    })
  },
  unShow(){
    this.setData({
      isShowPag:false
    })
  },
  define(){
    wx.showToast({
      title: '支付成功',
    })
    this.addHis()
    this.unShow()
    setTimeout(()=>{
      wx.switchTab({
        url: '/pages/home/home',
      })
    },500)
  },
  addHis(){
    if(!this.data.isShowPag)return
    let hisCar = wx.getStorageSync('shopingCar')
    let date = new Date()
    let year = date.getUTCFullYear()
    let math = date.getUTCMonth()+1
    let day = date.getUTCDate()
    let hous = date.getUTCHours()+8
    let min = date.getUTCMinutes()
    let s = date.getUTCSeconds()
    let time = `${year}-${math}-${day}/${hous}-${min}-${s}`
    this.setData({
      storAr:[...this.data.storAr,...[{date:time,bill:hisCar}]]
    })
    wx.setStorageSync('historyPay', this.data.storAr)
    wx.removeStorageSync('shopingCar')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(wx.getStorageSync('historyPay')){
      this.setData({
        storAr:wx.getStorageSync('historyPay')
      })
    }
    this.setData({
      ifBack:true,
      total:options.total
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