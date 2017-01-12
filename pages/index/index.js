let app = getApp()

let pageData = {
  data: {
    motto: '打开登录框',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../merchant-detail/merchant-detail?merchantId=101489'
    })
  },
  openLoginPannel: function() {
    this.loginPannel.show({
      sendCode: function () {
        console.log('index - ', 'sendCode')
      },
      login: this.onLogin
    })
  },
  onLogin: function (mobile, code) {
    console.log('index - ', mobile, ' - ' ,code)
  },
  onLoad: function () {
    console.log(this);
    //调用应用实例的方法获取全局数据
    new app.LoginPannel()
    app._getUserInfo((userInfo) => {
      //更新数据
      this.setData({
        userInfo:userInfo
      })
    })
  }
}

Page(pageData);
