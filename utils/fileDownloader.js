//文件下载器
function fileLoader(fileObj, callback) {
  wx.downloadFile({
    url: fileObj.url,
    success: function (result) {
      var tempFilePath = result.tempFilePath;
      typeof callback == "function" && callback(tempFilePath);
    }

  })
}

module.exports = {
  fileLoader: fileLoader
}