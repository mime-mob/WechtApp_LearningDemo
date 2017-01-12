var ajaxApp = require('../../utils/ajaxApp.js'),
    pageLength = +((getApp()).globalData.pageLength || 5),
    pageIndex = 1,
    maxPage = 0,
    totalCount = 0,
    isLoading = false;
Page({
  data: {
    merchantId: '',
    merchantImg: '',
    merchantLogo: '',
    merchantTitle: '',
    merchantDesc: '',
    isLvka: false,
    storeList: []
  },
  onLoad: function (arg) {
    console.debug("merchant - Run when page load")
    this.setData({
      merchantId: arg.merchantId || ""
    });
    this._init();
  },
  onReady: function () {
    console.debug("merchant - Run when page ready")
  },
  onShow: function () {
    console.debug("merchant - Run when page show")
  },
  onHide: function () {
    console.debug("merchant - Run when page hide")
  },
  onUnload: function () {
    console.debug("merchant - Run when page unload")
  },
  onPullDownRefresh: function () {
    console.debug("refreshing - onPullDownRefresh");
    this._init();
  },
  onReachBottom: function () {
    console.debug("next page - onReachBottom")
    if (!isLoading && pageIndex <= maxPage) {
      this._getStoreList();
    }
  },
  _init: function () {
    pageIndex = 1;
    maxPage = 0;
    totalCount = 0;
    this._getMerchantDetail();
    this._getStoreList();
  },
  _setMerchantDetail: function (imgUrl, basicInfo) {
    wx.setNavigationBarTitle({
      title: (basicInfo.merchantName || "")
    });
    this.setData({
      merchantImg: imgUrl,
      merchantLogo: basicInfo.logoUrl || "",
      merchantTitle: basicInfo.merchantName || "",
      merchantDesc: basicInfo.merchantDesc || "",
      isLvka: +basicInfo.greenCardFlag === 1
    });
  },
  _setStoreList: function (storeList) {
    this.setData({
      storeList: this.data.storeList.concat(storeList)
    });
  },
  _getMerchantDetail: function () {
    var self = this;
    ajaxApp.getMerchantDetail({
      "merchantId": this.data.merchantId
    }).then(function(resp) {
      wx.stopPullDownRefresh();
      if (resp && resp.content) {
        var imgUrl = "";
        var basicInfo = {};
        if (resp.content.imageList && resp.content.imageList.length > 0) {
          imgUrl = resp.content.imageList[0];
        }
        if (resp.content.basicInfo) {
          basicInfo = resp.content.basicInfo;
        }
        self._setMerchantDetail(imgUrl, basicInfo);
      }
    }, function(){
      wx.stopPullDownRefresh();
    });
  },
  _getStoreList: function() {
    var self = this;
    isLoading = !0;
    ajaxApp.getStoresByMerchantId({
      "merchantId": this.data.merchantId,
      "pageLength": pageLength,
      "pageIndex": pageIndex
    }).then(function(resp) {
      isLoading = !!0;
      wx.stopPullDownRefresh();
      if (!!resp.content && +resp.content.total > 0) {
        totalCount = resp.content.total;
        maxPage = ~~(totalCount / pageLength + 1);
        if (resp.content.storeList && resp.content.storeList.length > 0) {
          pageIndex++;
          self._setStoreList(resp.content.storeList);
        }
      }
    }, function(resp) {
      isLoading = !0;
      wx.stopPullDownRefresh();
    });
  },
  _makePhoneCall: function(event) {
    console.debug(event.target.dataset.phone);
  }
})
