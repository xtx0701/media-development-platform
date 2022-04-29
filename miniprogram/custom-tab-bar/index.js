// custom-tab-bar/index.js
Component({
        /**
         * 组件的属性列表
         */
        properties: {

        },

        /**
         * 组件的初始数据
         */
        data: {
                showBar:true,
                selected: 0,
                color: "#d5d5d5",
                selectedColor: "#010101",
                listTab: [
                        {
                                "pagePath": "/pages/index/index",
                                "text": "首页",
                                "iconPath": "/images/tabbar_home.png",
                                "selectedIconPath": "/images/tabbar_homeselected.png"
                              },
                        //       {
                        //         "pagePath": "/pages/Posting/Posting",
                        //         "text": "发布",
                        //         "iconPath": "/images/tabbar_share.png",
                        //         "selectedIconPath": "/images/tabbar_shareselected.png"
                        //       },
                              {
                                "pagePath": "/pages/Message/Message",
                                "text": "消息",
                                "iconPath": "/images/tabbar_message.png",
                                "selectedIconPath": "/images/tabbar_messageselected.png"
                              }
                ]
        },

        /**
         * 组件的方法列表
         */
        methods: {
                switchTab(e) {
                        let data = e.currentTarget.dataset;
                        let url = data.path;
                        wx.switchTab({ url });
                }
        }
})