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

  testFunc: function(e) {
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
        console.log("pageConfig: " + JSON.stringify(res.data));
        var fileSet = {};
        var iconsArray = res.data.data;
        if (iconsArray && iconsArray.length > 0) {
          for (let i = 0, len = iconsArray.length; i < len; i++) {
            let iconObj = iconsArray[i];
            fileDownloader.fileLoader(iconObj, function (iconPath) {
              let key = iconObj['fileName'];
              key = key.slice(0, key.indexOf('.'));
              fileSet[key] = iconPath;
            });
          }
          console.log(fileSet);
          that.setData({
            icons: fileSet
          });
        }
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