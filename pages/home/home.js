// pages/home/home.js
import 
{getSwiper,getHomeCategory,getTrait,getHot}
 from '../../api/home'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:"",
    bannerList:[],
    homeCategList:[],
  },
  selMap(){
    wx.navigateTo({
      url: '/pages/selMap/selMap',
    })
  },
  bannerInfos(e){
    if(e.currentTarget.dataset.item!=undefined){
      wx.navigateTo({
        url: `/pages/unClassify/unClassify?id=${e.currentTarget.dataset.item.Id}&name=${e.currentTarget.dataset.item.Name}`,
      })
      return
    }
    let id = 0
    if(!e.currentTarget.dataset.iss){
      let url = e.currentTarget.dataset.info.Url
      let ind1 = url.indexOf("=")
      id = url.substr(ind1+1,url.length)
    }else{
      id = e.currentTarget.dataset.info.Id
    }
    wx.navigateTo({
      url: `/pages/shopInfo/shopInfo?id=${id}`,
    })
  },
  clearSearchValue(){
    this.setData({
      searchValue:'',
      traitList:[],
      hotList:[],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getSwiper().then(res=>{
      this.setData({
        bannerList:res.data.Data.Items
      })
    })
    getHomeCategory().then(res=>{
      this.setData({
        homeCategList:res.data.Data
      })
    })
    getTrait().then(res=>{
      this.setData({
        traitList:res.data.Data.Items
      })
    })
    getHot().then(res=>{
      this.setData({
        hotList:res.data.Data.Items
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