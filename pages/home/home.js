// pages/home/home.js
import util from '../../utils/util'
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    url: api.STATIC_HOST,
    move: false
  },
  // 帮助跳转
  tohelp() {
    wx.navigateTo({
      url: "/pages/help/help"
    })
  },
  caner() {
    this.setData({
      move: true
    })
  },
  close() {
    this.setData({
      move: false
    })
  },
  removebook(item){
    console.log(item.currentTarget.dataset.item);
    util.removeHistory({key:'book',data:item.currentTarget.dataset.item._id})
    let abc =util.getHistory({key:'book'})
    console.log(abc);
     this.setData({
      list:abc
    })
    // console.log(this.data.list)
    if(this.data.list.length===0){
      this.setData({
        move:false
      })
    }
  },
  ener(item){
    console.log(item.currentTarget.dataset.item);
    let abc =JSON.stringify(item.currentTarget.dataset.item)
    wx.navigateTo({
      url: `/pages/details/details?items=${abc}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(util.getHistory({
      key: 'book'
    }));
    this.setData({
      list: util.getHistory({
        key: 'book'
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})