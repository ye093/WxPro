//logs.js
var util = require('../../utils/util.js');
const qiniuUploader = require('../../utils/qiniuUploader.js');
Page({
  data: {
    logs: []
  },

  outerClick: function (e) {
    console.log("outer click!!!");
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var filePath = res.tempFilePaths[0];

        // 交给七牛上传
        qiniuUploader.upload(filePath, (res) => {
          // 每个文件上传成功后,处理相关的事情
          // 其中 info 是文件上传成功后，服务端返回的json，形式如
          // {
          //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
          //    "key": "gogopher.jpg"
          //  }
          // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
          // that.setData({
          //   'mySrc': res.imageURL,
          // });
          console.log(res);
        }, (error) => {
          console.log('error: ' + error);
        }, {
            region: 'SCN',
            domain: 'https://yefamily.cn', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
            // key: 'customFileName.jpg', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
            // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
            // uptoken: '[yourTokenString]', // 由其他程序生成七牛 uptoken
            uptokenURL: 'file/uploadtoken',// 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
            // uptokenFunc: function () { return '[yourTokenString]'; }
            shouldUseQiniuFileName: true
          });
      }
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
