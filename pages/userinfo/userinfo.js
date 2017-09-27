const autoLoginRequest = require("../../utils/autoLoginRequest.js");
const qiniuUploader = require('../../utils/qiniuUploader.js');
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['', '', ''],
    userInfo: {},
    headPic:''
  },

  fromSubmit: function (e) {
    //表单信息修改
    var value = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', value);
    autoLoginRequest.call({
      url: "updateuserinfo",
      method: "POST",
      data: value,
      success: function(res) {
        console.log("successCallback update user info: " + res.data);
        if (res.data.code == 1) {
          wx.showToast({
            title: '更新资料成功',
            icon: 'success',
            duration: 2000
          });
          app.globalData.userInfoIsChanged = true;
        } else {
          wx.showToast({
            title: '更新资料失败',
            duration: 2000
          })
        }
      },
      fail: function(e) {
        console.log("failCallback update user info: " + e);
      },
      complete: function() {
      }
    });
    
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  headerIconClick: function (e) {
    var that = this;
    //点击选择头像
    wx.chooseImage({
      count:1,
      sizeType: "compressed",
      success: function(res) {
        var filePath = res.tempFilePaths[0];
        var objId = app.globalData.userInfo.objectId;
        var headType = 100;
        qiniuUploader.upload(filePath, (res) => {
          console.log(res);
          app.globalData.userInfoIsChanged = true;
          that.setData({
            headPic: filePath
          });

        }, (error) => {
          console.log('error: ' + error);
        }, {
            region: 'SCN',
            domain: 'https://yefamily.cn',
            uptokenURL: 'file/uploadtoken?objectId=' + objId + '&type=' + headType,
            shouldUseQiniuFileName: true
          });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("userinfo page onLoad");
    this.setData({
      userInfo: app.globalData.userInfo
    });
    // var that = this;
    // app.getUserInfo(function (userInfo) {
    //   console.log("mine userInfo: " + userInfo);
    //   that.setData({
    //     userInfo: userInfo
    //   });
    // });
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