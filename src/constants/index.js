const PROJECTS = [    // 各小需求下对应菜单
  {
    value: '门店管理后台',
    label: '门店管理后台',
    children: [
      {value: '公海门店导入', label: '公海门店导入'},
      {value: '商户管理', label: '商户管理'},
      {value: '筛选条件获取', label: '筛选条件获取'},
      {value: '重点门店管理相关', label: '重点门店管理相关'},
      {value: '门店管理', label: '门店管理'}
    ]
  },
  {
    value: '门店管理二期',
    label: '门店管理二期',
    children: [
      {value: '公海门店订单信息', label: '公海门店订单信息'},
      {value: '商户管理分成信息', label: '商户管理分成信息'},
      {value: '私海门店基本信息', label: '私海门店基本信息'},
      {value: '私海门店订单信息', label: '私海门店订单信息'}
    ]
  }
]

const API = [  //  各菜单下对应接口api地址
  {
    title: '公海门店导入',
    children: []
   },
  { 
    title: '商户管理',
    children: [
      {
        title: '商户基础详情',
        api: '/leo/1.0/merchantManage/detail'
      },
      {
        title: '商户查询列表',
        api: '/leo/1.0/merchantManage/list'
      },
      {
        title: '商户门店查询列表',
        api: '/leo/1.0/merchantManage/merchantShopList'
      }
    ]
  },
  {
    title: '筛选条件获取',
    children: [
      {
        title: '获取分配人列表',
        api: '/leo/1.0/shopManage/getAllocateSellerList'
      },
      {
        title: '获取门店来源接口',
        api: '/leo/1.0/shopManage/getOriginTypeList'
      }
    ]
  },
  {
    title: '重点门店管理相关',
    children: []
  },
  {
    title: '门店管理',
    children: [
      {
        title: '公海详情查看',
        api: '/leo/1.0/shopManage/detail'
      },
      {
        title: '公海门店分配',
        api: '/leo/1.0/shopManage/allocate'
      },
      {
        title: '公海门店列表',
        api: '/leo/1.0/shopManage/list'
      },
      {
        title: '门店删除',
        api: '/leo/1.0/shopManage/delete'
      },
    ]
  }
]

export  {
  PROJECTS,
  API
}