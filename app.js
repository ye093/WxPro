//app.js
const ye = require("utils/ye.js")

const autoLoginRequest = require('utils/autoLoginRequest.js')

function getUserInfoGlobal(successCallback) {
  // 用户已经同意获取用户信息
  wx.getUserInfo({
    withCredentials: true,
    success: function (res) {
      console.log(res);
      if (res.encryptedData && res.encryptedData.length > 0) {
        autoLoginRequest.call({
          url: 'userinfo',
          method: 'POST',
          data: {
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            typeof successCallback == "function" && successCallback(res);
            console.log("user_info: " + JSON.stringify(res.data));
          },
          fail: function (res) {
            console.log(res);
          }
        }, function() {
          getUserInfoGlobal(successCallback);
        }); //登录失败，则重新登录，接着重新获取用户信息
      }
    }
  })
}

App({
  onLaunch: function () {
  },

  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
      return;
    }
    wx.checkSession({
      success: function () {
        console.log("登录态有效");
        //判断是否授权了
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userInfo']) {
              wx.authorize({
                scope: 'scope.userInfo',
                success: function () {
                  getUserInfoGlobal(function(res) {
                    if (res.data.code == 1) {
                      that.globalData.userInfo = res.data.data
                      typeof cb == "function" && cb(that.globalData.userInfo)
                    }
                  });
                }
              })
            } else {
              getUserInfoGlobal(function (res) {
                if (res.data.code == 1) {
                  that.globalData.userInfo = res.data.data
                  typeof cb == "function" && cb(that.globalData.userInfo)
                }
              });
            }
          }
        })
      },
      fail: function () {
        //登录态过期
        wx.login({
          success: function (res) {
            if (res.code) {
              ye.request({
                url: "wxlogin",
                method: 'POST',
                data: {
                  code: res.code
                },
                success: function (res) {
                  console.log(res.data);
                  //判断是否授权了
                  wx.getSetting({
                    success(res) {
                      if (!res.authSetting['scope.userInfo']) {
                        wx.authorize({
                          scope: 'scope.userInfo',
                          success: function () {
                            getUserInfoGlobal(function (res) {
                              if (res.data.code == 1) {
                                that.globalData.userInfo = res.data.data
                                typeof cb == "function" && cb(that.globalData.userInfo)
                              }
                            });
                          }
                        })
                      } else {
                        getUserInfoGlobal(function (res) {
                          if (res.data.code == 1) {
                            that.globalData.userInfo = res.data.data
                            typeof cb == "function" && cb(that.globalData.userInfo)
                          }
                        });
                      }
                    }
                  })
                }
              }
              )
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },

  globalData: {
    userInfo: null
  }
})
