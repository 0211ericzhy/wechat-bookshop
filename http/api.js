import fly from './index'

export default {
  STATIC_HOST: 'https://statics.zhuishushenqi.com', //静态资源地址
  //获取大分类
  getCats() {
    return fly.get('/cats/lv2/statistics')
  },
  //获取小类
  getMinor() {
    return fly.get('/cats/lv2')
  },
  //获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
  getCatsBooks({
    gender,
    type,
    major,
    minor,
    start
  }) {
    if (minor) {
      return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`)
    } else {
      return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`)
    }
  },
  //书籍详情 // @param book_id 书籍id
  bookInfo({
    book_id
  }) {
    return fly.get(`/book/?book_id=${book_id}`)
  },
  //相关推荐 // @param book_id 书籍id
  relatedRecommendedBooks({
    book_id
  }) {
    return fly.get(`/book/?book_id=${book_id}`)
  },
  // 作者名下的书籍 @param author 作者名
  authorBooks({
    author
  }) {
    return fly.get(`/book/accurate-search?author=${author}`)
  },
  // 作者名下的书籍 @param author 作者名
  authorBooks({
    author
  }) {
    return fly.get(`/book/accurate-search?author=${author}`)
  },
  // 书源  注意：第一个优质书源为收费源
  bookSources({
    book_id
  }) {
    return fly.get(`/atoc?view=summary&book=${book_id}`)
  },
  // 书籍章节 根据书源id
  bookChapters({
    id
  }) {
    return fly.get(`/atoc/${id}?view=chapters`)
  },
  // 书籍章节 根据书id
  bookChaptersBookId({
    book_id
  }) {
    return fly.get(`/mix-atoc/${book_id}?view=chapters`)
  },
  //  章节内容  link 章节link
  chapterContent({
    link
  }) {
    return fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
  },
  //搜索热词
  hotWord() {
    return fly.get('/book/hot-word')
  },
  //书籍搜索 (分类，书名，作者名)
  bookSearch() {
    return fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`)
  },
   //排名分类 
   rankCategory() {
    return fly.get(`/ranking/gender`)
  },
  // 排名详情 rank_id 分类ID
  rankInfo({rank_id}) {
    return fly.get(`/ranking/${rank_id}`)
  },
  // 讨论 book_id 书籍id
  discussions({book_id}) {
    return fly.get(`/post/by-book?book=${book_id}`)
  },
  // 短评 book_id  @param book_id 书籍id    完整接口 ?book=5816b415b06d1d32157790b1&limit=20&total=true&start=0&sortType=hottest
  discussions({book_id}) {
    return fly.get(`/post/short-review?book=${book_id}&total=true&sortType=newest`)
  },
  // 长评 书籍id
  bookReviews({book_id}) {
    return fly.get(`/post/review/by-book?book=${book_id}`)
  },
  
}