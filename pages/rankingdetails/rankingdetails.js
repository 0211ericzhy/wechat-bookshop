import api from '../../http/api'
import img from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 书籍id
    monthRank:'',
    totalRank:'',
    _id:'',
    arr:['周榜','月榜','总榜'],
    active_red:0,
    alllist:[],
    img:img.STATIC_HOST,
    flag:true

  },
  // 选择排版
  active(index){
    // console.log(index.currentTarget.dataset.index);
    this.setData({
      active_red:index.currentTarget.dataset.index
    })
    if(this.data.active_red===0){
      api.rankInfo(this.data._id).then((res)=>{
        console.log(res);
        this.setData({
          alllist:res.ranking.books
        })
        console.log(this.data.alllist);
      }).catch((err)=>{
        console.log('请求失败',err);
      })
    }else if(this.data.active_red===1){
      api.rankInfo(this.data.monthRank).then((res)=>{
        console.log(res);
        this.setData({
          alllist:res.ranking.books
        })
        console.log(this.data.alllist);
      }).catch((err)=>{
        console.log('请求失败',err);
      })
    }else if(this.data.active_red===2){
      api.rankInfo(this.data.totalRank).then((res)=>{
        console.log(res);
        this.setData({
          alllist:res.ranking.books
        })
        console.log(this.data.alllist);
      }).catch((err)=>{
        console.log('请求失败',err);
      })
    }
    
  },
  // 跳转详情
  getdetiles(items){
    console.log(items.currentTarget.dataset.items);
    let item11 =JSON.stringify(items.currentTarget.dataset.items)
    wx.navigateTo({
      url: `/pages/details/details?items=${item11}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let items=JSON.parse(options.items)
    console.log(items);
    console.log(items.title);
    this.setData({
      monthRank:items.monthRank,
      totalRank:items.totalRank,
      _id:items._id
    })
   
    if(items.title!=='好评榜'&& items.title!=='热搜榜'){
      this.setData({
        flag:true
      })
    }else{
      this.setData({
        flag:false
      })
    }
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
    // // 默认请求数据
    // console.log(this.data._id);
    api.rankInfo(this.data._id).then((res)=>{
      // console.log(res);
      this.setData({
        alllist:res.ranking.books
      })
      // console.log(this.data.alllist);
    }).catch((err)=>{
      console.log('请求失败',err);
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