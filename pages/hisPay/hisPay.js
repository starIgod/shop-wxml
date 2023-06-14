// pages/hisPay/hisPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storArr:[],
  },
  remHis(e){
    let index = e.currentTarget.dataset.index
    let arr = Object.assign([],this.data.storArr)
    arr.splice(index,1)
    this.setData({
      storArr:arr
    })
    this.setHis()
  },
  setHis(){
    if(this.data.storArr.length==0)wx.removeStorageSync('historyPay')
    wx.setStorageSync('historyPay', this.data.storArr)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '历史订单',
    })
    this.setData({
      storArr:wx.getStorageSync('historyPay')
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