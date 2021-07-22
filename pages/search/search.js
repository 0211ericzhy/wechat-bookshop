// pages/search/search.js
import api from '../../http/api'
import utils from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    hotwrords: [],
    colors: [],
    show: true,
    values: '',
    bookslist: [],
    url: api.STATIC_HOST,
    oldlist: [],
  },

  getipt(value) {
    // this.setData({
    //   value:value.detail.value
    // })
    console.log(value.detail.value);
    this.setData({
      show: false
    })
    // 搜索记录
    if (value.detail.value.trim()) {
      utils.saveHistory({
        key: 'search',
        // trim去掉首位空格
        data: value.detail.value.trim(),
        attr: 'name'
      })
      this.setData({
        oldlist: utils.getHistory({
          key: 'search'
        })
      })
      // 请求数据
      api.bookSearch({
        content: value.detail.value
      }).then((res) => {
        // console.log(res);
        this.setData({
          bookslist: res.books
        })
        console.log(this.data.bookslist);
      }).catch((err) => {
        console.log('请求失败', err);
      })
    }

  },
  getout(e) {
    console.log(e.detail.value.trim());
    if (e.detail.value.trim()) {
      this.setData({
        show: true
      })
    }
  },
  // 刷新
  change() {
    api.hotWord().then((res) => {
      console.log(res);
      let color = []
      // 数据
      let a = Math.floor(Math.random() * res.newHotWords.length)
      this.setData({
        hotwrords: res.newHotWords.splice(a)
      })
      console.log(this.data.hotwrords);
      this.data.hotwrords.map((item) => {
        // 颜色
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        let rgb = `rgb(${r},${g},${b})`
        color.push(rgb)
      })
      // console.log(color);
      this.setData({
        colors: color
      })
      console.log(this.data.colors);

      // console.log(rgb);
    }).catch((err) => {
      console.log('请求失败', err);
    })
  },
  // 跳转详情页
  enter(item) {
    // console.log(item.currentTarget.dataset.item);
    let items = JSON.stringify(item.currentTarget.dataset.item)
    wx.navigateTo({
      url: `/pages/details/details?items=${items}`,
    })
  },
  // 清除记录
  clearserch() {
    wx.removeStorageSync('searchhistory')
    // 搜索记录
    // let abc = utils.getHistory({
    //   key: 'search'
    // })
    this.setData({
      oldlist: []
    })



  },
  // 大家都在搜
  everyon(item) {
    console.log(item.currentTarget.dataset.item.word);
    this.setData({
      values: item.currentTarget.dataset.item.word,
      show: false
    })
    api.bookSearch({
      content: this.data.values
    }).then((res) => {
      // console.log(res);
      this.setData({
        bookslist: res.books
      })
      console.log(this.data.bookslist);
    }).catch((err) => {
      console.log('请求失败', err);
    })
    // 搜索记录
    utils.saveHistory({
      key: 'search',
      data: item.currentTarget.dataset.item.word,
      attr: 'name'
    })
    this.setData({
      oldlist: utils.getHistory({
        key: 'search'
      })
    })
  },
  // 历史点击
  everyons(item) {
    console.log(item.currentTarget.dataset.item.name);
    this.setData({
      values: item.currentTarget.dataset.item.name,
      show: false
    })
    api.bookSearch({
      content: this.data.values
    }).then((res) => {
      // console.log(res);
      this.setData({
        bookslist: res.books
      })
      console.log(this.data.bookslist);
    }).catch((err) => {
      console.log('请求失败', err);
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
    api.hotWord().then((res) => {
      // console.log(res);
      let color = []
      // 数据
      let a = Math.floor(Math.random() * res.newHotWords.length)
      this.setData({
        hotwrords: res.newHotWords.splice(a)
      })
      // console.log(this.data.hotwrords);
      this.data.hotwrords.map((item) => {
        // 颜色
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        let rgb = `rgb(${r},${g},${b})`
        color.push(rgb)
      })
      // console.log(color);
      this.setData({
        colors: color
      })
      // console.log(this.data.colors);

      // console.log(rgb);
    }).catch((err) => {
      console.log('请求失败', err);
    })
    console.log(utils.getHistory({
      key: 'search'
    }));
    this.setData({
      oldlist: utils.getHistory({
        key: 'search'
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