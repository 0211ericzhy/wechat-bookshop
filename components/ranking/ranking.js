// components/ranking/ranking.js
import img from '../../http/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listed:{
      type:Array,
      value:''
    },
    title:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url:img.STATIC_HOST
  },

  /**
   * 组件的方法列表
   */
  methods: {
    rankingdetiles(allitem){
      // console.log(this.properties.listed);
      // console.log(allitem.currentTarget.dataset.allitem);
      console.log(allitem.currentTarget.dataset.allitem);
      let items=JSON.stringify(allitem.currentTarget.dataset.allitem)
      wx.navigateTo({
        url:`/pages/rankingdetails/rankingdetails?items=${items}`
      })
    }
  }
})
