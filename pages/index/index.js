//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    dataList: [
      
    ]
  },
  listPage: {
    pageSize: 20,
    totalPage: 0,
    curpage: 1
  }, 
  getList: function (options){
    wx.showLoading({
      title: 'loading'
    })
    var that = this
    console.log('that.listPage.curpage：' + that.listPage.curpage)
    var listUrl = util.apiUrl+'hefei/list?page=' + that.listPage.curpage
    wx.request({
      url: listUrl, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.listPage.totalPage = res.data.total_page
        res.data.data.forEach(function (value, index, array){
          let dateFormat = util.formatDate(new Date(value.replyDate*1000))
          value.replyDate = dateFormat
        })
        let dataArr = that.data.dataList
        if (that.listPage.curpage == 1){
          dataArr = []
        }
        dataArr = dataArr.concat(res.data.data)
        that.setData({ dataList:dataArr})
        wx.hideLoading()
      },
      fail: function (res) {
        //app.loadFail()
        console.log(res)
        wx.hideLoading()
      }
    })
  },
  onItemTap: function (e) {
    console.log(e)
    var item = e.currentTarget.dataset.item
    var cardId = item.cardId
    wx.navigateTo({
      url: '../detail/detail?cardId=' + cardId
    })
  },
  onLoad: function (options) {
    this.getList(options)
    this.GloOption = options
  },
  GloOption: null,
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '坊间之声',
      path: '/logs/logs'
    }
  },
  onPullDownRefresh: function () {
    this.data.dataList = []
    this.listPage.curpage = 1
    this.getList(this.GloOption);
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    var that = this
    if (that.listPage.totalPage > that.listPage.curpage * that.listPage.pageSize) {
      that.listPage.curpage++
      this.getList(that.GloOption)
    }
  },
})
