// components/floor/floor.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Object,
      value: ''
    },
    title: {
      type: String,
      value: ''
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    arr:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onin(e,index) {
      // console.log(e);
      // this.setData({
      //   arr:e.currentTarget.dataset.e
      // })
      console.log(e.currentTarget.dataset.e);
      console.log(e.currentTarget.dataset.index);
      wx.navigateTo({
        url:  `/pages/Classificationdetails/Classificationdetails?index=${e.currentTarget.dataset.index}&gender=${e.currentTarget.dataset.e}`,
      })
    },
  }
})