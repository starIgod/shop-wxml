// pages/classify/classify.js
import {getShopList,getSubList} from '../../api/calssify'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topTitle:"",
    subList:[],
    subId:0,
    subInd:0,
    searchValue:"",
    leftList:[],
    defauIndex:0,
    showShopList:[],
    page:1,
    pageSize:12,
    TotalPage:0,
  },
  backTo(){
    wx.navigateBack()
  },
  selSub(e){
    this.setData({
      subInd:e.currentTarget.dataset.index,
      subId:e.currentTarget.dataset.item.Id
    })
    this.getShopLi()
  },
  // 清楚搜索
  clearSearchValue(){
    this.setData({
      searchValue:'',
      classifyList:[],
    })
  },
  getShop(e){
    wx.navigateTo({
      url: `/pages/shopInfo/shopInfo?id=${e.currentTarget.dataset.item.Id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      topTitle:options.name
    })
    await getSubList(options.id).then(res=>{
      this.setData({
        subList:res.data.Data,
        subId:res.data.Data.length!=0?res.data.Data[0].Id:options.id
      })
    })
    wx.showLoading({
      title: '请求商品中~',
    })
    this.getShopLi()
  },
  getShopLi(){
    getShopList({id:this.data.subId}).then(res=>{
      if(!res.data.Data){
        wx.hideLoading()
      }else{
        this.setData({
          showShopList:res.data.Data.Items,
          TotalPage:res.data.Data.Paging.TotalPage
        })
        wx.hideLoading()
      }
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