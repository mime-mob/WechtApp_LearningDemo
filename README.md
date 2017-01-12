#Wechat-App

微信小程序开发入门

1.什么是微信小程序
  微信小程序是一种全新的连接用户与服务的方式，它可以在微信内被便捷地获取和传播，同时具有出色的使用体验。
  在微信中跑的APP，可缓存至微信中，不需要每次都下载
2.小程序架构
  https://zhuanlan.zhihu.com/p/22754296
  https://zhuanlan.zhihu.com/p/22765476
  https://zhuanlan.zhihu.com/p/22932309
3.开发前期准备
  3.1 注册 企业个体户，政府机构，媒体，其他；对公账户设置，小程序的信息的设置
  3.2 绑定开发者
  https://mp.weixin.qq.com/debug/wxadoc/introduction/index.html?t=20161107
3.目录及代码结构
  https://mp.weixin.qq.com/debug/wxadoc/dev/framework/structure.html?t=20161107
``` bash
  Wechat-APP/
  ├─app.js
  ├─app.json
  ├─app.wxss
  ├─component/
  │ └─login-pannel/
  │   ├─login-pannel.js
  │   ├─login-pannel.wxml
  │   └─login-pannel.wxss
  ├─image/
  ├─pages/
  │ ├─index/
  │ ├─merchant-detail/
  │ └─merchant-list/
  └─utils/
```

详情请看这篇：[写一个微信小程序自定义公共组件](https://rushb.cn/201612/ciwulzrjx00002hw1v6uzk68d/)
