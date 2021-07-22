// pages/details/details.js
import api from '../../http/api'
import util from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    listall: {},
    url: api.STATIC_HOST,
    rating: {},
    ratingscore: '',
    arr: ['详情', '评价'],
    active_red: 0,
    // 随机推荐
    recomn: [],
    fistone: [],
    // 隐藏
    flag: false,
    // 书架
    show: false,
    showlist: []
  },
  change(index) {
    console.log(index.currentTarget.dataset.index);
    this.setData({
      active_red: index.currentTarget.dataset.index
    })
  },
  // 刷新
  around() {
    // console.log(11);
    api.relatedRecommendedBooks({
      book_id: this.data.list._id
    }).then((res) => {
      console.log(res.books);
      this.setData({
        recomn: res.books
      })
      let num = Math.ceil(Math.random() * (res.books.length - 3))
      console.log(num);
      if (res.books.length <= 3) {
        this.setData({
          fistone: this.data.recomn.slice(0, 3)
        })
      } else {
        this.setData({
          fistone: this.data.recomn.slice(num, num + 3)
        })
      }
      console.log(this.data.fistone);
    }).catch((err) => {
      console.log('请求失败', err);
    })
  },
  // // 条详情
  // getdetiles(items) {
  //   console.log(items);
  //   let itemss = JSON.stringify(items.currentTarget.dataset.items)
  //   wx.navigateTo({
  //     url: `/pages/details/details?items=${itemss}`,
  //   })
  // },
  cloes() {
    this.setData({
      flag: false
    })
  },
  open() {
    this.setData({
      flag: true
    })
  },
  // 保存图片
  bindlongpress(e){
    wx.showActionSheet({
      itemList: ['保存图片'],
      success(res){
        wx.downloadFile({
          url: e.currentTarget.dataset.urls,
          success(res){
            if(res.statusCode===200){
              wx.saveImageToPhotosAlbum({
                // 保存路径
                filePath: res.tempFilePath,
              })
            }
          }
        })
      },
      fail(){}
    })
  },
  // 加入书架
  addread() {
    // 判断是否已加入书架
    util.saveHistory({
      key: 'book',
      data: this.data.list,
      attr: '_id'
    })
    this.setData({
      show: true
    })
    // console.log(111);
  },
  removeread() {
    wx.removeStorageSync('book')
    this.setData({
      show: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.items);
    let items = JSON.parse(options.items)
    this.setData({
      list: items,
    })
    // console.log(this.data.list);
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
    api.bookInfo({
      book_id: this.data.list._id
    }).then((res) => {
      console.log(res);
    //   wx.setNavigationBarTitle({ //配置动态头部
    //     title: wx.getStorageSync(res.title).title,
    // })
      // 判断是否已加入书架
      this.setData({
        showlist: util.getHistory({
          key: 'book'
        })
      })
      if (this.data.showlist !== undefined) {
        let a = this.data.showlist.filter((item) => {
          return item._id === this.data.list._id
        })
        if (a.length === 0) {
          this.setData({
            show: false
          })
        } else {
          this.setData({
            show: true
          })
        }
      }



      this.setData({
        listall: res,
        rating: res.rating,
        ratingscore: Math.floor((res.rating.score) / 2)
      })
      console.log(this.data.listall);
      // console.log(this.data.ratingscore);
    }).catch((err) => {
      console.log("请求失败", err);
    })
    // 相关推荐
    api.relatedRecommendedBooks({
      book_id: this.data.list._id
    }).then((res) => {
      console.log(res.books);
      this.setData({
        recomn: res.books
      })
      let num = Math.ceil(Math.random() * (res.books.length - 3))
      console.log(num);
      if (res.books.length <= 3) {
        this.setData({
          fistone: this.data.recomn.slice(0, 3)
        })
      } else {
        this.setData({
          fistone: this.data.recomn.slice(num, num + 3)
        })
      }
      console.log(this.data.fistone);
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