// pages/carpoolCreate/carpoolCreate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    currentDate: '',
    startDate:'',
    startTime:'',
    personRange: ['1人', '2人', '3人', '4人', '5人', '6人', '7人'],
    personNum:'',
    startRegion: '',
    endRegion: ''
  },
  typeSelected: function(e) {
    this.setData({
      type: e.detail.value
    });
  },
  datePicker:function(e) {
    var pickDate = e.detail.value;
    this.setData({
      startDate: pickDate
    });
  },
  timePicker:function(e) {
    var pickTime = e.detail.value;
    this.setData({
      startTime: pickTime
    });
  },
  numPicker: function(e) {
    console.log(e.detail.value);
    var personNum = parseInt(e.detail.value) + 1 + '人';
    this.setData({
      personNum: personNum
    });
  },
  startRegionPicker: function(e) {
    this.setData({
      startRegion: e.detail.value
    })
  },
  endRegionPicker: function(e) {
    this.setData({
      endRegion: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化数据
    var currentDate = new Date();
    var curDateStr = currentDate.getFullYear + '-' + (currentDate.getMonth + 1) + '-' + currentDate.getDate;
    this.setData({
      currentDate: currentDate
    });
  
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