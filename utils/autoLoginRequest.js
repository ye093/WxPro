const ye = require('./ye.js');
//登录态过期会执行登录，reloadCallback为重新登录成功的动作，若不定义则用原来的参数接着请求。
function call(obj, reloadCallback) {
  var successCallBack = obj.success
  obj['success'] = function (res) {
    if (res.data) {
      var code = res.data.code;
      if (code == 2) {
        wx.showLoading({
          title: '自动登录中',
          mask: true
        });
        console.log("auto loading.....")
        login(obj, reloadCallback);
      }
    }
    if (successCallBack) {
      successCallBack(res)
    }
  }
  return ye.request(obj)
}

function login(obj, reloadCallback) {
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
            if (res.data.code != 2) {
              if (reloadCallback) {
                reloadCallback();
              } else {
                ye.request(obj);
              }
            }
          },
          complete: function() {
            wx.hideLoading();
          }
        }
        )
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  })
}

module.exports = {
  call: call
}