const autoLoginRequest = require('../../utils/autoLoginRequest.js');
const ye = require('../../utils/ye.js');
const fileDownloader = require('../../utils/fileDownloader.js');

//获取应用实例
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    icons: {},
    userInfo: {}
  },

   userInfoDetail: function(e) {
    //用户信息修改页面
    wx.navigateTo({
      url: "/pages/userinfo/userinfo"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("mine onLoad");
    var that = this;
    app.getUserInfo(function(userInfo) {
      console.log("mine userInfo: " + userInfo);
      that.setData({
        userInfo: userInfo
      });
    });
    var param = {
      url: 'pageconfig',
      method: 'GET',
      data: {
        page: 'mine'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("pageConfig: " + JSON.stringify(res.data.data));
        that.setData({
          icons: res.data.data
        });
      },
      fail: function (res) {
        console.log(res);
      }
    };
    autoLoginRequest.call(
      param,
      function () {
        ye.request(param);
      }
    );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("mine onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("mine onShow")
    var that = this;
    if (app.globalData.userInfoIsChanged) {
      app.getUpdateUserInfo(function (userInfo) {
        that.setData({
          userInfo: userInfo
        });
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

    console.log("mine onHide")

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("mine onUnload")

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");
    wx.stopPullDownRefresh();
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