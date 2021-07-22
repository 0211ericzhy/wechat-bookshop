// pages/Classificationdetails/Classificationdetails.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseindex: '',
    list: [],
    gender: '',
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
    active_index: 0,
    // 小类别
    litle_index: 0,
    // 数据
    alllist: [],
    url: api.STATIC_HOST,
    start:1

  },
  // 大类别
  gethot(index) {
    this.setData({
      active_index: index.currentTarget.dataset.index
    })
    // console.log(this.data.active_index);
    if (this.data.litle_index === 0) {
      api.getCatsBooks({
        gender: this.data.gender,
        type: this.data.typeList[this.data.active_index].id,
        major: this.data.list[this.data.chooseindex].major,
        minor: null,
        start: 1
      }).then((res) => {
        console.log(res);
        this.setData({
          alllist: res.books
        })
      }).catch((err) => {
        ("请求失败",
          err)
      })
    } else {
      api.getCatsBooks({
        gender: this.data.gender,
        type: this.data.typeList[this.data.active_index].id,
        major: this.data.list[this.data.chooseindex].major,
        minor: this.data.list[this.data.chooseindex].mins[this.data.litle_index],
        start: 1
      }).then((res) => {
        console.log(res);
        this.setData({
          alllist: res.books
        })
      }).catch((err) => {
        ("请求失败",
          err)
      })
    }


    // console.log(this.data.active_index);
    // console.log(this.data.typeList[this.data.active_index].id);

  },
  // 小类别
  getlitle(index) {
    this.setData({
      litle_index: index.currentTarget.dataset.index
    })
    // console.log(this.data.litle_index);
    if (this.data.litle_index !== 0) {
      api.getCatsBooks({
        gender: this.data.gender,
        type: this.data.typeList[this.data.active_index].id,
        major: this.data.list[this.data.chooseindex].major,
        minor: this.data.list[this.data.chooseindex].mins[this.data.litle_index],
        start: 1
      }).then((res) => {
        // console.log(res);
        this.setData({
          alllist: res.books
        })
      }).catch((err) => {
        "请求失败",
        err
      })
    } else {
      api.getCatsBooks({
        gender: this.data.gender,
        type: this.data.typeList[this.data.active_index].id,
        major: this.data.list[this.data.chooseindex].major,
        minor: null,
        start: 1
      }).then((res) => {
        // console.log(res);
        this.setData({
          alllist: res.books
        })
      }).catch((err) => {
        "请求失败",
        err
      })
    }

  },
  // 进入详情
  getdetails(item){
    // console.log(11);
    console.log(item.currentTarget.dataset.item);
    let items =JSON.stringify(item.currentTarget.dataset.item)
    wx.navigateTo({
      url: `/pages/details/details?items=${items}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 路由接收下标和性别
    console.log(options);
    // console.log(gender);
    this.setData({
      chooseindex: options.index,
      gender: options.gender
    })
    console.log(this.data.chooseindex);
    console.log(this.data.gender);
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
    api.getMinor().then((res) => {
      // 判断性别
      if (this.data.gender === 'male') {
        this.setData({
          list: res.male
        })
        // console.log(this.data.list);
      } else if (this.data.gender === 'female') {
        this.setData({
          list: res.female
        })
      } else if (this.data.gender === 'press') {
        this.setData({
          list: res.press
        })
      }
      // 添加全部
      this.setData({
        list: this.data.list.map((item) => {
          if (item.mins.length !== 0) {
            item.mins.unshift('全部')
          }
          return item
        })
      })
      // 判断是否为全部
      // 默认请求
      api.getCatsBooks({
        gender: this.data.gender,
        type: this.data.typeList[this.data.active_index].id,
        major: this.data.list[this.data.chooseindex].major,
        minor: null,
        // this.data.list[this.data.chooseindex].mins[this.data.litle_index]
        start: 1
      }).then((res) => {
        console.log(res);
        this.setData({
          alllist: res.books
        })
      }).catch((err) => {
        console.log('请求失败', err);
      })

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
    this.setData({
      start:++this.data.start
    })
    if (this.data.litle_index === 0) {
      api.getCatsBooks({
        gender: this.data.gender,
        type: this.data.typeList[this.data.active_index].id,
        major: this.data.list[this.data.chooseindex].major,
        minor: null,
        start: this.data.start
      }).then((res) => {
        console.log(res);
        this.setData({
          alllist: this.data.alllist.concat(res.books)
        })
      }).catch((err) => {
        ("请求失败",
          err)
      })
    } else {
      api.getCatsBooks({
        gender: this.data.gender,
        type: this.data.typeList[this.data.active_index].id,
        major: this.data.list[this.data.chooseindex].major,
        minor: this.data.list[this.data.chooseindex].mins[this.data.litle_index],
        start: this.data.start
      }).then((res) => {
        console.log(res);
        this.setData({
          alllist: this.data.alllist.concat(res.books)
        })
      }).catch((err) => {
        ("请求失败",
          err)
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})