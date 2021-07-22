export default {
  // 储存记录 （浏览记录（browse）搜索记录（search）。。。

  // key：储存的名字
  // data:储存的数据
  // attr：判断元素是否存在的属性名
  saveHistory({
    key,
    data,
    attr
  }) {
    // 拼接一个名字
    let name = key + 'history'
    let history = wx.getStorageSync(name)
    if (history) {
      // 有储存过数据
      // 1.把存储的值先拿出来
      let arr = wx.getStorageSync(name)
      // 2。检测数据是否存在
      let item = null
      if (typeof data === 'string') {
        // 查找数组里面是否存在元素
        item = arr.find(i => {
          // 如果在其他数据当中，判断的属性就不叫name而叫其他属性 变成attr 就像arr.name
          return i[attr] === data
        })
      } else {
        console.log(data);
        item = arr.find(i => {
          return i[attr] === data[attr]
        })
        console.log(333);
      }
      // item 如果存在 显示存在的数据 不存在 显示undefind
      // 没有数据
      if (!item) {
        if (typeof data === 'string') {
          let obj = {
            [attr]: data
          }
          arr.push(obj)
        } else {
          arr.push(data)

        }
        // localStorage.setItem(name, JSON.stringify(arr))
        wx.setStorageSync(name, arr)
      } else {
        console.log(222);
      }
    } else {
      // 第一次存（
      // 把存储的数据全部转换成对象
      let arr = []
      if (typeof data === 'string') {
        let obj = {
          name: data
        }
        arr.push(obj)
      } else {
        arr.push(data)

      }
      // localStorage.setItem(name, JSON.stringify(arr))
      wx.setStorageSync(name, arr)
    }
  },
  // 提取记录
  getHistory({
    key
  }) {
    let name = key + 'history'
    // let arr = localStorage.getItem(name)
    let arr = wx.getStorageSync(name)
    if (arr) {
      return arr
    }
  },
  // 清除
  removeHistory({
    key,
    data,
  }) {
    let name = key + 'history'
    let list = this.getHistory({
      key
    })
    // if (attr) {
      let newlist = list.filter((item) => {
        return item._id !== data
      })
      wx.setStorageSync(name, newlist)
    // }else{
    //   wx.setStorageSync(name, [])
    // }


  }
}