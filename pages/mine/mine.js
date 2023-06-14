// pages/mine/mine.js
import 
{getTrait}
 from '../../api/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      {icon:"/public/images/icon_normal.png",name:"成为合伙人",fun:""},
      {icon:"/public/images/iconfont-dingdan.png",name:"历史订单",fun:"hisPay"},
      {icon:"/public/images/icon_normal.png",name:"退款/售后",fun:""},
      {icon:"/public/images/icon_normal.png",name:"收货地址",fun:""},
      {icon:"/public/images/icon_normal.png",name:"联系客服",fun:""},
      {icon:"/public/images/icon_normal.png",name:"关于我们",fun:""},
      {icon:"/public/images/icon_normal.png",name:"购买须知",fun:""},
    ],
    traitList:[],
  },
  hisPay(){
    wx.navigateTo({
      url: '/pages/hisPay/hisPay',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getTrait().then(res=>{
      this.setData({
        traitList:res.data.Data.Items
      })
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