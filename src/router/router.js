module.exports = [
  {
    path: '/pages/index/index',
    name: 'index',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '首页'
    }
  },
  {
    path: '/pages/user/index',
    name: 'user',
    config: {
      enablePullDownRefresh: false,
      navigationBarTitleText: '个人'
    }
  },
  {
    path: '/pages/test/index',
    name: 'test',
    config: {
      enablePullDownRefresh: false,
      navigationBarTitleText: '测试'
    }
  },
  {
    path: '/pages/upload/index',
    name: 'upload',
    config: {
      enablePullDownRefresh: false,
      navigationBarTitleText: '上传'
    }
  },
  {
    path: '/pages/logs/index',
    name: 'logs',
    config: {
      enablePullDownRefresh: false,
      navigationBarTitleText: '日志'
    }
  },
]