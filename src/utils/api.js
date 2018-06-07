const API = [   //  各接口名，接口地址， 以及对应的 请求和res的对应json文件
  {
    key: '/leo/1.0/merchantManage/detail',
    value: {
      request: '/schema/shopmanage/merchant/detail/request.json',
      response: '/schema/shopmanage/merchant/detail/response.json'
    }
  },
  {
    key: '/leo/1.0/merchantManage/list',
    value: {
      request: '/schema/shopmanage/merchant/list/request.json',
      response: '/schema/shopmanage/merchant/list/response.json'
    }
  },
  {
    key: '/leo/1.0/merchantManage/merchantShopList',
    value: {
      request: '/schema/shopmanage/merchant/shoplist/request.json',
      response: '/schema/shopmanage/merchant/shoplist/response.json'
    }
  }
]
export default API
