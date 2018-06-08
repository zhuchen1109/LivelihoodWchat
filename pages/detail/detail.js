// pages/detail/detail.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{

    }
  },

  getDetailById: function(cardId) {
    var detailUrl = util.apiUrl + 'hefei/getdetail?cardId=' + cardId
    var that = this
    wx.request({
      url: detailUrl,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let item = res.data.data
        let replyDateFormat = util.formatDate(new Date(item.replyDate * 1000))
        item.replyDate = replyDateFormat
        let createTimeFormat = util.formatDate(new Date(item.createTime * 1000))
        item.createTime = createTimeFormat
        item.type = item.type == 1 ? "咨询" : "建议"
        that.setData({ item: item })
        wx.hideLoading()
      },
      fail: function (res) {
        //app.loadFail()
        console.log(res)
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    //options.cardId ='17102188040015'//test
    this.getDetailById(options.cardId)
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