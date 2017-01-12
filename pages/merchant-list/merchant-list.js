//index.js
let app = getApp()
Page({
  data: {
    pageList: [{
      id: "101489",
      title: "商户详情1"
    }, {
      id: "101483",
      title: "商户详情2"
    }, {
      id: "101491",
      title: "商户详情3"
    }]
  },
  openLoginPannel: function() {
    this.loginPannel.show()
  },
  onLoad: function () {
    new app.LoginPannel()
  }
})
