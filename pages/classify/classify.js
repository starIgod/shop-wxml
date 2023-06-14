// pages/classify/classify.js
import {getClassify,getShopList,getSubList} from '../../api/calssify'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:"",
    leftList:[],
    defauIndex:0,
    showShopList:[],
    page:1,
    pageSize:12,
  },
  // 清楚搜索
  clearSearchValue(){
    this.setData({
      searchValue:'',
      classifyList:[],
    })
  },
  setY(e){
    wx.showLoading({
      title: '请求商品中~',
    })
    if(e){
      this.setData({
        defauIndex:e.currentTarget.dataset.ind
      })
      this.getShops()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '分类',
    })
    this.getShopInfos()
  },
  async getShopInfos(){
    wx.showLoading({
      title: '请求商品中~',
    })
    this.setY()
    await getClassify().then(res=>{
      this.setData({
        classifyList:res.data.Data,
      })
    })
    this.getShops()
  },
  async getShops(){
    let arr = []
    let timer = null
    await getShopList({id:this.data.classifyList[this.data.defauIndex].Id}).then(res=>{
      arr = res.data.Data.Items
    })
    if(arr.length==0){
      getSubList(this.data.classifyList[this.data.defauIndex].Id).then(res=>{
        if(res.data.Data.length==0){
          this.setData({
            showShopList:arr,
          })
          wx.hideLoading()
          return
        }
        res.data.Data.forEach(item=>{
          getShopList({id:item.Id}).then(res=>{
            arr = [...arr,...res.data.Data.Items]
              clearTimeout(timer)
              timer = setTimeout(()=>{
                this.setData({
                  showShopList:arr,
                })
                wx.hideLoading()
              },500)
          })
        })
      })
    }else{
      this.setData({
        showShopList:arr,
      })
      wx.hideLoading()
    }
  },
  getShop(e){
    wx.navigateTo({
      url: `/pages/shopInfo/shopInfo?id=${e.currentTarget.dataset.item.Id}`,
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