//logs.js
const qiniuUploader = require('../../utils/qiniuUploader.js')
const ye = require('../../utils/ye.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mySrc: ""
},
outerClick: function(e) {
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
          uptokenURL: 'https://www.yefamily.cn/file/uploadtoken',// 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
          // uptokenFunc: function () { return '[yourTokenString]'; }
          shouldUseQiniuFileName: true
        });
    }
  })
},

testFunc: function(e) {
  console.log("testFunc !!!");
  ye.request({
    url: 'https://www.yefamily.cn/wxlogin',
    success: function(res) {
      console.log(res.data);
    }
  });
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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