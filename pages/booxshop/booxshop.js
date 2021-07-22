// pages/booxshop/booxshop.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [{
        name: "分类"
      },
      {
        name: "排行"
      }
    ],
    active_red: 0,
    list: {},
    male: [],
    female: [],
    press: [],
    rankCategory_male: [],
    rankCategory_female: []

  },
  tab(index) {
    // console.log(index.currentTarget.dataset.index);
    // 赋值
    this.setData({
      active_red: index.currentTarget.dataset.index
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

    api.getCats().then((res) => {
        // console.log(res);
        res.male.map((item) => {
          item.gender = 'male'
        })
        res.female.map((item) => {
          item.gender = 'female'
        })
        res.press.map((item) => {
          item.gender = 'press'
        })
        this.setData({
          list: res,
          // male男生
          male: res.male,
          // female 女生
          female: res.female,
          // 出版
          press: res.press
        })
        console.log(this.data.list);
      }).catch((err) => {
        console.log('请求失败', err);
      }),
      // 排行请求
      api.rankCategory().then((res) => {
        // console.log(res);
        this.setData({
          rankCategory_male: res.male.splice(0, 6),
          rankCategory_female: res.female.splice(0, 6)
        })
        // console.log( this.data.rankCategory_male);
      }).catch((err) => {
        console.log('请求失败', err);
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