// pages/userRelease/userRelease.js
Page({

        /**
         * 页面的初始数据
         */
        data: {
                typeNum: '',//判断发布的类型 0：约拍，1：社区，2：通告，3：装备
                contentArr: [],//储存展示的内容
                inputContent: '',//输入框内容
                contentType: 2//发布内容类型 0 照片 1 视频
        },
        // 表单提交事件
        formSubmit: function (e) {

        },

        // 输入框内容
        saveInput: function (e) {
                const that = this;
                const { value: inputContent } = e.detail;
                that.setData({ inputContent });
        },

        // 选择照片
        choosePlog: async function () {
                const that = this;
                const newPlogArray = (await wx.chooseImage({
                        count: 9,
                        sourceType: ['album'],
                        sizeType: ['original', 'compressed']
                })).tempFilePaths;
                const { contentArr } = that.data;
                that.setData({ contentArr: [...contentArr, ...newPlogArray] });
                return;
        },

        // 选择视频
        chooseVlog: async function () {
                const that = this;
                const newVlogArray = (await wx.chooseVideo({
                        sourceType: ['album'],
                        maxDuration: 30
                })).tempFilePath;
                that.setData({ contentArr: newVlogArray });
                return;
        },

        // 选择发布的内容
        chooseContent: async function () {
                const that = this;
                const { contentType } = that.data;
                if (contentType === 2) {
                        const newContentType = (await wx.showActionSheet({itemList: ['照片', '视频']})).tapIndex;
                        that.setData({ contentType: newContentType });
                        if (newContentType === 0) return that.choosePlog();
                        else return that.chooseVlog();
                }
                if (contentType === 0) return that.choosePlog();
                else return that.chooseVlog();
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                const that = this;
                const { typeNum } = options;
                that.setData({
                        typeNum
                })
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {

        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {

        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function () {

        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {

        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function () {

        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function () {

        }
})