// components/ranking/ranking.js
import img from '../../http/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listed:{
      type:Array,
      value:'',  
    },
    title:{
      type:Array,
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

  }
})
