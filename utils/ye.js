function request(obj) {
  try {
    var sessionId = wx.getStorageSync('3rd_session')
    if (sessionId) {
      obj.header = obj.header || {}
      obj.header['Cookie'] = sessionId
      obj.header['content-type'] = 'application/json'
    }
  } catch (e) {
    console.log(e)
  }

  var successCallBack = obj.success
  obj['success'] = function (res) {
    var respSessionId = res.header['Set-Cookie']
    if (respSessionId) {
      var endPos = respSessionId.indexOf(';')
      if (endPos > 0) {
        respSessionId = respSessionId.substring(0, endPos)
      }
      try {
        var sessionId = wx.getStorageSync('3rd_session')
        if (!sessionId || sessionId != respSessionId) {
          wx.setStorageSync('3rd_session', respSessionId)
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (successCallBack) {
      successCallBack(res)
    }
  }
  return wx.request(obj)
}

module.exports = {
  request: request
}
