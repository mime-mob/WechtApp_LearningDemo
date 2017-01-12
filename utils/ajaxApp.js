import Promise from 'es6-promise.min';
function AjaxApp() {
  this.apiHost = (getApp()).globalData.apiHost || "";
  this.__errorCode = {
    "000": "操作成功"
  };
};

AjaxApp.prototype = {
  _ajax: function (url, method, req, holdUpList) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.apiHost + url,
        data: req,
        header: {
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json'
        },
        method: method || 'get',
        success: (resp) => {
          var data = resp.data;
          if (data) {
            if (data.code === "000") {
              resolve(data);
            } else if ((holdUpList || []).indexOf(data.code) !== -1) {
              resolve(data);
            } else {
              reject(data);
              console.log(this.__errorCode[data.code] || data.desc || this.__errorCode["unkown"]);
            }
          } else {
            reject(data);
            console.log(this.__errorCode["unkown"]);
          }
        },
        fail: (resp) => {
          if (resp.errMsg) {
            console.log(resp.errMsg || this.__errorCode["unkown"]);
            reject(data);
            return;
          }

          var data = resp.data;
          if (data) {
            if ((holdUpList || []).indexOf(data.code) !== -1) {
              resolve(data);
            } else {
              reject(data);
              console.log(this.__errorCode[data.code] || data.desc || this.__errorCode["unkown"]);
            }
          } else {
            console.log(this.__errorCode["unkown"]);
            reject(data);
          }
        }
      })
    });
  },
  /*
   * @param   req.merchantId [string]
   * @return  resp.code
   *          resp.desc
   *          resp.content
   *               content.imageList [List<String>]
   *               content.basicInfo [Object]
   *                       basicInfo.logoUrl [String] Logo图片链接地址
   *                       basicInfo.merchantName [String] 商户名称
   *                       basicInfo.merchantDesc [String] 商户描述
   *                       basicInfo.greenCardFlag [Integer] 是否绿卡商户标志(0：否 ，1：是)
   */
  getMerchantDetail: function(req) {
    console.log("商户详情请求数据", req);
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve({
          code: '000',
          desc: 'done!',
          content: {
            imageList: ["http://t2.s1.dpfile.com/pc/mc/a57af510fb103f7cb54cfad0ec67d11a%28640x1024%29/thumb.jpg"],
            basicInfo: {
              logoUrl: "https://www.baidu.com/img/bd_logo1.png",
              merchantName: "测试商户",
              merchantDesc: "测试商户测试商户测试商户测试商户测试商户测试商户",
              greenCardFlag: 1
            }
          }
        });
      }, 1000);
    });
  },
  /*
   * @param   req.merchantId [string]
   *          req.currentPageNo [Int]
   *          req.pageLength [Int]
   * @return  resp.code
   *          resp.desc
   *          resp.content
   *               content.total [Int]
   *               content.storeList [List]
   *                       storeList.storeName [String]
   *                       storeList.address [String]
   *                       storeList.phone [String]
   *
   */
  getStoresByMerchantId: function(req) {
    console.log("门店列表请求数据", req);
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve({
          code: '000',
          desc: 'done!',
          content: {
            total: 14,
            storeList: [{
              "storeName": "测试门店1",
              "address": "测试门店1",
              "phone": "12345678910"
            }, {
              "storeName": "测试门店2",
              "address": "测试门店2",
              "phone": "12345678910"
            }, {
              "storeName": "测试门店3",
              "address": "测试门店3",
              "phone": "12345678910"
            }, {
              "storeName": "测试门店4",
              "address": "测试门店4",
              "phone": "12345678910"
            }, {
              "storeName": "测试门店5",
              "address": "测试门店5",
              "phone": "12345678910"
            }]
          }
        });
      }, 1000);
    });
  }
};

module.exports = new AjaxApp();
