// app.js
App({
  globalData:{
    
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'bleem-one-0g7wf6h4992ae3cd',
        traceUser: true,
      });
    }

    this.globalData = {};
  }
});
